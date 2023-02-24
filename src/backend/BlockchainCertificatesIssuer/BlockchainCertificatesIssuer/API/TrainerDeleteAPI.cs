using System.Drawing;
using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Trainer;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.WebUtilities;
//using Microsoft.Azure.CosmosRepository;
//using Microsoft.Azure.CosmosRepository.Paging;
//using Microsoft.Azure.Functions.Worker;
//using Microsoft.Azure.Functions.Worker.Http;
//using Microsoft.Extensions.Logging;

//namespace BlockchainCertificatesIssuer.API.API
//{
//    public class TrainerDeleteAPI
//    {
//        private readonly ILogger _logger;
//        private readonly IRepository<Trainer> repository;

//        public TrainerDeleteAPI(ILoggerFactory loggerFactory, IRepository<Trainer> repository)
//        {
//            _logger = loggerFactory.CreateLogger<TrainerDeleteAPI>();
//            this.repository = repository;
//        }

//        [Function("TrainerDeleteAPI")]
//        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "delete")] HttpRequestData req, CancellationToken hostCancellationToken)
//        {
//            using var cancellationSource =
//            CancellationTokenSource.CreateLinkedTokenSource(hostCancellationToken);
//            var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);
//            var firstName = queryDictionary["firstname"];

//            var response = req.CreateResponse(HttpStatusCode.OK);
//            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
//            IPage<Trainer> trainers = await repository.DeleteAsync(firstName, CancellationToken);

//            await response.WriteAsJsonAsync(trainers.Items);



//            if (firstName != trainers.Items)
//            {
//                response = req.CreateResponse(HttpStatusCode.BadRequest);
//                return response;
//            }


//            response.WriteString("Welcome to Azure Functions!");

//            return response;
//        }
//    }
//}

//    public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "delete")] HttpRequestData req, CancellationToken hostCancellationToken)
//    {

//        try
//        {
//            var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);
//            var firstName = queryDictionary["firstname"];
//            var response = req.CreateResponse(HttpStatusCode.OK);
//            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
//            IPage<Trainer> trainers = await repository.DeleteAsync(firstName, CancellationToken);

//            await response.WriteAsJsonAsync(trainers.Items);
//        }
//        catch (Exception ex)
//        {

//            response = req.CreateResponse(HttpStatusCode.BadRequest(ex.Message));
//            return response;
//        }
//    }

//}
