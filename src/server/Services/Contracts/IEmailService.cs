namespace Services.Contracts
{
    public interface IEmailService
    {
        public Task SendEmailAsync(string email, string subject, string content);
    }
}
