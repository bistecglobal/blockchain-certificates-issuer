using Microsoft.Azure.CosmosRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlockchainCertificatesIssuer.API.Models
{
    public class Certificate : Item
    {
        public string Course { get; set; }
        public List<Trainee> Trainee { get; set; }
        public string Trainer { get; set; }
        public DateTime CertificateIssueDate { get; set; }
    }
}
