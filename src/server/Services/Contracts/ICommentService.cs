using Services.Dtos.CommentDtos;

namespace Services.Contracts
{
    public interface ICommentService
    {
        Task<IEnumerable<GetCommentDto>> GetCommentsByImageId(string imageId, string currentUserId);
        Task<string> AddComment(string content, string imageId, string userId);

        Task DeleteComment(string commentId, string userId);
    }
}
