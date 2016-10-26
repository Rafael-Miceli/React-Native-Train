using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoAlzira.Domain.Interfaces;
using VoAlzira.Domain.Models;

namespace VoAlzira.Domain.Services
{
    public class IngredienteService
    {
        private IIngredienteRepo _ingredienteRepo;

        public IngredienteService(IIngredienteRepo ingredienteRepo)
        {
            _ingredienteRepo = ingredienteRepo;
        }

        public List<Ingrediente> BuscarIngrdientes()
        {
            return _ingredienteRepo.BuscarIngredientes();
        }
    }
}
