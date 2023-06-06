namespace ApiBackend.DTOs
{
    public class EmpleadoDTO
    {
        public int IdEmpleado { get; set; }
        public string? NombreEmpleado { get; set; }
        public string? ApellidoEmpleado { get; set; }
        public string? TipoDocumento { get; set; }
        public string? NumeroDocumento { get; set; }
        public int? IdArea { get; set; }
        public string? NombreArea { get; set; }
        public string? FechaContrato { get; set; }
    }
}
