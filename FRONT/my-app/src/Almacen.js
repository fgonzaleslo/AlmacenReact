import React,{Component} from 'react';
//import { tsConstructorType } from '@babel/types';
import {variables} from './Variables.js';
import {CSVLink} from 'react-csv';

export class Almacen extends Component{


    constructor(props){
        super(props);


        this.state={
            almacen:[],
            modalTitle:"",
            NombreAlmacen:"",
            IdAlmacen:0,


        }
    }
    

    refreshList(){
        fetch(variables.API_URL+'Almacen')
        .then(response=>response.json())
        .then(data=>{
            this.setState({almacen:data,almacenWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeNombreAlmacen =(e)=>{
        this.setState({NombreAlmacen:e.target.value});
    }

    agregarClick(){
        this.setState({
            modalTitle:"Agregar Almacen",
            IdAlmacen:0,
            NombreAlmacen:""
        });
    }

    editarClick(alma){
        this.setState({
            modalTitle:"Editar Almacen",
            IdAlmacen:alma.IdAlmacen,
            NombreAlmacen:alma.NombreAlmacen
        });
    }

    crearClick(){
        fetch(variables.API_URL+'Almacen',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                NombreAlmacen:this.state.NombreAlmacen
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
        fetch(variables.API_URL+'Almacen',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                IdAlmacen:this.state.IdAlmacen,
                NombreAlmacen:this.state.NombreAlmacen
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
        fetch(variables.API_URL+'Almacen/'+id,{
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

    render(){
        const {
            almacen,
            modalTitle,
            NombreAlmacen,
            IdAlmacen
        }=this.state;

        return(

            
<div>
    
    <button type='button'
    className='btn btn-primary m-2 float-end'
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.agregarClick()}>
        Agregar Almacen
    </button>
    <CSVLink data={almacen} filename={"prueba.csv"}><button>Exportar csv</button></CSVLink>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>
                    
                    Id_Almacen
                </th>
                <th>
                
                    Nombre del Almacen
                </th>
                <th>
                    Opciones
                </th>
            </tr>
        </thead>
        <tbody>
            {almacen.map(alma=>
                <tr key={alma.IdAlmacen}>
                    <td>{alma.IdAlmacen}</td>
                    <td>{alma.NombreAlmacen}</td>
                    <td>
                        <button type="button"
                        className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={()=>this.editarClick(alma)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>

                        <button type="button"
                        className="btn btn-light mr-1"
                        onClick={()=>this.eliminarClick(alma.IdAlmacen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            </svg>
                        </button>
                    </td>
                </tr>)}
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
        <div className="input-group mb-3">
         <span className="input-group-text">Nombre del Almacen</span>
         <input type="text" className="form-control"
         value={NombreAlmacen}
         onChange={this.changeNombreAlmacen}/>
        </div>

        {IdAlmacen==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.crearClick()}
        >
        Crear
        </button>
        :null}

        {IdAlmacen!=0?
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