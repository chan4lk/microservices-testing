using MicroServices.Testing.Clients;
using Microsoft.Extensions.Configuration;
using Refit;
using System.Net;

namespace MicroServices.Testing.StepDefinitions
{
  [Binding]
  public sealed class AuthDefinitions
  {
    private IAuthApi authApi;
    private readonly ScenarioContext context;

    public AuthDefinitions(ScenarioContext context)
    {
      if (config == null)
      {
        config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddEnvironmentVariables()
        .Build();
      }
      authApi = RestService.For<IAuthApi>(config["BaseUrl"] ?? "http://localhost:3333");
      this.context = context;
    }

    private static IConfiguration config;

    [Given(@"the username is (.*)")]
    public void GivenTheUsernameIs(string username)
    {
      context.Add("username", username);
    }

    [Given(@"the password is (.*)")]
    public void GivenThePasswordIsPassWord(string password)
    {
      context.Add("password", password);
    }

    [When(@"the signup api is called")]
    public async Task WhenTheSignupApiIsCalled()
    {
      var response = await authApi.Signup(new Models.CreateUserRequest
      {
        userName = context.Get<string>("username"),
        password = context.Get<string>("password")
      });

      context.Add("status", response.StatusCode);
    }

    [When(@"the signin api is called")]
    public async Task WhenTheSigninApiIsCalled()
    {
      var response = await authApi.Signin(new Models.CreateUserRequest
      {
        userName = context.Get<string>("username"),
        password = context.Get<string>("password")
      });

      context.Add("status", response.StatusCode);
    }


    [Then(@"the result code should be (.*)")]
    public void ThenTheResultCodeShouldBe(int code)
    {
      Assert.Equal(code, (int)context.Get<HttpStatusCode>("status"));
    }

  }
}
