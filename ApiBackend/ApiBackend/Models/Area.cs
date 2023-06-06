using System;
using System.Collections.Generic;

namespace ApiBackend.Models;

public partial class Area
{
    public int IdArea { get; set; }

    public string? NombreArea { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public virtual ICollection<Empleado> Empleados { get; } = new List<Empleado>();
}
