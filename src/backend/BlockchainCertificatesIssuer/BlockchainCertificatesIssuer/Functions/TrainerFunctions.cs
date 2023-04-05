using System.Net;
using BlockchainCertificatesIssuer.API.Models;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.CosmosRepository.Paging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.Functions
{
    public class TrainerFunctions
    {
        private readonly ILogger _logger;
        private readonly IRepository<Trainer> trainerRepository;

        public TrainerFunctions(ILoggerFactory loggerFactory, IRepository<Trainer> repository)
        {
            _logger = loggerFactory.CreateLogger<TrainerFunctions>();
            this.trainerRepository = repository;
        }

        [Function("CreateTrainer")]
        public async Task<HttpResponseData> CreateTrainer([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route ="trainer")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var trainer = await System.Text.Json.JsonSerializer.DeserializeAsync<Trainer>(req.Body);
            var response = req.CreateResponse(HttpStatusCode.OK);
            var created = await trainerRepository.CreateAsync(trainer);
            await response.WriteAsJsonAsync(created);
            return response;
        }

        [Function("GetTraiers")]
        public async Task<HttpResponseData> GetTraiers(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route ="trainers")] HttpRequestData req)
        {
            var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);
            var pageNumber = queryDictionary["pageNumber"];
            var pageSize = queryDictionary["pageSize"];
            var response = req.CreateResponse(HttpStatusCode.OK);

            if (string.IsNullOrWhiteSpace(pageNumber) || !int.TryParse(pageNumber, out var page) || page <= 0)
            {
                _logger.LogWarning("No pageNumber provided.");
                response = req.CreateResponse(HttpStatusCode.BadRequest);
                return response; ;
            }

            if (string.IsNullOrWhiteSpace(pageSize) || !int.TryParse(pageSize, out var size) || size <= 0)
            {
                _logger.LogWarning("No pageSize provided.");
                response = req.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }

            IPage<Trainer> trainers =
                await trainerRepository.PageAsync(pageNumber: page, pageSize: size);
            await response.WriteAsJsonAsync(trainers.Items);
            return response;
        }
    }
}
