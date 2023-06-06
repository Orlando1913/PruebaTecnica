using System;
using System.Collections.Generic;

namespace ApiBackend.Models;

public partial class Empleado
{
    public int IdEmpleado { get; set; }

    public string? NombreEmpleado { get; set; }

    public string? ApellidoEmpleado { get; set; }

    public string? TipoDocumento { get; set; }

    public string? NumeroDocumento { get; set; }

    public int? IdArea { get; set; }

    public DateTime? FechaContrato { get; set; }

    public DateTime? FechaCreacionEmpleado { get; set; }

    public virtual Area? IdAreaNavigation { get; set; }
}
