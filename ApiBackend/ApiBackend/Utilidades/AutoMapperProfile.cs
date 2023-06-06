using AutoMapper;
using ApiBackend.DTOs;
using ApiBackend.Models;
using System.Globalization;

namespace ApiBackend.Utilidades
{
    public class AutoMapperProfile:Profile
    {

        public AutoMapperProfile()
        {
            #region Area
            CreateMap<Area, AreaDTO>().ReverseMap();
            #endregion

            #region Empleado
            CreateMap<Empleado, EmpleadoDTO>()
                .ForMember(destinoDTO => destinoDTO.NombreArea,
                opt => opt.MapFrom(origen => origen.IdAreaNavigation.NombreArea)

                )
                .ForMember(destinoDTO => destinoDTO.FechaContrato,
                opt => opt.MapFrom(origen => origen.FechaContrato.Value.ToString("dd/MM/yyyy"))
          );

            CreateMap<EmpleadoDTO, Empleado>()
                .ForMember(destino => destino.IdAreaNavigation,
                opt => opt.Ignore()
                )
                .ForMember(destino => destino.FechaContrato,
                opt => opt.MapFrom(origen => DateTime.ParseExact(origen.FechaContrato, "dd/MM/yyyy", CultureInfo.InvariantCulture))
                );

            #endregion
        }
    }
}
