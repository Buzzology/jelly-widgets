using AutoMapper;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetManagementGrpcService.Utilities.Configuration;
using Models = WidgetManagementData.Models;

namespace WidgetManagementGrpcService.Repositories.WidgetUserExecutionTracker
{
    public class WidgetUserExecutionTrackerRepository : IWidgetUserExecutionTrackerRepository
    {
        private ILogger<WidgetUserExecutionTrackerRepository> _logger { get; init; }
        private IMongoCollection<Models.WidgetUserExecutionTracker> _widgetUserExecutionTrackers { get; init; }
        private IMapper _mapper { get; init; }

        public WidgetUserExecutionTrackerRepository(
            WidgetManagementMongoDbConfiguration config,
            IMapper mapper,
            ILogger<WidgetUserExecutionTrackerRepository> logger
            )
        {
            var client = new MongoClient(config.ConnectionString);
            var database = client.GetDatabase(config.DatabaseName);

            _widgetUserExecutionTrackers = database.GetCollection<Models.WidgetUserExecutionTracker>(config.WidgetUserExecutionTrackersCollectionName);
            _mapper = mapper;
        }


        public async Task<Models.WidgetUserExecutionTracker> Get(string id, string currentUserId)
        {
            return _widgetUserExecutionTrackers
                .Find(x => x.WidgetUserExecutionTrackerId == id && x.UserDetailId == currentUserId)
                .FirstOrDefault();
        }


        public async Task<Models.WidgetUserExecutionTracker> Create(Models.WidgetUserExecutionTracker widgetExecutionTracker, string currentUserId)
        {
            _widgetUserExecutionTrackers.InsertOne(widgetExecutionTracker);

            return widgetExecutionTracker;
        }


        public async Task<Models.WidgetUserExecutionTracker> GetCurrentOrCreate(string userDetailId)
        {
            var trackers = _widgetUserExecutionTrackers
                .Find(x => x.UserDetailId == userDetailId && x.Archived == false)
                .ToList()
                .OrderByDescending(x => x.Created)
                .ToList();

            if (!trackers.Any())
            {
                return await Create(new Models.WidgetUserExecutionTracker
                {
                    WidgetUserExecutionTrackerId = Guid.NewGuid().GetUrlFriendlyString(),
                    UserDetailId = userDetailId,
                    Created = DateTime.UtcNow,
                    WidgetIdExecutions = new Dictionary<string, long>(),
                }, userDetailId);
            }

            // If we have multiple trackers we need to make any of the old ones inactive (should not normally happen but if we recieve too many "create" requests at once we might)
            for (var i = trackers.Count - 1; i > 0; i--)
            {
                await Archive(trackers[i].WidgetUserExecutionTrackerId, trackers[i].UserDetailId);
            }

            // If the current tracker free requests needs to be reset do it here
            if(trackers[0].DailyExecutionsReset < DateTime.UtcNow)
            {
                trackers[0].DailyExecutions = 0;
                trackers[0].DailyExecutionsReset = DateTime.UtcNow;

                await Update(trackers[0], trackers[0].UserDetailId);
            }

            return trackers[0];
        }


        public async Task<Models.WidgetUserExecutionTracker> Update(Models.WidgetUserExecutionTracker widgetExecutionTrackerIn, string currentUserId)
        {
            if (widgetExecutionTrackerIn == null) throw new ArgumentException("No values provided for widget execution tracker update.");

            var widgetUserExecutionTracker = await Get(widgetExecutionTrackerIn?.WidgetUserExecutionTrackerId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.WidgetUserExecutionTracker)} was not found: {widgetExecutionTrackerIn.WidgetUserExecutionTrackerId}");
            _widgetUserExecutionTrackers.ReplaceOne(x => x.WidgetUserExecutionTrackerId == widgetExecutionTrackerIn.WidgetUserExecutionTrackerId, widgetExecutionTrackerIn);

            return await Get(widgetExecutionTrackerIn?.WidgetUserExecutionTrackerId, currentUserId);
        }


        public async Task<Models.WidgetUserExecutionTracker> Archive(string widgetUserExecutionTrackerId, string currentUserId)
        {
            var widgetUserExecutionTracker = await Get(widgetUserExecutionTrackerId, currentUserId) ?? throw new KeyNotFoundException($"{nameof(Models.WidgetUserExecutionTracker)} was not found: {widgetUserExecutionTrackerId}");

            // Archive the tracker
            widgetUserExecutionTracker.Archived = true;

            return await Update(widgetUserExecutionTracker, currentUserId);
        }
    }
}