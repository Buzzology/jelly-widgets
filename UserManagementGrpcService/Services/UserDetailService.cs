using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using UserManagementData.Models;
using UserManagementGrpcService.Repositories.UserDetail;

namespace UserManagementGrpcService.Services
{
    public class UserDetailServiceV1 : UserDetailServices.UserDetailServicesBase
    {
        private readonly IUserDetailRepository _userDetailRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserDetailServiceV1> _logger;

        public UserDetailServiceV1(ILogger<UserDetailServiceV1> logger, IMapper mapper, IUserDetailRepository userDetailRepository)
        {
            _userDetailRepository = userDetailRepository;
            _mapper = mapper;
            _logger = logger;
        }


        public override async Task<UserDetailCreateResponse> UserDetailCreate(UserDetailCreateRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Creating user.");

            UserDetail user;

            try
            {
                var userInput = _mapper.Map<UserDetailDto, UserDetail>(request.UserDetail);
                user = await _userDetailRepository.Create(userInput, request.UserDetail?.UserDetailId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new UserDetailCreateResponse { UserDetail = _mapper.Map<UserDetailDto>(user) };
        }


        public override async Task<UserDetailUpdateResponse> UserDetailUpdate(UserDetailUpdateRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Updating user.");

            UserDetail user;
            var userInput = _mapper.Map<UserDetailDto, UserDetail>(request.UserDetail);

            try
            {
                user = await _userDetailRepository.Update(userInput, request.UserDetail?.UserDetailId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new UserDetailUpdateResponse
            {
                UserDetail = _mapper.Map<UserDetail, UserDetailDto>(user)
            };
        }


        public override async Task<UserDetailGetResponse> UserDetailGet(UserDetailGetRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Retrieving user.");

            UserDetail user;

            try
            {
                user = await _userDetailRepository.Get(request?.UserDetailId, request?.UserDetailId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new UserDetailGetResponse
            {
                UserDetail = _mapper.Map<UserDetail, UserDetailDto>(user)
            };
        }
    }
}
