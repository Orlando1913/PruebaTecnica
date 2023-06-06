using Microsoft.EntityFrameworkCore;
using ApiBackend.Models;
using ApiBackend.Services.Contrato;

namespace ApiBackend.Services.Implementacion
{
    public class AreaService:IAreaService
    {
        private DbempleadosContext _dbcontext;

        public AreaService(DbempleadosContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<Area>> GetList()
        {
            try
            {
                List<Area> lista = new List<Area>();
                lista = await _dbcontext.Areas.ToListAsync();
                return lista;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
