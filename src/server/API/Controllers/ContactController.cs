using API.ApiModels.Contact;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Services.Contracts;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService emailService;

        public ContactController(IEmailService emailService)
        {
            this.emailService = emailService;
        }

        [HttpPost]
        public IActionResult Post(EmailModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            this.emailService.SendEmailAsync(model.Email, model.Subject, model.Content);

            return Ok();
        }
    }
}
