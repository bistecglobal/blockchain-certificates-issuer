using BlockchainCertificatesIssuer.Models.SendEmail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BlockchainCertificatesIssuer.API.API
{
    public static class SendMailOutLook
    {
        public static void MailManager(SendEmail sendEmail)
        {
            try
            {
                SmtpClient smtpClient = new SmtpClient("smtp-mail.outlook.com");
                smtpClient.Port = 587;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential credential = new System.Net.NetworkCredential(sendEmail.FromEmail, "pacm@230206");
                smtpClient.EnableSsl = true;
                smtpClient.Credentials = credential;

                MailMessage mailMessage = new MailMessage(sendEmail.FromEmail, sendEmail.ToEmail);
                mailMessage.Subject = sendEmail.Subject;
                mailMessage.Body = sendEmail.MailBody;
                mailMessage.IsBodyHtml = true;
                smtpClient.Send(mailMessage);

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }

  
}
