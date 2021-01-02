using AutoMapper;
using Grpc.Core;
using MicroservicesProjectLibrary.Utilities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetManagementData.Models;
using WidgetManagementGrpcService.Repositories.Widget;

namespace WidgetManagementGrpcService.Services
{
    public class WidgetServiceV1 : WidgetServices.WidgetServicesBase
    {
        private readonly IWidgetRepository _widgetRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<WidgetServiceV1> _logger;

        public WidgetServiceV1(ILogger<WidgetServiceV1> logger, IMapper mapper, IWidgetRepository widgetRepository)
        {
            _widgetRepository = widgetRepository;
            _mapper = mapper;
            _logger = logger;
        }


        public override async Task<WidgetSearchResponse> WidgetSearch(WidgetSearchRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"{nameof(WidgetSearch)} {nameof(Widget)}.");

            List<Widget> widget;

            try
            {
                widget = await _widgetRepository.Search(
                    new WidgetRepositorySearchProperties
                    {
                        WidgetId = request.WidgetId,
                        Text = request.Text,
                        CurrentUserId = request.CurrentUserId,
                        PageNumber = request.PageNumber,
                        PageSize = request.PageSize,
                    });

                var resp = new WidgetSearchResponse();
                resp.Widgets.AddRange(_mapper.Map<List<WidgetDto>>(widget));

                return resp;
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }


        public override async Task<WidgetCreateResponse> WidgetCreate(WidgetCreateRequest request, ServerCallContext context)
        {
            throw new Exception($"{nameof(WidgetUpdate)} not sure if we're implementing this yet.");

            _logger.LogInformation($"Creating {nameof(Widget)}.");

            Widget widget;

            try
            {
                var widgetInput = _mapper.Map<WidgetDto, Widget>(request.Widget);
                widget = await _widgetRepository.Create(widgetInput, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new WidgetCreateResponse { Widget = _mapper.Map<WidgetDto>(widget) };
        }


        public override async Task<WidgetUpdateResponse> WidgetUpdate(WidgetUpdateRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Updating {nameof(Widget)}.");

            throw new Exception($"{nameof(WidgetUpdate)} not sure if we're implementing this yet.");

            Widget widget;
            var widgetInput = _mapper.Map<WidgetDto, Widget>(request.Widget);

            try
            {
                widget = await _widgetRepository.Update(widgetInput, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new WidgetUpdateResponse
            {
                Widget = _mapper.Map<Widget, WidgetDto>(widget)
            };
        }


        public override async Task<WidgetGetResponse> WidgetGet(WidgetGetRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Retrieving {nameof(Widget)}.");

            Widget widget;

            try
            {
                widget = await _widgetRepository.Get(request?.WidgetId, request.CurrentUserId);
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }

            return new WidgetGetResponse
            {
                Widget = _mapper.Map<Widget, WidgetDto>(widget)
            };
        }        


        public override async Task<WidgetDeleteResponse> WidgetDelete(WidgetDeleteRequest request, ServerCallContext context)
        {
            throw new Exception($"{nameof(WidgetUpdate)} not sure if we're implementing this yet.");

            _logger.LogInformation($"Deleting {nameof(request.WidgetId)} {request.WidgetId}");

            try
            {
                var widget = await _widgetRepository.Get(request?.WidgetId, request.CurrentUserId);

                await _widgetRepository.Remove(request.WidgetId, request.CurrentUserId);

                return new WidgetDeleteResponse
                {
                    Widget = _mapper.Map<Widget, WidgetDto>(widget)
                };
            }
            catch (Exception e)
            {
                throw LibraryHelpers.GenerateRpcException(e);
            }
        }
    }
}