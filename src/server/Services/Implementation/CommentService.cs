using Data.DbModels;
using Data.Repository;
using Microsoft.EntityFrameworkCore;
using Services.Contracts;
using Services.Dtos.CommentDtos;

namespace Services.Implementation;

public class CommentService : ICommentService
{
    private readonly IRepository repository;

    public CommentService(IRepository repository)
    {
        this.repository = repository;
    }

    public async Task<IEnumerable<GetCommentDto>> GetCommentsByImageId(string imageId, string currentUserId)
    {
        var comments = await this.repository.GetAll<Comment>()
            .Where(x => x.ImageId == imageId)
            .Select(x => new GetCommentDto
            {
                Id = x.Id,
                Content = x.Content,
                Username = x.User.FirstName,
                IsEditable = x.UserId == currentUserId
            }).ToListAsync();

        return comments;
    }

    public async Task<string> AddComment(string content, string imageId, string userId)
    {
        var id = Guid.NewGuid().ToString();
        await this.repository.Add(new Comment
        {
            Id = id,
            Content = content,
            ImageId = imageId,
            UserId = userId
        });

        return id;
    }
}