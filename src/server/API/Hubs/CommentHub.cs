using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class CommentHub : Hub
    {
        public async Task SendComment(string imageId,string comment, string commentId, string username)
        {
            await Clients.Group(imageId).SendAsync("ReceiveComment", comment, commentId, username);
        }

        public async Task ConnectComment(string imageId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, imageId);
        }
    }
}
