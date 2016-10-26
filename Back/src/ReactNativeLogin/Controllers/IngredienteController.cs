using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VoAlzira.Domain.Models;
using VoAlzira.Domain.Services;

namespace ReactNativeLogin.Controllers
{
    [Route("api/[controller]")]
    public class IngredientesController : Controller
    {
        private IngredienteService _igredienteService;

        public IngredientesController(IngredienteService igredienteService)
        {
            _igredienteService = igredienteService;
        }
        
        public List<Ingrediente> Get()
        {
            return _igredienteService.BuscarIngrdientes();
        }
    }    
}
