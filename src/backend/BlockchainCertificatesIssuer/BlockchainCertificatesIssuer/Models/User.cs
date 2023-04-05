using Microsoft.Azure.CosmosRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlockchainCertificatesIssuer.API.Models
{
    public class User : Item
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
