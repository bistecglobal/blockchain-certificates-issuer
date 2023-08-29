using System.Net;
using System.Text.Json;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BlockchainCertificatesIssuer.API.Models;
using Microsoft.Azure.CosmosRepository.Paging;
using BlockchainCertificatesIssuer.API.ViewModels;

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
        public async Task<HttpResponseData> CreateCourse([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "course")] HttpRequestData req)
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
                var queryDictionary = System.Web.HttpUtility.ParseQueryString(req.Url.Query);

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
                IPage<Course> courses =
                    await courseRepository.PageAsync(pageNumber: page, pageSize: size);

                var resource = new PaginationResultVM<Course>
                {
                    Size = courses.Size,
                    Total = await courseRepository.CountAsync(x => x.Type == nameof(Course)),
                    Items = courses.Items
                };

                if (courses == null || !courses.Items.Any())
                {
                    _logger.LogWarning("No data.");
                    response = req.CreateResponse(HttpStatusCode.NotFound);
                    await response.WriteAsJsonAsync(resource);
                    return response;
                }
                await response.WriteAsJsonAsync(resource);
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [Function("DeleteCourse")]
        public async Task<HttpResponseData> DeleteCourse(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "course/{id}")] HttpRequestData req,
        string id)
        {
            _logger.LogInformation($"Deleting course with ID '{id}'.");

            try
            {

                var course = await courseRepository.GetAsync(id);
                if (course == null)
                {
                    return req.CreateResponse(HttpStatusCode.NotFound);
                }

                await courseRepository.DeleteAsync(id);

                return req.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [Function("GetCourseById")]
        public async Task<HttpResponseData> GetCourseById([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "course/{id}")]
        HttpRequestData req, string id)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request to get a course by ID.");
            try
            {
                var course = await courseRepository.GetAsync(id);

                if (course == null)
                {
                    return req.CreateResponse(HttpStatusCode.NotFound);

                }

                var response = req.CreateResponse(HttpStatusCode.OK);
                await response.WriteAsJsonAsync(course);
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the request.");
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

         [Function("UpdateCourse")]
         public async Task<HttpResponseData> UpdateCourse([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "courseupdate/{id}")] 
        HttpRequestData req,string id)
         {
            _logger.LogInformation($"Update course with ID: {id}");
                
             try
             {
                var existingCourse = await courseRepository.GetAsync(id);
                if (existingCourse == null)
                {
                    return req.CreateResponse(HttpStatusCode.NotFound);
                }

                var updatedCourse = await JsonSerializer.DeserializeAsync<Course>(req.Body);
                if (updatedCourse == null)
                {
                    return req.CreateResponse(HttpStatusCode.BadRequest);
                }

                // Update the existing course with the new data
                existingCourse.Title = updatedCourse.Title;
                existingCourse.Description = updatedCourse.Description;
                existingCourse.StartDate = updatedCourse.StartDate;
                existingCourse.EndDate = updatedCourse.EndDate;

                var updated = await courseRepository.UpdateAsync(existingCourse);
                var response = req.CreateResponse(HttpStatusCode.OK);
                await response.WriteAsJsonAsync(updated);
                return response;
             }
            catch (Exception ex)
             {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
              }
         }
    }
}
