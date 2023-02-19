using MicroServices.Testing.Models;
using Refit;

namespace MicroServices.Testing.Clients
{
  internal interface IAuthApi
  {
    [Get("/api/data")]
    Task<DataResponse> GetData();

    [Post("/api/signup")]
    Task<HttpResponseMessage> Signup([Body(BodySerializationMethod.Serialized)] CreateUserRequest user);

    [Post("/api/signIn")]
    Task<HttpResponseMessage> Signin([Body(BodySerializationMethod.Serialized)] CreateUserRequest user);
  }
}
