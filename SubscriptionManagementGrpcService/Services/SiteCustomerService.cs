using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using SubscriptionManagementData.Models;
using SubscriptionManagementGrpcService.Repositories.SiteCustomer;
using System;
using System.Linq;
using System.Threading.Tasks;


namespace SubscriptionManagementGrpcService.Services
{
    public class SiteCustomerServiceV1 : SiteCustomerServices.SiteCustomerServicesBase
    {
        private readonly ISiteCustomerRepository _siteCustomerRepository;
        private readonly IMapper _mapper;

        private readonly ILogger<SiteCustomerServiceV1> _logger;

        public SiteCustomerServiceV1(ILogger<SiteCustomerServiceV1> logger, IMapper mapper, ISiteCustomerRepository siteCustomerRepository)
        {
            _siteCustomerRepository = siteCustomerRepository;
            _mapper = mapper;
            _logger = logger;
        }


        public override async Task<SiteCustomerCreateResponse> SiteCustomerCreate(SiteCustomerCreateRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(SiteCustomerCreate)}.");

            SiteCustomer user;

            try
            {
                var userInput = _mapper.Map<SiteCustomerDto, SiteCustomer>(request.SiteCustomer);
                user = await _siteCustomerRepository.Create(userInput, request.SiteCustomer?.SiteCustomerId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new SiteCustomerCreateResponse { SiteCustomer = _mapper.Map<SiteCustomerDto>(user) };
        }


        public override async Task<SiteCustomerUpdateResponse> SiteCustomerUpdate(SiteCustomerUpdateRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(SiteCustomerUpdate)}.");

            SiteCustomer user;
            var userInput = _mapper.Map<SiteCustomerDto, SiteCustomer>(request.SiteCustomer);

            try
            {
                user = await _siteCustomerRepository.Update(userInput, request.SiteCustomer?.SiteCustomerId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new SiteCustomerUpdateResponse
            {
                SiteCustomer = _mapper.Map<SiteCustomer, SiteCustomerDto>(user)
            };
        }


        public override async Task<SiteCustomerGetResponse> SiteCustomerGet(SiteCustomerGetRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(SiteCustomerGet)}.");

            SiteCustomer siteCustomer;

            try
            {
                siteCustomer = await _siteCustomerRepository.Get(request?.SiteCustomerId, request?.SiteCustomerId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new SiteCustomerGetResponse
            {
                SiteCustomer = _mapper.Map<SiteCustomer, SiteCustomerDto>(siteCustomer)
            };
        }


        public override async Task<SiteCustomerGetCheckoutSessionResponse> SiteCustomerGetCheckoutSession(SiteCustomerGetCheckoutSessionRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(SiteCustomerGetCheckoutSession)}.");

            try
            {
                var checkoutSessionIdRequest = new Repositories.SiteCustomer.Messages.GetStripeCheckoutSessionIdRequest
                {
                    UserDetailId = request.UserDetailId,
                    CurrentUserId = request.UserDetailId,
                    CancelUrl = request.CancelUrl,
                    SuccessUrl = request.SuccessUrl,
                    PaymentMethodType = request.PaymentMethodType,
                    Mode = request.Mode,
                };

                if (request?.LineItems?.Any() == true)
                {
                    checkoutSessionIdRequest.LineItems = request.LineItems?
                        .Select(x => new Repositories.SiteCustomer.Messages.CheckoutSessionLineItem
                        {
                            PriceId = x.PriceId,
                            Quantity = x.Quantity
                        })?.ToList();
                }

                var sessionId = await _siteCustomerRepository.GetStripeCheckoutSessionId(checkoutSessionIdRequest);

                return new SiteCustomerGetCheckoutSessionResponse
                {
                    SessionId = sessionId
                };
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }


        public override async Task<SiteCustomerGetAccountManagementUrlResponse> SiteCustomerGetAccountManagementUrl(SiteCustomerGetAccountManagementUrlRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(SiteCustomerGetCheckoutSession)}.");

            try
            {
                return new SiteCustomerGetAccountManagementUrlResponse
                {
                    RedirectUrl = await _siteCustomerRepository.GetAccountManagementUrl(request.ReturnUrl, request.UserDetailId)
                };
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }
    }
}