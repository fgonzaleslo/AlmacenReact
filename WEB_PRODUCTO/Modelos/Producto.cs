using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WEB_PRODUCTO.Modelos
{
    public class Producto
    {
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
        public string Almacen { get; set; }
        public string FotoProducto { get; set; }
        public DateTime FechaIngreso { get; set; }

    }
}
