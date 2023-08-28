using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlockchainCertificatesIssuer.API.ViewModels
{
    internal class PaginationResultVM<T>
    {
        public int Total { get; set; }
        public int Size { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}
