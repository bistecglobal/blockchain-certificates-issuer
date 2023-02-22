using System.Net;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using static System.Runtime.InteropServices.JavaScript.JSType;
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

        [Function("Course")]
        public async Task<HttpResponseData> RunAsync([HttpTrigger(AuthorizationLevel.Anonymous,"post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var course = await System.Text.Json.JsonSerializer.DeserializeAsync<Course>(req.Body);
            
            var response = req.CreateResponse(HttpStatusCode.OK);
          
            var created = await repository.CreateAsync(new Course { Title = course.Title, Details = course.Details, StartDate = course.StartDate, EndDate = course.EndDate });
            await response.WriteAsJsonAsync(created);
            return response;
        }


    }
}
