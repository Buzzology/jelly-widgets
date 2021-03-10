using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserManagementGrpcService.Repositories.UserTour;
using UserManagementGrpcService.Repositories.UserTour.Messages;
using UserTourGrpcService;

namespace UserManagementGrpcService.Services
{
    public class UserTourServiceV1 : UserTourServices.UserTourServicesBase
    {
        private readonly IUserTourRepository _userTourRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserTourServiceV1> _logger;

        public UserTourServiceV1(ILogger<UserTourServiceV1> logger, IMapper mapper, IUserTourRepository userTourRepository)
        {
            _userTourRepository = userTourRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public override async Task<UserTourCreateResponse> UserTourCreate(UserTourCreateRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(UserTourCreate)}.");

            try
            {
                var userTour = await _userTourRepository.Create(
                    new UserManagementData.Models.UserTour {
                        UserTourId = Guid.NewGuid().GetUrlFriendlyString(),
                        TourId = request?.UserTour?.TourId,
                        UserDetailId = request?.CurrentUserId,
                        Created = DateTime.UtcNow,
                        Updated = DateTime.UtcNow,
                    });

                return new UserTourCreateResponse { UserTour = _mapper.Map<UserTourDto>(userTour) };
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }


        public override async Task<UserTourSearchResponse> UserTourSearch(UserTourSearchRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Start {nameof(UserTourSearch)}.");

            try
            {
                var searchResults = await _userTourRepository.Search(
                    new UserTourRepositorySearchProperties
                    {
                        UserId = request.CurrentUserId,
                    }, request.CurrentUserId);

                var resp = new UserTourSearchResponse();
                resp.UserTours.AddRange(_mapper.Map<List<UserTourDto>>(searchResults));

                return resp;
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }
    }
}