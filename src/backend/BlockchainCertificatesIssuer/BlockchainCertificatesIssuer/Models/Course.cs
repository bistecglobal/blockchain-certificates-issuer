using Microsoft.Azure.CosmosRepository;


namespace BlockchainCertificatesIssuer.API.Models
{
    public class Course : Item
    {
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

}
