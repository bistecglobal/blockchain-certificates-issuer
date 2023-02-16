using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Login;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BlockchainCertificatesIssuer.API.API
{
    public class LoginAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Login> repository;

        public LoginAPI(ILoggerFactory loggerFactory, IRepository<Login> repository)
        {
            _logger = loggerFactory.CreateLogger<LoginAPI>();
            this.repository = repository;
        }

        [Function("LoginAPI")]
        public async Task<HttpResponseData> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var data = await new StreamReader(req.Body).ReadToEndAsync(); 
            var temp = JsonConvert.DeserializeObject<Login>(data);

          

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
             var  user= await repository.GetAsync(x => x.UserName == temp.UserName && x.Password == temp.Password);

            if (user!=null)
            {
                response.WriteString("Welcome to Bistec Global!");
            }
            else
            {
                 response = req.CreateResponse(HttpStatusCode.Unauthorized);
            }

         
            response.WriteString("Welcome to Login form!");

           
            

            return response;
        }
    }
}
