using ApiBackend.Models;


namespace ApiBackend.Services.Contrato
{
    public interface IAreaService
    {
        Task<List<Area>> GetList();
    }
}
