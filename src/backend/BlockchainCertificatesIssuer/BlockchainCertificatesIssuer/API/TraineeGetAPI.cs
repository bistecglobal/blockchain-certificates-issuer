using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Certificate;
using BlockchainCertificatesIssuer.domain.Models.Trainee;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API
{
    public class TraineeGetAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Trainee> repository;

        public TraineeGetAPI(ILoggerFactory loggerFactory,IRepository<Trainee>repository)
        {
            _logger = loggerFactory.CreateLogger<TraineeGetAPI>();
            this.repository = repository;
        }

        [Function("GetAllUser")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req, FunctionContext executionContext, string parameter1)
        {
            
            var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);
            var pageNumber = queryDictionary["pageNumber"];
            var pageSize = queryDictionary["pageSize"];

      

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.WriteString(pageSize);
            response.WriteString(pageNumber);

            response.WriteString("aaaaaaaaaaaaaaaaaaaaaaa");
            response.WriteString("Invalid credentials !");
            return response;

            
            

            
        }
    }
}
