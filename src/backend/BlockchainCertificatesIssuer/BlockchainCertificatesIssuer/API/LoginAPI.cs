using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Course;
using BlockchainCertificatesIssuer.domain.Models.Login;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.API
{
    public class LoginAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Login> repository;

        public LoginAPI(ILoggerFactory loggerFactory, IRepository<Login> repository)
        {
            _logger = loggerFactory.CreateLogger<LoginAPI>();
            this.repository = repository;
        }

        [Function("LoginAPI")]
        public async Task<HttpResponseData> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            var temp = await System.Text.Json.JsonSerializer.DeserializeAsync<Login>(req.Body);
            
            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
             var  users = await repository.GetAsync(x => x.UserName == temp.UserName && x.Password == temp.Password);

            if (users.Count()==1)
            {
                response.WriteString("Welcome to Bistec Global!");
            }
            else
            {
                _logger.LogInformation("Invalid credentials !");
                response = req.CreateResponse(HttpStatusCode.Unauthorized);
                response.WriteString("Invalid credentials !");
            }
            return response;
        }
    }
}
