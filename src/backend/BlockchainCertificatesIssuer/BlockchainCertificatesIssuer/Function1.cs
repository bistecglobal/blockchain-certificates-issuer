using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BlockchainCertificatesIssuer
{
     public static class loginAsAdmin
    {
        [FunctionName("login")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["Email"];
            string password = req.Query["Password"];


            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.Email;
            password = password ?? data?.Password;

            string userPassword = "abc@123";
            string responseMessage;


            if (userPassword == password && name == "admin@bistecglobal.com")
            {
                responseMessage = "You can access admin page ";
            }
            else
            {
                responseMessage = $"Hello, {name} you can't access admin page , {password}";
            }


            return new OkObjectResult(responseMessage);
        }
    }
}
