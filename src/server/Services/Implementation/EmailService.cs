using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Services.Configs;
using Services.Contracts;

namespace Services.Implementation
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration configuration;

        public EmailService(EmailConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string subject, string content)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(email, configuration.Email));
            message.To.Add(new MailboxAddress(configuration.MailName, configuration.Email));
            message.Subject = subject;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = content };

            using var client = new SmtpClient();
            try
            {
                await client.ConnectAsync(configuration.MailServer, configuration.Port, true);
                await client.AuthenticateAsync(configuration.Email, configuration.Password);
                await client.SendAsync(message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            finally
            {
                await client.DisconnectAsync(true);
                client.Dispose();
            }
        }
    }
}
