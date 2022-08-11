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

namespace WEB_PRODUCTO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlmacenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        //private string query;

        public AlmacenController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //string query = @"select IdAlmacen, NombreAlmacen from dbo.ALMACEN";
            string query = @"exec lista_almacen";

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
        public JsonResult Post(Almacen alma)
        {
            string query = @"insert into dbo.ALMACEN values (@NombreAlmacen)";
            //string query = @"exec registro_almacen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AlmacenProd");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nombreAlmacen", alma.NombreAlmacen);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }



        [HttpPut]
        public JsonResult Put(Almacen alma)
        {
            string query = @"update dbo.ALMACEN
                           set NombreAlmacen=@nombreAlmacen
                           where IdAlmacen=@idAlmacen";
            //string query = @"exec modificar_almacen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AlmacenProd");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idAlmacen", alma.IdAlmacen);
                    myCommand.Parameters.AddWithValue("@nombreAlmacen", alma.NombreAlmacen);
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
            string query = @"delete from dbo.ALMACEN
                           where IdAlmacen=@idAlmacen";
            //string query = @"exec modificar_almacen";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AlmacenProd");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idAlmacen", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


    }
}
