import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateAccion } from "@/funciones/redux/actions";
import '../estilos/menu.css'
import '../../src/app/globals.css'

export function Menu(){
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    


    const handleNavigation = (ruta) => {
        router.push(ruta);
        dispatch({ type: 'NAVIGATE', payload: ruta });
    };
    
    function changeMenuState(){
        setIsOpen(!isOpen)
    }

    return(
        <div className={`dropdown ${isOpen ? 'open' : ''}`}> 
            <img onClick={()=> changeMenuState()} className="imagenes" style={{margin: '5px'}} src="https://res.cloudinary.com/dplncudbq/image/upload/v1701542645/menu1_ui2fw4.png" alt="Descripción de la imagen" />
            {isOpen && (
                <div className='menuContent'>
                    <button onClick={() => dispatch(updateAccion('mostrarProyectos'))}>mis proyectos</button>
                    <button onClick={() => dispatch(updateAccion(''))}>salir</button>
                </div>
            )}
        </div>
    )
}


