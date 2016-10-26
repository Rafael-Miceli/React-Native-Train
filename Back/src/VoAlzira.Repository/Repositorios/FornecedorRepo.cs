using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoAlzira.Domain.Interfaces;
using VoAlzira.Domain.Models;

namespace VoAlzira.Repository.Repositorios
{
    public class FornecedorRepo: IFornecedorRepo
    {
        private List<Fornecedor> _fornecedores;

        public FornecedorRepo()
        {
            CriarFornecedores();
        }

        private void CriarFornecedores()
        {
            _fornecedores = new List<Fornecedor>
            {
                new Fornecedor
                {
                    Id = 1,
                    Nome = "Nestlé",
                    Endereco = "Rua da Sagatiba"
                },
                new Fornecedor
                {
                    Id = 2,
                    Nome = "Quaker",
                    Endereco = "Rua da Jurupinga"
                },
                new Fornecedor
                {
                    Id = 3,
                    Nome = "Dona Benta",
                    Endereco = "Rua da Absolut"
                },
                new Fornecedor
                {
                    Id = 4,
                    Nome = "Rica",
                    Endereco = "Rua da José Cuervo"
                }
            };            
        }        

        public List<Fornecedor> BuscarFornecedores()
        {
            return _fornecedores;
        }
    }

    
}
