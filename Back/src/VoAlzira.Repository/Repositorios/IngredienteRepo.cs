using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoAlzira.Domain.Interfaces;
using VoAlzira.Domain.Models;

namespace VoAlzira.Repository.Repositorios
{
    public class IngredienteRepo: IIngredienteRepo
    {
        private IFornecedorRepo _fornecedoresRepo;
        private List<Ingrediente> _ingredientes;

        public IngredienteRepo(IFornecedorRepo fornecedoresRepo)
        {
            _fornecedoresRepo = fornecedoresRepo;
            CriarIngredientes();
        }

        private void CriarIngredientes()
        {
            var fornecedores = _fornecedoresRepo.BuscarFornecedores();

            _ingredientes = new List<Ingrediente>
            {
                new Ingrediente
                {
                    Id = 1,
                    Nome = "Leite Condensado",
                    Fornecedor = fornecedores[0],
                    Unidade = "Lata"
                },
                new Ingrediente
                {
                    Id = 2,
                    Nome = "Creme de Leite",
                    Fornecedor = fornecedores[0],
                    Unidade = "Caixa"
                },
                new Ingrediente
                {
                    Id = 3,
                    Nome = "Fermento",
                    Fornecedor = fornecedores[1],
                    Unidade = "Lata"
                },
                new Ingrediente
                {
                    Id = 4,
                    Nome = "Manteiga",
                    Fornecedor = fornecedores[2],
                    Unidade = "Pote"
                },
                new Ingrediente
                {
                    Id = 5,
                    Nome = "Nozes",
                    Fornecedor = fornecedores[2],
                    Unidade = "Gramas"
                },
                new Ingrediente
                {
                    Id = 6,
                    Nome = "Ovos",
                    Fornecedor = fornecedores[3],
                    Unidade = "Unidade"
                }
            };
        }

        public List<Ingrediente> BuscarIngredientes()
        {
            return _ingredientes;
        }
    }
}
