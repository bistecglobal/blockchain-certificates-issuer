using Microsoft.Azure.CosmosRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlockchainCertificatesIssuer.domain.Models.Certificate
{
    public class Certificate : Item
    {
        public string Course { get; set; }
        public string Trainee { get; set; }
        public string Trainer { get; set; }
        public DateTime CertificateIssueDate { get; set; }
    }
}
