using System.Net;
using BlockchainCertificatesIssuer.API.Models;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.Functions
{
    public class CertificateFunctions
    {
        private readonly ILogger _logger;
        private readonly IRepository<Certificate> certificateRepository;

        public CertificateFunctions(ILoggerFactory loggerFactory, IRepository<Certificate> repository)
        {
            _logger = loggerFactory.CreateLogger<CertificateFunctions>();
            this.certificateRepository = repository;
        }

        [Function("CreateCertificate")]
        public async Task<HttpResponseData> CreateCertificate([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route ="certificates")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var certificate = await System.Text.Json.JsonSerializer.DeserializeAsync<Certificate>(req.Body);

            var response = req.CreateResponse(HttpStatusCode.OK);

            var created = await certificateRepository.CreateAsync(certificate);
            await response.WriteAsJsonAsync(created);
            response.WriteString("Welcome to Issue Certification Application!");
            return response;
        }
    }
}
