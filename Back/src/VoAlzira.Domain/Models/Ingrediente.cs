using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VoAlzira.Domain.Models
{
    public class Ingrediente
    {
        public int Id { get; set; }
        public Fornecedor Fornecedor { get; set; }
        public string Nome { get; set; }
        public string Unidade { get; set; }
    }
}
