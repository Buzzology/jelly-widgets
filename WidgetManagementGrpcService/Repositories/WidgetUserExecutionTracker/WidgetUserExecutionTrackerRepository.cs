using AutoMapper;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
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
            var widgetUserExecutionTracker = _widgetUserExecutionTrackers
                .Find(x => x.UserDetailId == userDetailId && x.Archived == false)
                .FirstOrDefault();

            if(widgetUserExecutionTracker == null)
            {
                widgetUserExecutionTracker = await Create(new Models.WidgetUserExecutionTracker
                {
                    WidgetUserExecutionTrackerId = Guid.NewGuid().GetUrlFriendlyString()
                }, userDetailId);
            }

            return widgetUserExecutionTracker;
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

// TODO: Implement this logic so that we can expose this via a controller
// TODO: Implement scaffold for this entity in ui
// TODO: Implement a controller
// TODO: Load this on page load
// TODO: any subsequent triggers in ui should decrement ui count