using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoAlzira.Domain.Models;

namespace VoAlzira.Domain.Interfaces
{
    public interface IFornecedorRepo
    {
        List<Fornecedor> BuscarFornecedores();
    }
}
