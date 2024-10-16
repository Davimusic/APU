'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';;
import '../estilos/misProyectos.css';
import { updateNombreObjetoMatematicoEnUso, updateAccion } from "@/funciones/redux/actions";



export default function MisProyectos({setObjetoMatematicoEnUso, crearNuevoObjetoMatematico}) {
    const [nombresProyectos, setNombresProyectos] = useState([]);

    const objetosMatematicos = useSelector(state => state.objetosMatematicos);
    const objetoMatematico = useSelector(state => state.objetoMatematico);
    const nombreObjetoMatematicoEnUso = useSelector(state => state.nombreObjetoMatematicoEnUso);
    const dispatch = useDispatch();

    useEffect(() => {
        setNombresProyectos(Object.keys(objetosMatematicos))
    }, [objetosMatematicos]);

    useEffect(() => {
        console.log(nombreObjetoMatematicoEnUso)
    }, [nombreObjetoMatematicoEnUso]);

    function ver(value){
        dispatch(updateNombreObjetoMatematicoEnUso(value))
        dispatch(updateAccion('contenidoFinal'))
        setObjetoMatematicoEnUso(value)
    }

    function borrar(value){
        alert('falta')
    }


    return (
        <div style={{width:  '90vw', height: '90vh', overflow: 'auto', borderRadius: '0.5em'}}>
            <img onClick={()=> crearNuevoObjetoMatematico()} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/crearNuevoObjetoMatematico_gnxugb.png" title="Crea un nuevo objeto matematico" alt="Descripción de la imagen" />
            {nombresProyectos.length > 0 ? (
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th>N°</th>
                            <th>NOMBRE</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nombresProyectos.map((nombre, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{nombre}</td>
                                <td>
                                <img onClick={() => ver(nombre)} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706029237/eye_dkbvst.png" alt="Ver proyecto" title="Ver proyecto"/>
                                <img onClick={() => borrar(nombre)} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1701787300/trash_cq9i3d.png" alt="Borrar proyecto" title="Borrar proyecto"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay proyectos disponibles.</p>
            )}
        </div>
    );
}
