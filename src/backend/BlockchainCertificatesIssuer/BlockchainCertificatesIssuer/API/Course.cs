using System.Net;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BlockchainCertificatesIssuer.domain;
using BlockchainCertificatesIssuer.domain.Models.Course;

namespace BlockchainCertificatesIssuer.API.API
{
    public class CourseAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Course> repository;

        public CourseAPI(ILoggerFactory loggerFactory, IRepository<Course> repository)
        {
            _logger = loggerFactory.CreateLogger<CourseAPI>();
            this.repository = repository;
        }

        [Function("CourseAPI")]
        public async Task<HttpResponseData> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var course = await System.Text.Json.JsonSerializer.DeserializeAsync<CourseAPI>(req.Body);

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Course page!");
            await repository.CreateAsync(new Course { Title = "C#", Details = ".net7 course", StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(1) });
            return response;
        }


    }
}
