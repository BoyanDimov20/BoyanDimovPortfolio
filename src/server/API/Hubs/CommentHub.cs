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

        public async Task SendComment(string imageId,string comment, string commentId, string userId)
        {
            var user = await this.authService.GetUserById(userId);
            await Clients.Group(imageId).SendAsync("ReceiveComment", comment, commentId, user.UserName, user.FirstName);
        }

        public async Task ConnectComment(string imageId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, imageId);
        }
    }
}
