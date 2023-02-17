using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Course;
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

        [Function("Trainee")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var trainee =await System.Text.Json.JsonSerializer.DeserializeAsync<Trainee>(req.Body);
          
            var response = req.CreateResponse(HttpStatusCode.OK);

            var created = await repository.CreateAsync(trainee);
            await response.WriteAsJsonAsync(created);
        
            return response;
        }
    }
}
