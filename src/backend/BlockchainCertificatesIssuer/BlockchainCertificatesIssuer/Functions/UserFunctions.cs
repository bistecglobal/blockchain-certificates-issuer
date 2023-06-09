using System.Net;
using System.Text.Json;
using BlockchainCertificatesIssuer.API.Models;
using BlockchainCertificatesIssuer.API.Validations;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.Functions
{
    public class UserFunctions
    {
        private readonly ILogger _logger;
        private readonly IRepository<User> userRepository;

        public UserFunctions(ILoggerFactory loggerFactory, IRepository<User> repository)
        {
            _logger = loggerFactory.CreateLogger<UserFunctions>();
            this.userRepository = repository;
        }

        [Function("CreateUser")]
        public async Task<HttpResponseData> CreateUser([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route ="user/signup")] HttpRequestData req)
        {
            _logger.LogInformation("Create an user.");

            try
            {
                var newUser = await JsonSerializer.DeserializeAsync<User>(req.Body);
                
                if(newUser == null) return req.CreateResponse(HttpStatusCode.BadRequest);
                
                var validator = new UserValidator();
                var result = validator.Validate(newUser);
                if(!result.IsValid)
                {
                    var resp = req.CreateResponse(HttpStatusCode.BadRequest);
                    await resp.WriteAsJsonAsync(result.Errors);
                    resp.StatusCode = HttpStatusCode.BadRequest;
                    return resp;
                }

                var existingUser = await userRepository.GetAsync(x => x.Email == newUser.Email);
                if (existingUser.Any()) return req.CreateResponse(HttpStatusCode.Conflict);

                var created = await userRepository.CreateAsync(newUser);
                var response = req.CreateResponse(HttpStatusCode.OK);
                await response.WriteAsJsonAsync(created);
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [Function("GetUserByEmail")]
        public async Task<HttpResponseData> GetUserByEmail([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route ="user/login")] HttpRequestData req)
        {
            _logger.LogInformation("Login an user.");
            try
            {
                var userLogin = await JsonSerializer.DeserializeAsync<User>(req.Body);
                if (userLogin == null) return req.CreateResponse(HttpStatusCode.BadRequest);

                var validator = new UserValidator();
                var result = validator.Validate(userLogin);
                if (!result.IsValid)
                {
                    var resp = req.CreateResponse(HttpStatusCode.BadRequest);
                    await resp.WriteAsJsonAsync(result.Errors);
                    resp.StatusCode = HttpStatusCode.BadRequest;
                    return resp;
                }

                var existingUsers = await userRepository.GetAsync(x => x.Email == userLogin.Email);
                if(existingUsers == null) return req.CreateResponse(HttpStatusCode.Unauthorized);

                var loggedInUser = existingUsers.FirstOrDefault(x => x.Password == userLogin.Password);
                if(loggedInUser == null) return req.CreateResponse(HttpStatusCode.Unauthorized);
                

                var response = req.CreateResponse(HttpStatusCode.OK);
                await response.WriteAsJsonAsync(loggedInUser);
                return response;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
