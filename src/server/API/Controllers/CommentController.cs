using API.ApiModels.Comment;
using Data.DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService commentService;
        private readonly UserManager<User> userManager;

        public CommentController(ICommentService commentService, UserManager<User> userManager)
        {
            this.commentService = commentService;
            this.userManager = userManager;
        }
        public async Task<IActionResult> Get(string imageId)
        {
            var userId = this.userManager.GetUserId(User);
            var comments = await this.commentService.GetCommentsByImageId(imageId, userId);
            return Ok(comments);
        }
        
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(AddCommentModel model)
        {
            if (string.IsNullOrEmpty(model.Content))
            {
                return BadRequest("Content is empty");
            }
            if (string.IsNullOrEmpty(model.ImageId))
            {
                return BadRequest("ImageId is empty");
            }
            
            var user = await this.userManager.GetUserAsync(User);

            var commentId = await this.commentService.AddComment(model.Content, model.ImageId, user.Id);

            return Ok(new
            {
                CommentId = commentId,
                UserId = user.Id
            });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var userId = this.userManager.GetUserId(User);
            await this.commentService.DeleteComment(id, userId);

            return Ok();
        }
    }
}
