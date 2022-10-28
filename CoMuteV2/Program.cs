using CoMuteV2.Api.Repositories;
using CoMuteV2.Api.Contracts;
using CoMuteV2.Api.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CoMuteV2.Api.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(options => options.Filters.Add<ErrorHandlingFilterAttribute>());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<SQLContext>();
builder.Services.AddSingleton<AppConfig>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICreatedCarPoolTicketRepository, CreatedCarPoolTicketRepository>();
builder.Services.AddScoped<IRegisteredCarPoolTicketRepository, RegisteredCarPoolTicketsRepository>();
builder.Services.AddScoped<IPassengersRepository, PassengersRepository>();

builder.Services.AddCors(options => {
        options.AddPolicy("cors-policy", policy => {
                policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
            }
        );
    }
);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Secret:Token").Value)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("cors-policy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
