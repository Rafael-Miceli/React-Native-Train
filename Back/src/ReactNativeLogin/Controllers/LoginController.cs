using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ReactNativeLogin.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        [HttpPost]
        public async Task<string> Post([FromBody]LoginVm loginVm)
        {
            if (loginVm.Username == "admin" && loginVm.Password == "123")
                return "{\"token\": \"abc\"}";

            Response.StatusCode = 401;
            return "";
        }
    }

    public class LoginVm
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
