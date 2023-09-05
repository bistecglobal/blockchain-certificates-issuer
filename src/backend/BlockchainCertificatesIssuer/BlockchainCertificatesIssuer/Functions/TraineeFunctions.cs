using System.Net;
using System.Text.Json;
using BlockchainCertificatesIssuer.API.Models;
using BlockchainCertificatesIssuer.API.ViewModels;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.CosmosRepository.Paging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.Functions
{
    public class TraineeFunctions
    {
        private readonly ILogger _logger;
        private readonly IRepository<Trainee> traineeRepository;

        public TraineeFunctions(ILoggerFactory loggerFactory, IRepository<Trainee> repository)
        {
            _logger = loggerFactory.CreateLogger<TraineeFunctions>();
            this.traineeRepository = repository;
        }

        [Function("CreateTrainee")]
        public async Task<HttpResponseData> CreateTrainee([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route ="trainee")] HttpRequestData req)
        {
            _logger.LogInformation("Create a trainee.");

            try
            {
                var trainee = await JsonSerializer.DeserializeAsync<Trainee>(req.Body);
                if (trainee == null) return req.CreateResponse(HttpStatusCode.BadRequest);

                var created = await traineeRepository.CreateAsync(trainee);
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

        [Function("GetTrainees")]
        public async Task<HttpResponseData> GetTrainees(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route ="trainees")] HttpRequestData req)
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
                IPage<Trainee> trainees =
                    await traineeRepository.PageAsync(pageNumber: page, pageSize: size);

                var resource = new PaginationResultVM<Trainee>
                {
                    Size = trainees.Size,
                    Total = await traineeRepository.CountAsync(x => x.Type == nameof(Trainee)),
                    Items = trainees.Items
                };

                if (trainees == null || !trainees.Items.Any())
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

        [Function("DeleteTranee")]
        public async Task<HttpResponseData> DeleteCourse(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "trainee/{id}")] HttpRequestData req,
         string id)
        {
            _logger.LogInformation($"Deleting trainee with ID '{id}'.");

            try
            {

                var trainee = await traineeRepository.GetAsync(id);
                if (trainee == null)
                {
                    return req.CreateResponse(HttpStatusCode.NotFound);
                }

                await traineeRepository.DeleteAsync(id);

                return req.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return req.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [Function("GetTraineesById")]
        public async Task<HttpResponseData> GetTraineesById([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "trainee/{id}")]
        HttpRequestData req, string id)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request to get a course by ID.");
            try
            {
                var course = await traineeRepository.GetAsync(id);

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


        [Function("UpdateTrainee")]
        public async Task<HttpResponseData> UpdateCourse([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "traineeupdate/{id}")]
        HttpRequestData req, string id)
        {
            _logger.LogInformation($"Update course with ID: {id}");

            try
            {
                var existingTrainee = await traineeRepository.GetAsync(id);
                if (existingTrainee == null)
                {
                    return req.CreateResponse(HttpStatusCode.NotFound);
                }

                var updatedTrainee = await JsonSerializer.DeserializeAsync<Trainee>(req.Body);
                if (updatedTrainee == null)
                {
                    return req.CreateResponse(HttpStatusCode.BadRequest);
                }

                // Update the existing course with the new data
                existingTrainee.FirstName = updatedTrainee.FirstName;
                existingTrainee.LastName = updatedTrainee.LastName;
                existingTrainee.EmailAddress = updatedTrainee.EmailAddress;
                existingTrainee.WalletAddress = updatedTrainee.WalletAddress;

                var updated = await traineeRepository.UpdateAsync(existingTrainee);
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
