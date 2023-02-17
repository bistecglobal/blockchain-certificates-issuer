using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Certificate;
using BlockchainCertificatesIssuer.domain.Models.Course;
using BlockchainCertificatesIssuer.domain.Models.Trainee;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.API
{
    public class CertificateAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Certificate> repository;

        public CertificateAPI(ILoggerFactory loggerFactory, IRepository<Certificate> repository)
        {
            _logger = loggerFactory.CreateLogger<CertificateAPI>();
            this.repository = repository;
        }

        [Function("Certificate")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var certificate = await System.Text.Json.JsonSerializer.DeserializeAsync<Certificate>(req.Body);

            var response = req.CreateResponse(HttpStatusCode.OK);

            var created = await repository.CreateAsync(certificate);
            await response.WriteAsJsonAsync(created);
            response.WriteString("Welcome to Issue Certification Application!");
            return response;
        }
    }
}
