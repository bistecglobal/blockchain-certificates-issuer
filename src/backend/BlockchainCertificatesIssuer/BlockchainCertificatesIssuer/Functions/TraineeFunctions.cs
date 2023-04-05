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
    public class TraineeFunctions
    {
        private readonly ILogger _logger;
        private readonly IRepository<Trainee> traineeRepository;

        public TraineeFunctions(ILoggerFactory loggerFactory, IRepository<Trainee> repository)
        {
            _logger = loggerFactory.CreateLogger<TraineeFunctions>();
            this.traineeRepository = repository;
        }

        [Function("CreateTrainee")]
        public async Task<HttpResponseData> CreateTrainee([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route ="trainee")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var trainee =await System.Text.Json.JsonSerializer.DeserializeAsync<Trainee>(req.Body);
          
            var response = req.CreateResponse(HttpStatusCode.OK);

            var created = await traineeRepository.CreateAsync(trainee);
            await response.WriteAsJsonAsync(created);
        
            return response;
        }

        [Function("GetTrainees")]
        public async Task<HttpResponseData> GetTrainees(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route ="trainees")] HttpRequestData req)
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

            IPage<Trainee> trainees =
                await traineeRepository.PageAsync(pageNumber: page, pageSize: size);
            await response.WriteAsJsonAsync(trainees.Items);
            return response;
        }
    }
}
