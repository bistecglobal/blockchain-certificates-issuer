using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Trainer;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CosmosRepository.Paging;



namespace BlockchainCertificatesIssuer.API.API
{
    public class TrainerGetAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Trainer> repository;
       

       
        public TrainerGetAPI(ILoggerFactory loggerFactory, IRepository<Trainer> repository)
        {
            _logger = loggerFactory.CreateLogger<TrainerGetAPI>();
            this.repository = repository;
        }

        [Function("TrainerGetAPI")]
        public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req)
        {

            var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);
           
            var pageNumber = queryDictionary["pageNumber"];
            var pageSize = queryDictionary["pageSize"];
            var response = req.CreateResponse(HttpStatusCode.OK);

            if (string.IsNullOrWhiteSpace(pageNumber) || !int.TryParse(pageNumber, out var page) || page <= 0)
            {
                _logger.LogWarning("No pageNumber provided.");
                response = req.CreateResponse(HttpStatusCode.BadRequest);
                return response;;
            }

            if (string.IsNullOrWhiteSpace(pageSize) || !int.TryParse(pageSize, out var size) || size <= 0)
            {
                _logger.LogWarning("No pageSize provided.");
                response = req.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }

            IPage<Trainer> trainers =
                await repository.PageAsync(pageNumber: page, pageSize: size);
           await response.WriteAsJsonAsync(trainers.Items);
            return response;
        }
    }
}
