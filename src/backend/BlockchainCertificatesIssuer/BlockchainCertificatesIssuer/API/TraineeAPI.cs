using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Trainee;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API
{
    public class TraineeAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Trainee> repository;

        public TraineeAPI(ILoggerFactory loggerFactory, IRepository<Trainee> repository)
        {
            _logger = loggerFactory.CreateLogger<TraineeAPI>();
            this.repository = repository;
        }

        [Function("TraineeAPI")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            await repository.CreateAsync(new Trainee { FirstName = "Thushini", LasttName = "Maheepala", EmailAddress = "thushini@bistecglobal.com" });
            response.WriteString("Welcome to Trainee application!");

            return response;
        }
    }
}
