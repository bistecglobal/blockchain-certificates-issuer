using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BlockchainCertificatesIssuer.API.Service
{
    internal class Class
    {
      private void btnClick(object sender, EventArgs e)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("nalinsanjeewa1997@gmail.com");
                    mail.To.Add("nalinexp97@gmail.com");
                    mail.Subject ="Certicicate Issue ";
                    mail.Body = "<h1> URL='' </h1>";
                    mail.IsBodyHtml= true;

                    using (SmtpClient smtp = new SmtpClient("smtp.gamil.com",587)) {
                        smtp.Credentials = new System.Net.NetworkCredential("nalinsanjeewa1997@gmail.com", "0375610952ns");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);

                    }
                }

            }catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
      
    }
}
