using BlockchainCertificatesIssuer.API.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
   .ConfigureFunctionsWorkerDefaults(
  )
    .ConfigureServices(services =>
    {
        services.AddCosmosRepository(builder => builder.ContainerBuilder
            .Configure<Certificate>(opt => opt.WithServerlessThroughput())
            );
    })
    .Build();

host.Run();

