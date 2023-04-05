using System.Net;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BlockchainCertificatesIssuer.API.Models;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Azure.CosmosRepository.Paging;

namespace BlockchainCertificatesIssuer.API.Functions
{
    public class CourseFunctions
    {
        private readonly ILogger _logger;
        private readonly IRepository<Course> courseRepository;

        public CourseFunctions(ILoggerFactory loggerFactory, IRepository<Course> repository)
        {
            _logger = loggerFactory.CreateLogger<CourseFunctions>();
            this.courseRepository = repository;
        }

        [Function("CreateCourse")]
        public async Task<HttpResponseData> CreateCourse([HttpTrigger(AuthorizationLevel.Anonymous,"post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var course = await System.Text.Json.JsonSerializer.DeserializeAsync<Course>(req.Body);
            
            var response = req.CreateResponse(HttpStatusCode.OK);
            var created = await courseRepository.CreateAsync(new Course { Title = course.Title, Details = course.Details, StartDate = course.StartDate, EndDate = course.EndDate });
            await response.WriteAsJsonAsync(created);
            return response;
        }

        [Function("GetCourses")]
        public async Task<HttpResponseData> GetCourses(
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
                return response; ;
            }

            if (string.IsNullOrWhiteSpace(pageSize) || !int.TryParse(pageSize, out var size) || size <= 0)
            {
                _logger.LogWarning("No pageSize provided.");
                response = req.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }

            IPage<Course> trainers =
                await courseRepository.PageAsync(pageNumber: page, pageSize: size);
            await response.WriteAsJsonAsync(trainers.Items);
            return response;
        }
    }
}
