using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WidgetManagementData.Models;
using WidgetManagementGrpcService.Repositories.WidgetUserExecutionTracker;

namespace WidgetManagementGrpcService.Services
{
    public class WidgetUserExecutionTrackerServiceV1 : WidgetUserExecutionTrackerServices.WidgetUserExecutionTrackerServicesBase
    {
        private readonly IWidgetUserExecutionTrackerRepository _widgetUserExecutionTrackerRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<WidgetUserExecutionTrackerServiceV1> _logger;

        public WidgetUserExecutionTrackerServiceV1(ILogger<WidgetUserExecutionTrackerServiceV1> logger, IMapper mapper, IWidgetUserExecutionTrackerRepository widgetUserExecutionTrackerRepository)
        {
            _widgetUserExecutionTrackerRepository = widgetUserExecutionTrackerRepository;
            _mapper = mapper;
            _logger = logger;
        }


        public override async Task<WidgetUserExecutionTrackerGetResponse> WidgetUserExecutionTrackerGet(WidgetUserExecutionTrackerGetRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Retrieving {nameof(WidgetUserExecutionTracker)}.");

            WidgetUserExecutionTracker widgetUserExecutionTracker;

            try
            {
                widgetUserExecutionTracker = await _widgetUserExecutionTrackerRepository.Get(request?.WidgetUserExecutionTrackerId, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new WidgetUserExecutionTrackerGetResponse
            {
                WidgetUserExecutionTracker = _mapper.Map<WidgetUserExecutionTracker, WidgetUserExecutionTrackerDto>(widgetUserExecutionTracker)
            };
        }


        public override async Task<WidgetUserExecutionTrackerGetCurrentOrCreateResponse> WidgetUserExecutionTrackerGetCurrentOrCreate(WidgetUserExecutionTrackerGetCurrentOrCreateRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Retrieving {nameof(WidgetUserExecutionTrackerGetCurrentOrCreate)}.");

            WidgetUserExecutionTracker widgetUserExecutionTracker;

            try
            {
                widgetUserExecutionTracker = await _widgetUserExecutionTrackerRepository.GetCurrentOrCreate(request.UserDetailId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new WidgetUserExecutionTrackerGetCurrentOrCreateResponse
            {
                WidgetUserExecutionTracker = _mapper.Map<WidgetUserExecutionTracker, WidgetUserExecutionTrackerDto>(widgetUserExecutionTracker)
            };
        }
    }
}