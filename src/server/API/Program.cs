using API.Hubs;
using CloudinaryDotNet;
using Data;
using Data.DbModels;
using Data.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.Configs;
using Services.Contracts;
using Services.Implementation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
const string DefaultCorsPolicyName = "Default";


builder.Services.AddControllers();
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});

var path = Environment.CurrentDirectory;
var DbPath = Path.Join(path, "portfolio.db");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
  options.UseSqlite($"Data Source={DbPath}"));


builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings.
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings.
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    
    options.User.RequireUniqueEmail = false;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    // Cookie settings
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.SlidingExpiration = true;
});
builder.Services.AddScoped<IRepository, Repository>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IEmailService, EmailService>();

var cloudinaryAccount = new Account("logopediawiki", "251392618569756", "jVlazU72hmYAAgZ2CRTmiQUQzB8");
var cloudinary = new Cloudinary(cloudinaryAccount);

builder.Services.AddSingleton(cloudinary);


builder.Services.AddCors(options =>
{
    options.AddPolicy(DefaultCorsPolicyName, builder =>
    {
        builder
            .WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var emailConfig = builder.Configuration
        .GetSection("EmailSettings")
        .Get<EmailConfiguration>();

builder.Services.AddSingleton(emailConfig);




var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
    Console.WriteLine("Migrated");
}
// Configure the HTTP request pipeline. 

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(DefaultCorsPolicyName);
app.UseAuthentication();
app.UseAuthorization();

if(app.Environment.IsDevelopment())
{
    app.MapControllers();
} 
else
{
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();

        endpoints.MapFallbackToFile("/index.html");
    });
}

app.MapHub<CommentHub>("/commentHub").RequireCors(builder =>
{
    builder
        .WithOrigins("http://localhost:3000", "http://localhost:5000", "https://localhost:5001", "https://localhost:7186/", "http://localhost:5152")
        .AllowAnyHeader()
        .AllowCredentials()
        .WithMethods("GET", "POST");
});

app.Run();
