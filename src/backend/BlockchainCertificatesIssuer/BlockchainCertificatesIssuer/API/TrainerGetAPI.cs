using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Trainer;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CosmosRepository.Paging;
using Azure;


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
        //public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req, FunctionContext executionContext, string parameter1)
        //{
        //    var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);
        //    var pageNumber = queryDictionary["pageNumber"];
        //    var pageSize = queryDictionary["pageSize"];

        //    var get = repository.PageAsync() ? pageNumber : pageSize;

        //    var response = req.CreateResponse(HttpStatusCode.OK);
        //    response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

        //    response.WriteString("Welcome to Azure Functions!");

        //    response.WriteString(pageSize);
        //    return response;
        //}
        public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequestData req,HttpRequest reqa,
        ILogger log,
        CancellationToken hostCancellationToken, FunctionContext executionContext, string parameter1)
        {

            using var cancellationSource =
                CancellationTokenSource.CreateLinkedTokenSource(hostCancellationToken, reqa.HttpContext.RequestAborted);

            var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);
            //string pageNumber = reqa.Query["pageNumber"];
            //string pageSize = reqa.Query["pageSize"];
            var pageNumber = queryDictionary["pageNumber"];
            var pageSize = queryDictionary["pageSize"];

            if (string.IsNullOrWhiteSpace(pageNumber) || !int.TryParse(pageNumber, out var page) || page <= 0)
            {
                log.LogWarning("No pageNumber provided.");
                return new BadRequestResult();
            }

            if (string.IsNullOrWhiteSpace(pageSize) || !int.TryParse(pageSize, out var size) || size <= 0)
            {
                log.LogWarning("No pageSize provided.");
                return new BadRequestResult();
            }

            IPage<Trainer> trainers =
                await repository.PageAsync(pageNumber: page, pageSize: size, cancellationToken: cancellationSource.Token);


            //var get = repository.PageAsync() ? pageNumber : pageSize;
            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            response.WriteString(pageNumber);
            return (IActionResult)response;

            return new OkObjectResult(trainers);
            //return (IActionResult)users;
        }
    }
}
