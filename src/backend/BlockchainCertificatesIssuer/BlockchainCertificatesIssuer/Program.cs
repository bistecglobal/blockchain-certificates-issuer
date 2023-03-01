using BlockchainCertificatesIssuer.domain.Models.Certificate;
using BlockchainCertificatesIssuer.domain.Models.Course;
using BlockchainCertificatesIssuer.domain.Models.Login;
using BlockchainCertificatesIssuer.domain.Models.Trainee;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
   .ConfigureFunctionsWorkerDefaults(
  )
    .ConfigureServices(services =>
    {
        services.AddCosmosRepository(builder => builder.ContainerBuilder
            .Configure<Login>(opt => opt.WithServerlessThroughput())
            .Configure<Certificate>(opt => opt.WithServerlessThroughput())
            .Configure<Course>(opt => opt.WithServerlessThroughput())
            .Configure<Trainee>(opt => opt.WithServerlessThroughput())
            .Configure<Trainee>(opt => opt.WithServerlessThroughput())
            );
    })
    .Build();

host.Run();

