using System.Net;
using BlockchainCertificatesIssuer.domain.Models.Course;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Azure.CosmosRepository.Paging;
using Microsoft.Azure.CosmosRepository;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace BlockchainCertificatesIssuer.API.API
{
    public class CourseGetAPI
    {
        private readonly ILogger _logger;
        private readonly IRepository<Course> repository;

        public CourseGetAPI(ILoggerFactory loggerFactory, IRepository<Course> repository)
        {
            _logger = loggerFactory.CreateLogger<CourseGetAPI>();
            this.repository = repository;
        }

        [Function("CourseGetAPI")]
        public async Task<HttpResponseData> Run(
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
                await repository.PageAsync(pageNumber: page, pageSize: size);
            await response.WriteAsJsonAsync(trainers.Items);
            return response;
        }
    }
}
