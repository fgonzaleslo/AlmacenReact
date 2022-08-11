import React,{Component} from 'react';
//import { tsConstructorType } from '@babel/types';
import {variables} from './Variables.js';

export class Producto extends Component{


    constructor(props){
        super(props);


        this.state={
            almacen:[],
            producto:[],
            modalTitle:"",
            IdAlmacen:0,
            NombreProducto:"",
            Almacen:"",
            FechaIngreso:"",
            FotoProducto:"ladrillo_king_kong.png",
            CarpetaFoto:variables.PHOTO_URL

        }
    }

    refreshList(){
        fetch(variables.API_URL+'Producto')
        .then(response=>response.json())
        .then(data=>{
            this.setState({producto:data});
        });

        fetch(variables.API_URL+'Almacen')
        .then(response=>response.json())
        .then(data=>{
            this.setState({almacen:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeNombreProducto =(e)=>{
        this.setState({NombreProducto:e.target.value});
    }

    changeAlamacen =(e)=>{
        this.setState({Almacen:e.target.value});
    }

    changeFechaIngreso =(e)=>{
        this.setState({FechaIngreso:e.target.value});
    }

    agregarClick(){
        this.setState({
            modalTitle:"Agregar Producto",
            IdProducto:0,
            NombreProducto:"",
            Almacen:"",
            FechaIngreso:"",
            FotoProducto:"ladrillo_king_kong.png"
        });
    }

    editarClick(pro){
        this.setState({
            modalTitle:"Editar Producto",
            IdProducto:pro.IdProducto,
            NombreProducto:pro.NombreProducto,
            Almacen:pro.Almacen,
            FechaIngreso:pro.FechaIngreso,
            FotoProducto:pro.FotoProducto
        });
    }

    crearClick(){
        fetch(variables.API_URL+'Producto',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                NombreProducto:this.state.NombreProducto,
                Almacen:this.state.Almacen,
                FechaIngreso:this.state.FechaIngreso,
                FotoProducto:this.state.FotoProducto
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Fallido');
        })
    }


    actualizarClick(){
        fetch(variables.API_URL+'Producto',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                IdProducto:this.state.IdProducto,
                NombreProducto:this.state.NombreProducto,
                Almacen:this.state.Almacen,
                FechaIngreso:this.state.FechaIngreso,
                FotoProducto:this.state.FotoProducto
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Fallido');
        })
    }


    eliminarClick(id){
        if(window.confirm("Seguro desea eliminar?")){
        fetch(variables.API_URL+'Producto/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Fallido');
        })
    }
}

    imageUpload=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'Producto/guardarArchivo', {
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({FotoProducto:data});
        })
    }

    render(){
        const {
            almacen,
            producto,
            modalTitle,
            IdProducto,
            NombreProducto,
            Almacen,
            FechaIngreso,
            CarpetaFoto,
            FotoProducto
        }=this.state;

        return(
<div>
    <button type='button'
    className='btn btn-primary m-2 float-end'
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.agregarClick()}>
        Agregar Producto
    </button>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>
                    Id_Producto
                </th>
                <th>
                    Nombre del Producto
                </th>
                <th>
                    Almacen
                </th>
                <th>
                    Fecha de Ingreso
                </th>
                <th>
                    Opciones
                </th>
            </tr>
        </thead>
        <tbody>
            {producto.map(pro=>
                <tr key={pro.IdProducto}>
                    <td>{pro.IdProducto}</td>
                    <td>{pro.NombreProducto}</td>
                    <td>{pro.Almacen}</td>
                    <td>{pro.FechaIngreso}</td>
                    <td>
                    <button type="button"
                        className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={()=>this.editarClick(pro)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                    </button>

                        <button type="button"
                        className="btn btn-light mr-1"
                        onClick={()=>this.eliminarClick(pro.IdProducto)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                )}
        </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
        <h5 className="modal-title">{modalTitle}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aira-label="Close">
        </button>
    </div>

    <div className="modal-body">
     <div className="d-flex flex-row bd-highlight mb-3">

      <div className="p-2 w-50 bd-highlight">

        <div className="input-group mb-3">
            <span className="input-group-text">Nombre del Producto</span>
            <input type="text" className="form-control"
            value={NombreProducto}
            onChange={this.changeNombreProducto}/>
    </div>

    <div className="input-group mb-3">
        <span className="input-group-text">Almacen</span>
        <select className='form-select'
         onChange={this.changeAlamacen}
         value={Almacen}>
             {almacen.map(alma=><option key={alma.IdAlmacen}>
                 {alma.NombreAlmacen}
             </option>)}
        </select>     
    </div>

    <div className="input-group mb-3">
         <span className="input-group-text">Fecha</span>
         <input type="date" className="form-control"
         value={FechaIngreso}
         onChange={this.changeFechaIngreso}/>
    </div>
</div>
    <div className="p-2 w-50 bd-highlight">
        <img width="250px" height="250px"
        scr={CarpetaFoto+FotoProducto}/>
        <input className="m-2" type="file" onChange={this.imageUpload}/>    
    </div>
</div>


        {IdProducto==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.crearClick()}
        >
        Crear
        </button>
        :null}

        {IdProducto!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.actualizarClick()}
        >
        Actualizar
        </button>
        :null}
     
     </div>
    </div>
</div>
</div>
</div>
        )
    }
}