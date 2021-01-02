using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetManagementData.Models;
using WidgetManagementGrpcService.Repositories.Dashboard;
using WidgetManagementGrpcService.Repositories.Widget;

namespace WidgetManagementGrpcService.Services
{
    public class DashboardServiceV1 : DashboardServices.DashboardServicesBase
    {
        private readonly IDashboardRepository _dashboardRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<DashboardServiceV1> _logger;

        public DashboardServiceV1(ILogger<DashboardServiceV1> logger, IMapper mapper, IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
            _mapper = mapper;
            _logger = logger;
        }


        public override async Task<DashboardSearchResponse> DashboardSearch(DashboardSearchRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"{nameof(DashboardSearch)} {nameof(Dashboard)}.");

            List<Dashboard> dashboard;

            try
            {
                dashboard = await _dashboardRepository.Search(
                    new DashboardRepositorySearchProperties {
                        DashboardId = request.DashboardId,
                        Text = request.Text,
                        CurrentUserId = request.CurrentUserId,
                        PageNumber = request.PageNumber,
                        PageSize = request.PageSize,

                });
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            var resp = new DashboardSearchResponse();
            resp.Dashboards.AddRange(_mapper.Map<List<DashboardDto>>(dashboard));

            return resp;
        }


        public override async Task<DashboardCreateResponse> DashboardCreate(DashboardCreateRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Creating {nameof(Dashboard)}.");

            Dashboard dashboard;

            try
            {
                var dashboardInput = _mapper.Map<DashboardDto, Dashboard>(request.Dashboard);
                dashboard = await _dashboardRepository.Create(dashboardInput, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new DashboardCreateResponse { Dashboard = _mapper.Map<DashboardDto>(dashboard) };
        }


        public override async Task<DashboardUpdateResponse> DashboardUpdate(DashboardUpdateRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Updating {nameof(Dashboard)}.");

            Dashboard dashboard;
            var dashboardInput = _mapper.Map<DashboardDto, Dashboard>(request.Dashboard);

            try
            {
                dashboard = await _dashboardRepository.Update(dashboardInput, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new DashboardUpdateResponse
            {
                Dashboard = _mapper.Map<Dashboard, DashboardDto>(dashboard)
            };
        }


        public override async Task<DashboardGetResponse> DashboardGet(DashboardGetRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Retrieving {nameof(Dashboard)}.");

            Dashboard dashboard;

            try
            {
                dashboard = await _dashboardRepository.Get(request?.DashboardId, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new DashboardGetResponse
            {
                Dashboard = _mapper.Map<Dashboard, DashboardDto>(dashboard)
            };
        }

        public override async Task<DashboardAddWidgetResponse> DashboardAddWidget(DashboardAddWidgetRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Running {nameof(DashboardAddWidget)} for {nameof(Dashboard)}.");

            try
            {
                var dashboard = await _dashboardRepository.AddWidget(request?.DashboardId, request.DashboardWidgetId, request.WidgetId, request.WidgetOrderNumber, request.CurrentUserId);

                return new DashboardAddWidgetResponse
                {
                    Dashboard = _mapper.Map<Dashboard, DashboardDto>(dashboard)
                };
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new DashboardAddWidgetResponse();
        }


        public override async Task<DashboardRemoveWidgetResponse> DashboardRemoveWidget(DashboardRemoveWidgetRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Running {nameof(DashboardRemoveWidget)} for {nameof(Dashboard)}.");

            Dashboard dashboard;

            try
            {
                dashboard = await _dashboardRepository.RemoveWidget(request?.DashboardId, request.DashboardWidgetId, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new DashboardRemoveWidgetResponse { Dashboard = _mapper.Map<Dashboard, DashboardDto>(dashboard) };
        }


        public override async Task<DashboardUpdateWidgetResponse> DashboardUpdateWidget(DashboardUpdateWidgetRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Running {nameof(DashboardUpdateWidget)} for {nameof(Dashboard)}.");

            Dashboard dashboard;

            try
            {
                dashboard = await _dashboardRepository.UpdateWidget(
                    _mapper.Map<DashboardWidgetDto, DashboardWidget>(request.DashboardWidget),
                    request?.DashboardId,
                    request.CurrentUserId
                );
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new DashboardUpdateWidgetResponse { Dashboard = _mapper.Map<Dashboard, DashboardDto>(dashboard) };
        }


        public override async Task<DashboardDeleteResponse> DashboardDelete(DashboardDeleteRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Deleting {nameof(request.DashboardId)} {request.DashboardId}");

            try
            {
                var dashboard = await _dashboardRepository.Get(request?.DashboardId, request.CurrentUserId);

                await _dashboardRepository.Remove(request.DashboardId, request.CurrentUserId);

                return new DashboardDeleteResponse
                {
                    Dashboard = _mapper.Map<Dashboard, DashboardDto>(dashboard)
                };
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }
    }
}
