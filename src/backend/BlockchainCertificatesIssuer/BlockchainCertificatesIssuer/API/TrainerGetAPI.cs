using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Trainee;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.API
{
    public class TrainerGetAPI
    {
        private readonly ILogger _logger;

        public TrainerGetAPI(ILoggerFactory loggerFactory, IRepository<Trainee> repository)
        {
            _logger = loggerFactory.CreateLogger<TrainerGetAPI>();
        }

        [Function("TrainerGetAPI")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");



            return response;
        }
    }
}
