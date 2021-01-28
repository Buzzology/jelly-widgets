using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using SubscriptionManagementGrpcService.Repositories.Subscription;
using System;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Services
{
    public class SubscriptionServiceV1 : SubscriptionServices.SubscriptionServicesBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<SubscriptionServiceV1> _logger;

        public SubscriptionServiceV1(ILogger<SubscriptionServiceV1> logger, IMapper mapper, ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public override async Task<SubscriptionGetHasActiveStatusResponse> SubscriptionGetHasActiveStatus(SubscriptionGetHasActiveStatusRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(SubscriptionGetHasActiveStatusResponse)}.");

            try
            {
                var active = await _subscriptionRepository.UserHasActiveSubscription(request.UserDetailId);
                return new SubscriptionGetHasActiveStatusResponse { UserDetailId = request.UserDetailId, Active = active };
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }
    }
}