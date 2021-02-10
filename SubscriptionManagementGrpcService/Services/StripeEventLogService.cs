using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using StripeEventLogManagementGrpcService;
using SubscriptionManagementGrpcService.Repositories.StripeEventLog;
using System;
using System.Threading.Tasks;

namespace SubscriptionManagementGrpcService.Services
{
    public class StripeEventLogServiceV1 : StripeEventLogServices.StripeEventLogServicesBase
    {
        private readonly IStripeEventLogRepository _stripeEventLogRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<StripeEventLogServiceV1> _logger;

        public StripeEventLogServiceV1(ILogger<StripeEventLogServiceV1> logger, IMapper mapper, IStripeEventLogRepository stripeEventLogRepository)
        {
            _stripeEventLogRepository = stripeEventLogRepository;
            _mapper = mapper;
            _logger = logger;
        }


        public override async Task<StripeEventLogProcessResponse> StripeEventLogProcess(StripeEventLogProcessRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(StripeEventLogProcess)}.");

            try
            {
                await _stripeEventLogRepository.ProcessStripeEvent(request.Payload, request.StripeSignature);
                return new StripeEventLogProcessResponse();
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }
    }
}