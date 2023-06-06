using ApiBackend.Models;
using Microsoft.EntityFrameworkCore;

using ApiBackend.Services.Contrato;
using ApiBackend.Services.Implementacion;

using AutoMapper;
using ApiBackend.DTOs;
using ApiBackend.Utilidades;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DbempleadosContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaSQL"));
});

builder.Services.AddScoped<IAreaService, AreaService>();
builder.Services.AddScoped<IEmpleadoService,EmpleadoService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


#region Peticiones ApiRest
app.MapGet("/Area/Lista", async (
    IAreaService _areaService,
    IMapper _mapper 
    ) =>
{
    var listaArea = await _areaService.GetList();
    var listaAreaDTO = _mapper.Map<List<AreaDTO>>(listaArea);

    if (listaAreaDTO.Count > 0)
    {
        return Results.Ok(listaAreaDTO);
    }
    else
    {
        return Results.NotFound();
    }
});

app.MapGet("/Empleado/Lista", async (
    IEmpleadoService _empleadoService,
    IMapper _mapper
    ) =>
{
    var listaEmpleado = await _empleadoService.GetList();
    var listaEmpleadoDTO = _mapper.Map<List<EmpleadoDTO>>(listaEmpleado);

    if (listaEmpleadoDTO.Count > 0)
    {
        return Results.Ok(listaEmpleadoDTO);
    }
    else
    {
        return Results.NotFound();
    }
});

app.MapPost("/Empleado/Guardar", async (
    EmpleadoDTO modelo,
    IEmpleadoService _empleadoService,
    IMapper _mapper
    ) =>
    {
        var _empleado = _mapper.Map<Empleado>(modelo);
        var _empleadoCreado = await _empleadoService.Add(_empleado);

        if (_empleadoCreado.IdEmpleado != 0)
        {
            return Results.Ok(_mapper.Map<EmpleadoDTO>(_empleadoCreado));
        }
        else 
        {
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
        }
    });

app.MapPut("/Empleado/Actualizar/{IdEmpleado}", async (
    int IdEmpleado,
    EmpleadoDTO modelo,
    IEmpleadoService _empleadoService,
    IMapper _mapper
    ) =>
{
    var empleadoEncontrado = await _empleadoService.Get(IdEmpleado);
    if( empleadoEncontrado is null ) return Results.NotFound();

    var _empleado = _mapper.Map<Empleado>(modelo);

    empleadoEncontrado.NombreEmpleado = _empleado.NombreEmpleado;
    empleadoEncontrado.ApellidoEmpleado = _empleado.ApellidoEmpleado;
    empleadoEncontrado.TipoDocumento = _empleado.TipoDocumento;
    empleadoEncontrado.NumeroDocumento = _empleado.NumeroDocumento;
    empleadoEncontrado.IdArea = _empleado.IdArea;
    empleadoEncontrado.FechaContrato = _empleado.FechaContrato; 

    var respuesta = await _empleadoService.Update(empleadoEncontrado);

    if (respuesta)
    {
        return Results.Ok(_mapper.Map<EmpleadoDTO>(empleadoEncontrado));
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});


app.MapDelete("/Empleado/Eliminar/{IdEmpleado}", async (
    int IdEmpleado,
    IEmpleadoService _empleadoService
    
    ) =>
{
    var empleadoEncontrado = await _empleadoService.Get(IdEmpleado);
    if (empleadoEncontrado is null) return Results.NotFound();

    var respuesta = await _empleadoService.Delete(empleadoEncontrado);

    if (respuesta)
    {
        return Results.Ok();
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});
#endregion

app.UseCors("NuevaPolitica");


app.Run();

