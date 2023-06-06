using Microsoft.EntityFrameworkCore;
using ApiBackend.Models;
using ApiBackend.Services.Contrato;

namespace ApiBackend.Services.Implementacion
{
    public class EmpleadoService:IEmpleadoService
    {
        private DbempleadosContext _dbcontext;

        public EmpleadoService(DbempleadosContext dbcontext)
        {
            _dbcontext = dbcontext;
        }


        public async Task<List<Empleado>> GetList()
        {
            try
            {
                List<Empleado> lista = new List<Empleado>();
                lista = await _dbcontext.Empleados.Include(ar =>ar.IdAreaNavigation).ToListAsync();
                return lista;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Empleado> Get(int IdEmpleado)
        {
            try
            {
                Empleado? empleado = new Empleado();
                empleado = await _dbcontext.Empleados.Include(ar => ar.IdAreaNavigation)
                    .Where(e => e.IdEmpleado == IdEmpleado).FirstOrDefaultAsync();
                return empleado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Empleado> Add(Empleado modelo)
        {
            try
            {
                _dbcontext.Empleados.Add(modelo);
                await _dbcontext.SaveChangesAsync();
                return modelo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(Empleado modelo)
        {
            try
            {
                _dbcontext.Empleados.Update(modelo);
                await _dbcontext.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> Delete(Empleado modelo)
        {
            try
            {
                _dbcontext.Empleados.Remove(modelo);
                await _dbcontext.SaveChangesAsync ();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
