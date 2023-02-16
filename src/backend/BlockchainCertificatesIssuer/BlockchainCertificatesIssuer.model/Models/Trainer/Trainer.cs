﻿using Microsoft.Azure.CosmosRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlockchainCertificatesIssuer.domain.Models.Trainer
{
    public class Trainer : Item
    {
        public string FirstName { get; set; }
        public string LasttName { get; set; }
        public string EmailAddress { get; set; }
    }
}
