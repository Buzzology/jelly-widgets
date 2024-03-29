﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using UserManagementGrpcService.EventHandling;
using UserManagementGrpcService.Infrastructure;
using UserManagementGrpcService.Repositories.UserTour.Messages;
using UserManagementIntegrationEvents.UserTour;

namespace UserManagementGrpcService.Repositories.UserTour
{
    public class UserTourRepository : IUserTourRepository
    {
        private ILogger<UserTourRepository> _logger { get; init; }
        private UserManagementDbContext _userManagementDbContext { get; init; }
        private readonly IUserManagementIntegrationEventService _userManagementIntegrationEventService;

        public UserTourRepository(
            ILogger<UserTourRepository> logger,
            UserManagementDbContext userManagementDbContext,
            IUserManagementIntegrationEventService userManagementIntegrationEventService
            )
        {
            _logger = logger;
            _userManagementDbContext = userManagementDbContext;
            _userManagementIntegrationEventService = userManagementIntegrationEventService;
        }


        public async Task<UserManagementData.Models.UserTour> Create(UserManagementData.Models.UserTour userTour)
        {
            // Validate
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(userTour, new ValidationContext(userTour, null, null), validationResults, true))
            {
                throw new ArgumentException(validationResults.First().ErrorMessage);
            }

            // Remove existing matches
            _userManagementDbContext.UserTours.RemoveRange(_userManagementDbContext.UserTours.Where(x => x.UserDetailId == userTour.UserDetailId && x.TourId == userTour.UserDetailId));
            _userManagementDbContext.UserTours.Add(userTour);


            // Save siteCustomer and then publish
            var @event = new UserTourCreatedIntegrationEvent(userTour);
            await _userManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _userManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return userTour;
        }


        public async Task<List<UserManagementData.Models.UserTour>> Search(UserTourRepositorySearchProperties searchProperties, string currentUserId)
        {
            IQueryable<UserManagementData.Models.UserTour> query = from userTour in _userManagementDbContext.UserTours select userTour;

            // Limit to current user
            query = query.Where(x => x.UserDetailId == currentUserId);

            // Apply paging
            query = query.Skip((searchProperties.PageNumber - 1) * searchProperties.PageSize).Take(searchProperties.PageSize);

            return query.ToList();
        }
    }
}
