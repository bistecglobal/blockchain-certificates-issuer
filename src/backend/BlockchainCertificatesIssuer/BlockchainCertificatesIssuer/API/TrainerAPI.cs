using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Trainer;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.API
{
    public class TrainerAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Trainer> repository;

        public TrainerAPI(ILoggerFactory loggerFactory, IRepository<Trainer> repository)
        {
            _logger = loggerFactory.CreateLogger<TrainerAPI>();
            this.repository = repository;
        }

        [Function("Trainer")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var trainer = await System.Text.Json.JsonSerializer.DeserializeAsync<Trainer>(req.Body);

            var response = req.CreateResponse(HttpStatusCode.OK);
          
            var created = await repository.CreateAsync(trainer);
            await response.WriteAsJsonAsync(created);

            return response;
        }
    }
}
