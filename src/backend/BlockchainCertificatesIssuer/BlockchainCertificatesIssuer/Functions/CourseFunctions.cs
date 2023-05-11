using System.Net;
using System.Text.Json;
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
        public async Task<HttpResponseData> CreateCourse([HttpTrigger(AuthorizationLevel.Anonymous,"post", Route ="course")] HttpRequestData req)
        {
            _logger.LogInformation("Create a course.");

            try
            {
                var course = await JsonSerializer.DeserializeAsync<Course>(req.Body);
                if (course == null) return req.CreateResponse(HttpStatusCode.BadRequest);

                var created = await courseRepository.CreateAsync(course);
                var response = req.CreateResponse(HttpStatusCode.OK);
                await response.WriteAsJsonAsync(created);
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }

        }

        [Function("GetCourses")]
        public async Task<HttpResponseData> GetCourses(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "courses")] HttpRequestData req)
        {

            try
            {
                var queryDictionary = QueryHelpers.ParseQuery(req.Url.Query);

                var pageNumber = queryDictionary["pageNumber"];
                var pageSize = queryDictionary["pageSize"];
                //var pageNumber = "1";
                //var pageSize = "2";
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
                IPage<Course> courses =
                    await courseRepository.PageAsync(pageNumber: page, pageSize: size);

                if (courses == null || !courses.Items.Any())
                {
                    _logger.LogWarning("No data.");
                    response = req.CreateResponse(HttpStatusCode.NotFound);
                    await response.WriteAsJsonAsync("No data");
                    return response;
                }
                else
                {
                    await response.WriteAsJsonAsync(courses.Items);
                    return response;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
