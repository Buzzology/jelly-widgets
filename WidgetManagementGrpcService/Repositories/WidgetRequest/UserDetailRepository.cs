using MicroservicesProjectLibrary.EventHandling.EventBus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using UserManagementGrpcService.EventHandling;
using UserManagementGrpcService.Infrastructure;
using UserManagementIntegrationEvents.UserDetail;
using Models = UserManagementData.Models;

namespace UserManagementGrpcService.Repositories.UserDetail
{
    public class UserDetailRepository : IUserDetailRepository
    {
        private readonly UserManagementDbContext _userManagementDbContext;
        private readonly IUserManagementIntegrationEventService _userManagementIntegrationEventService;
        private readonly IEventBus _eventBus;

        public UserDetailRepository(
            ILogger<UserDetailRepository> logger,
            UserManagementDbContext userManagementDbContext,
            IUserManagementIntegrationEventService userManagementIntegrationEventService,
            IEventBus eventBus
            )
        {
            _userManagementDbContext = userManagementDbContext;
            _userManagementIntegrationEventService = userManagementIntegrationEventService;
            _eventBus = eventBus;
        }


        public async Task<Models.UserDetail> Create(Models.UserDetail userInput, string userId)
        {
            // Ensure that the user doesn't already exist
            var existingUser = _userManagementDbContext.UserDetails.FirstOrDefault(x => x.UserDetailId == userInput.UserDetailId);
            if (existingUser != null)
            {
                throw new ArgumentException($"User already exists.");
            }

            var user = new Models.UserDetail();
            user.UserDetailId = userInput.UserDetailId;
            user.ExternalReferenceId = userInput.ExternalReferenceId;
            user.EmailAddress = userInput.EmailAddress;
            user.DisplayName = userInput.DisplayName;
            user.Updated = DateTime.UtcNow;
            user.Created = DateTime.UtcNow;

            // Validate
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(user, new ValidationContext(user, null, null), validationResults, true))
            {
                throw new ArgumentException(validationResults.First().ErrorMessage);
            }

            _userManagementDbContext.UserDetails.Add(user);

            // Save user and then publish
            var @event = new UserDetailCreatedIntegrationEvent(user);
            await _userManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _userManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return user;
        }


        public Task<Models.UserDetail> Get(string userId, string currentUserId)
        {
            return _userManagementDbContext.UserDetails.FirstOrDefaultAsync(x => x.UserDetailId == userId);
        }


        public Task<List<Models.UserDetail>> Search(UserDetailRepositorySearchProperties searchProperties)
        {
            IQueryable<Models.UserDetail> query = from user in _userManagementDbContext.UserDetails select user;

            if (searchProperties != null)
            {
                if (searchProperties.UserIds != null && searchProperties.UserIds.Any())
                {
                    query = query.Where(x => searchProperties.UserIds.Contains(x.UserDetailId));
                }

                query = query.Skip((searchProperties.PageNumber - 1) * searchProperties.PageSize).Take(searchProperties.PageSize);
            }

            return query.ToListAsync();
        }


        public async Task<Models.UserDetail> Update(Models.UserDetail userInput, string currentUserId)
        {
            // Ensure that only the user can only update their own profile           
            if (userInput.UserDetailId != currentUserId)
            {
                throw new UnauthorizedAccessException("Can only update your own profile.");
            }

            var user = await Get(userInput.UserDetailId, currentUserId);
            if (user == null) throw new ArgumentException($"User not found.");

            user.DisplayName = userInput.DisplayName;
            user.EmailAddress = userInput.EmailAddress;
            user.Updated = DateTime.UtcNow;

            // Validate
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(user, new ValidationContext(user, null, null), validationResults, true))
            {
                throw new ArgumentException(validationResults.First().ErrorMessage);
            }

            // Save user and then publish
            var @event = new UserDetailUpdatedIntegrationEvent(user);
            await _userManagementIntegrationEventService.SaveEventAndContentManagementContextChangesAsync(@event);
            await _userManagementIntegrationEventService.PublishThroughEventBusAsync(@event);

            return user;
        }
    }
}
