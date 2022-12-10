using Microsoft.AspNetCore.SignalR;
using Services.Contracts;

namespace API.Hubs
{
    public class CommentHub : Hub
    {
        private readonly IAuthService authService;

        public CommentHub(IAuthService authService)
        {
            this.authService = authService;
        }

        public async Task SendComment(string imageId)
        {
            await Clients.Group(imageId).SendAsync("NewComment");
        }

        public async Task ConnectComment(string imageId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, imageId);
        }
    }
}
