using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using SubscriptionManagementGrpcService.Repositories.Subscription;
using System;
using System.Collections.Generic;
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
            _logger.LogInformation($"Start {nameof(SubscriptionGetHasActiveStatus)}.");

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


        public override async Task<SubscriptionSearchResponse> SubscriptionSearch(SubscriptionSearchRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(SubscriptionSearch)}.");

            try
            {
                var searchResults = await _subscriptionRepository.Search(
                    new SubscriptionRepositorySearchProperties {
                        UserId = request.UserDetailId,
                        Active = request.Active
                    }, request.UserDetailId);

                var resp = new SubscriptionSearchResponse();
                resp.Subscriptions.AddRange(_mapper.Map<List<SubscriptionDto>>(searchResults));

                return resp;
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }
    }
}