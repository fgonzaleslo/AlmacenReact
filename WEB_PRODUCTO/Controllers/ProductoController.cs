using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WEB_PRODUCTO.Modelos;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WEB_PRODUCTO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _enviar;
        //private string query;

        public ProductoController(IConfiguration configuration, IWebHostEnvironment enviar)
        {
            _configuration = configuration;
            _enviar = enviar;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //string query = @"select IdAlmacen, NombreAlmacen from dbo.ALMACEN";
            string query = @"exec lista_producto";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AlmacenProd");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Producto pro)
        {
            string query = @"insert into dbo.PRODUCTO (NombreProducto,Almacen,FechaIngreso,FotoProducto) 
                            values (@NombreProducto,@Almacen,@FechaIngreso,@FotoProducto)";
            //string query = @"exec registro_almacen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AlmacenProd");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@NombreProducto", pro.NombreProducto);
                    myCommand.Parameters.AddWithValue("@Almacen", pro.Almacen);
                    myCommand.Parameters.AddWithValue("@FechaIngreso", pro.FechaIngreso);
                    myCommand.Parameters.AddWithValue("@FotoProducto", pro.FotoProducto);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }



        [HttpPut]
        public JsonResult Put(Producto pro)
        {
            string query = @"update dbo.PRODUCTO
                           set NombreProducto=@NombreProducto,
                           Almacen=@Almacen,
                           FechaIngreso=@FechaIngreso,
                           FotoProducto=@FotoProducto
                           where IdProducto=@IdProducto";
            //string query = @"exec modificar_almacen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AlmacenProd");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@IdProducto", pro.IdProducto);
                    myCommand.Parameters.AddWithValue("@NombreProducto", pro.NombreProducto);
                    myCommand.Parameters.AddWithValue("@Almacen", pro.Almacen);
                    myCommand.Parameters.AddWithValue("@FechaIngreso", pro.FechaIngreso);
                    myCommand.Parameters.AddWithValue("@FotoProducto", pro.FotoProducto);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.PRODUCTO
                           where IdProducto=@IdProducto";
            //string query = @"exec modificar_almacen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AlmacenProd");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@IdProducto", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("GuardarArchivo")]
        [HttpPost]
        public JsonResult GuardarArchivo()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedArchivo = httpRequest.Files[0];
                string NombreArchivo = postedArchivo.FileName;
                var PaqueteFisico = _enviar.ContentRootPath + "/Fotos/" + NombreArchivo;

                using (var stream = new FileStream(PaqueteFisico, FileMode.Create))
                {
                    postedArchivo.CopyTo(stream);
                }

                return new JsonResult(NombreArchivo);
            }
            catch (Exception)
            {
                return new JsonResult("ladrillo_king_kong.png");
            }
        }
    }
}
