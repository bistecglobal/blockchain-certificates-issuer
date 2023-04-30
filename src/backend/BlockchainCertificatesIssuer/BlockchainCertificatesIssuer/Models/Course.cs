using Microsoft.Azure.CosmosRepository;
using Newtonsoft.Json;

namespace BlockchainCertificatesIssuer.API.Models
{
    public class Course : Item
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("Description")]
        public string Description { get; set; }

        [JsonProperty("startDate")]
        public DateTime StartDate { get; set; }

        [JsonProperty("endDate")]
        public DateTime EndDate { get; set; }
    }
}
