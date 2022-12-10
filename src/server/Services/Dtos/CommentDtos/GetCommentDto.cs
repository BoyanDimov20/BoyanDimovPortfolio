namespace Services.Dtos.CommentDtos;

public class GetCommentDto
{
    public string Id { get; set; }

    public string Content { get; set; }

    public string Username { get; set; }

    public bool IsEditable { get; set; }

    public string Name { get; set; }
}