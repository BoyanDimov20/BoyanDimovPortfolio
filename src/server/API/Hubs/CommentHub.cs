using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class CommentHub : Hub
    {
        [HubMethodName("SendComment")]
        public async Task SendComment(string comment)
        {
            Console.WriteLine(comment);
            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}
