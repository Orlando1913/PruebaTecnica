using ApiBackend.Models;

namespace ApiBackend.Services.Contrato
{
    public interface IEmpleadoService
    {
        Task<List<Empleado>> GetList();
        Task<Empleado> Get(int IdEmpleado);

        Task<Empleado> Add(Empleado modelo);

        Task<bool> Update(Empleado modelo);

        Task<bool> Delete(Empleado modelo);
    }
}
