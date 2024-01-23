"use client";

import Image from "next/image";
import "./globals.css";
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../estilos/menu.css'
//import createDocument from "@/pages/api/createDocument";
/**{
      'titulo': 'ref1',
      'subtitulo': 'materiales_ref1',
      'descripcion': 'descripcion',
      'UM': 'metro',
      'rendimiento': 16,
      'precio unitario': 850,
      'otro1': 20,
      'otro2': 21,
      'otro3': 22,
      'otro4': 23,
      'otro5': 24,
      'otro6': 25,                                         //176400      305,71              577
      'valor unitario': [['otro2', '*', 'otro1'], ['acumulado', '*', 'acumulado'], ['acumulado', '/', ['otro6', '+', ['otro5', '*', 'otro4']]], ['acumulado', '+', 'precio unitario']],
      'valor dinamico': 1
    } */


/*export const metadata = {
  title: "Tasks App",
};*/
//sin importar la palabra que se use para especificar el valor de paso, este debe ser reservada para evitar conflictos

//Modal.setAppElement('RootLayout')

export default function RootLayout({ children }) {
  const [objetoMatematicoEnUso, setObjetoMatematicoEnUso] = useState('');
  const [nombresObjetosMatematicos, setNombresObjetosMatematicos] = useState([]);
  const [nombreNuevoObjetoMatematico, setNombreNuevoObjetoMatematico] = useState('');
  const [nombreObjeto, setNombreObjeto] = useState('');
  const [comparacionNombreObjeto, setComparacionNombreObjeto] = useState('');
  const [editNombreObjetoMatematico, setEditNombreObjetoMatematico] = useState(false);

  const [newPath, setNewPath] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [coorPaso, setCoorPaso] = useState({});
  const [usar, setUsar] = useState(0);
  const [selectValues, setSelectValues] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedValue, setSelectedValue] = useState('numero');
  const [info, setInfo] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);


  async function fetchInfo(nomObj) {
    console.log('fetchInfo nomObj');
    console.log(nomObj);
    // Define la URL del endpoint de tu función getDocumentByCorreo
    const url = 'https://apu-6mxv8cc0u-davimusic.vercel.app/api/getDocumentsByTipo';

    setNombreObjeto(nomObj)
    setComparacionNombreObjeto(nomObj)
    setObjetoMatematicoEnUso(nomObj)
  
    // Define el correo que quieres buscar en la base de datos
    const data = { correo: 'davipianof@gmail.com', nombre: nomObj };
  
    // Realiza una solicitud POST al endpoint
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // convierte los datos a una cadena JSON
    });
  
    // Maneja la respuesta
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    const result = await response.json(); // extrae el cuerpo de la respuesta como JSON
    console.log(result);
    // Actualiza el estado con la información obtenida
    setNombresObjetosMatematicos(result.keys)
    setInfo(result.objeto['objetos']);
  }
  
  useEffect(() => {
    localStorage.setItem('email', 'davipianof@gmail.com')
    llamarNombresObjetosMatematicos()
  }, []); 

  useEffect(() => {
    if(nombresObjetosMatematicos[0] !== undefined && !hasFetched){
      fetchInfo(nombresObjetosMatematicos[0]);
      setHasFetched(true);
    }
  }, [nombresObjetosMatematicos]);

  function calculation(item, arr) {
    const operations = {
      '+': (a, b) => Number(a) + Number(b),
      '-': (a, b) => Number(a) - Number(b),
      '*': (a, b) => Number(a) * Number(b),
      '/': (a, b) => Number(a) / Number(b),
      '%': (a, b) => Number(a) % Number(b),
    };
  
    let a = Array.isArray(arr[0]) ? calculation(item, arr[0]) : (arr[0] === 'acumulado' ? item['acumulado'] : item[arr[0]]);
    let b = Array.isArray(arr[2]) ? calculation(item, arr[2]) : (arr[2] === 'acumulado' ? item['acumulado'] : item[arr[2]]);
  
    let result = operations[arr[1]](Number(a), Number(b));
  
    item['acumulado'] = result;
    return result;
  }

  const handleOnClick = (tittle, subtittle, key, value) => {
    console.log(tittle);
    /*console.log(subtittle);
    console.log(key);
    console.log(value);*/
    for (let newCoor = 0; newCoor < info.length; newCoor++) {
      if(tittle === info[newCoor]['titulo']){
        setCoorPaso({newCoor, key})
        if(key === 'valor unitario'){
          setSelectValues(info[newCoor][key])
          setModalContent({ tittle, subtittle, key, value: info[newCoor][key] });
        } else {
          setModalContent({ tittle, subtittle, key, value });
        }
      } else if(tittle === 'titulo' || tittle === 'subtitulo'){
        console.log('tutit');
        console.log(`tittle: ${tittle}, subtittle: ${subtittle}, key: ${key}, value: ${value}`);
        if(info[newCoor]['titulo'] === subtittle){
          setCoorPaso({newCoor, tittle, subtittle })
          setModalContent({ subtittle });
        } else if(info[newCoor]['subtitulo'] === subtittle){
          setCoorPaso({newCoor, tittle, subtittle })
          setModalContent({ subtittle });
        } 
      }
    }
    setModalIsOpen(true);
  }

  const handleInputChange = (event) => {
    setModalContent({
      ...modalContent,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    let newArr = []
    let newDicc = {}
    let bandera = 0

    console.log({modalContent});
    console.log({coorPaso});
    if(modalContent.key !== coorPaso.key && coorPaso.newCoor != undefined){
      for (let key in info[coorPaso.newCoor]){
        if(key === modalContent.key) {
          setErrorMessage(`No se puede realizar la acción: el valor de ${modalContent.key.toUpperCase()} ya existe en el objeto ${modalContent.tittle.toUpperCase()}, usa otro nombre`);
          bandera = 1;
        }
      }
    }

    info.forEach((item) => {
      if ((item.titulo === modalContent.subtittle) || (item.subtitulo === modalContent.subtittle) && modalContent.hasOwnProperty('item')) {
        bandera = 1
        setErrorMessage(`No se puede realizar la acción: el valor de ${modalContent.subtittle} ya existe en otro objeto como titulo o subtitulo`);
      } 
    });

    if (coorPaso.newCoor != undefined && bandera == 0){
      for (let u = 0; u < info.length; u++) {
          if(u === coorPaso.newCoor){
              for (let key in info[u]) {
                  if(coorPaso.tittle == 'titulo' && key === coorPaso.tittle){ 
                      newDicc[key]= modalContent.subtittle
                  } else if(coorPaso.tittle == 'subtitulo' && key === coorPaso.tittle){
                    newDicc[key]= modalContent.subtittle
                  } else if(coorPaso.key === key){
                    if (!isNaN(modalContent.value)) {
                      newDicc[modalContent.key] = Number(modalContent.value);
                    } else {
                      newDicc[modalContent.key] = modalContent.value;
                    }
                    
                    //newDicc[modalContent.key]= modalContent.value
                  } else {
                    newDicc[key]= info[u][key]
                  } 
              }
              if(coorPaso.tittle != 'titulo' && coorPaso.tittle != 'subtitulo'){
                  reemplazarValores(newDicc['valor unitario'], coorPaso.key, modalContent.key);
              }
              newArr.push(newDicc)
          } else {
              newArr.push(info[u])
          }
      }
      setInfo(newArr)
      setModalIsOpen(false)
    }
  }, [usar]);

  /*useEffect(() => {
    if (shouldUpdateHistory) {
      setFlecha(flecha+1)
      setHistorial(prevHistorial => [...prevHistorial, {
        newPath,
        modalIsOpen,
        modalContent,
        coorPaso,
        usar,
        selectValues,
        selectedValue,
        errorMessage,
        info
      }]);
    }    
  }, [newPath, modalIsOpen, modalContent, coorPaso, usar, selectValues, selectedValue, errorMessage, info]);*/

  useEffect(() => {
    console.log(JSON.stringify(coorPaso));
  }, [coorPaso]);

  function reemplazarValores(arr, valorAntiguo, valorNuevo) {
  for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
          reemplazarValores(arr[i], valorAntiguo, valorNuevo);
      } else if (arr[i] === valorAntiguo) {
          arr[i] = valorNuevo;
      }
  }
  }

  const handleDelete = (newPath) => {
    // Aquí va tu lógica para borrar la coordenada en newPath
  }

  const handleAdd = (newPath) => {
    // Aquí va tu lógica para agregar una nueva coordenada hija en newPath
  }

  function renderSelects(item, index, path = [], isTopLevel = false) {
    const newPath = [...path, index];
    let selectValue = selectValues;
    for (let i = 0; i < newPath.length; i++) {
      selectValue = selectValue[newPath[i]];
    }
    if (Array.isArray(item)) {
      const content = item.map((subItem, subIndex) => renderSelects(subItem, subIndex, newPath));
      return (
        <div key={index} style={{display: 'flex'}}>
          {isTopLevel && <img onClick={() => nuevoSubcalculo(newPath)} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706027794/agregarMas_gbbwzo.png" alt="Agregar Nuevo subcalculo" title="Agregar nuevo subcalculo"/>}
          {isTopLevel && <img onClick={() => otro(newPath, item)} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706029237/eye_dkbvst.png" alt="Descripción de la imagen" title="Editar subcalculo" />}
          {isTopLevel ? content : <>{<div style={{padding: '12px 20px', margin: '8px 0'}}>(</div>}{content}{<div style={{padding: '12px 20px', margin: '8px 0'}}>)</div>}</>}
        </div>
      );
    } else {
      return (
        <div key={index} style={{display: 'flex', alignItems: 'center'}}>
          {modalContent.hasOwnProperty('item') && (
            <>
              <button onClick={() => handleDelete(newPath)}>Borrar</button>
              {(index === 1 || index === 3) && <button onClick={() => handleAdd(newPath)}>Agregar</button>}
            </>
          )}
          <select style={{width: 'fit-content'}} className="select-moderno" value={selectValue || item} onChange={(event) => handleSelectChange(newPath, event)}>
            {index === 1 ? ['+', '-', '*', '/', '%'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            )) : Object.keys(info[coorPaso.newCoor]).filter(option => !isNaN(info[coorPaso.newCoor][option]) && option !== 'valor dinamico').map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }
  
  const otro = (newPath, item) => {
    setNewPath(newPath)
    setModalContent({item: item});
    setModalIsOpen(true);
  }

  const nuevoSubcalculo = (newPath) => {
    console.log(coorPaso);
    let inf = [...info];
    inf[coorPaso.newCoor]['valor unitario'].splice(newPath+1, 0, ['acumulado', '*', 'acumulado']);
    //setCoorPaso({newCoor: coorPaso.newCoor+1,key: "valor unitario"})
    console.log(inf[coorPaso.newCoor]['valor unitario']);
    setInfo(inf)
    console.log(coorPaso);
}

  function muestra(arr){
    /*console.log(coorPaso.newCoor);
    console.log(newPath[0]);
    console.log(arr);
    console.log(modalContent.item);*/

    let inf = info;
    if(arr.length == 1){
      console.log('llega 1');
      inf[coorPaso.newCoor]['valor unitario'][newPath[0]][arr[0]] = retornarValorNumerico(coorPaso.newCoor)
    } else if(arr.length != 1){
      console.log('llega 2');
      console.log(inf[coorPaso.newCoor]['valor unitario'][newPath[0]][arr[0]][arr[1]]);
      inf[coorPaso.newCoor]['valor unitario'][newPath[0]][arr[0]][arr[1]] = retornarValorNumerico(coorPaso.newCoor)
    }
    setInfo(inf)    
    setModalContent({item: inf[coorPaso.newCoor]['valor unitario'][newPath[0]]});
  }

  function agregarSub(arr){
    console.log(newPath[0]);
    console.log(arr);

    let inf = info;
    let target = inf[coorPaso.newCoor]['valor unitario'][newPath[0]];

    // Navega a través de las coordenadas en arr
    for(let i = 0; i < arr.length; i++){
        if(i === arr.length - 1){
            // Si estamos en la última coordenada, agrega el nuevo valor
            target[arr[i]] = ['acumulado', '+', 'acumulado'];
        } else {
            // Si no, sigue navegando
            target = target[arr[i]];
        }
    }
    console.log(inf[coorPaso.newCoor]['valor unitario'][newPath[0]]);
    setInfo(inf);
    setModalContent({item: inf[coorPaso.newCoor]['valor unitario'][newPath[0]]});
}

function retornarValorNumerico(idArreglo){
  let inf = info[idArreglo];
  for (let key in inf) {
    if(typeof inf[key] === 'number') {
      return key;
    }
  }
}

function editarMatriz(arreglo, nivel = 0, coor = []) {
  let elementos = [];
  for (let i = 0; i < arreglo.length; i++) {
      let newPath = [...coor, i];
      if (Array.isArray(arreglo[i])) {
          elementos.push(
              <div key={i} style={{ display: 'flex', flexDirection: 'row', marginLeft: nivel * 20, borderRadius: '0.7em', backgroundColor: '#870ada52' }}>
                  {i !== 1 && <img onClick={() => muestra(newPath)} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1701787300/trash_cq9i3d.png" title="Borrar subseccion matematica" alt="Descripción de la imagen" />}
                  <div style={{padding: '12px 20px', margin: '8px 0'}}>
                      {[...Array(nivel)].map((e, j) => <br key={j} />)}
                      (
                  </div>
                  {editarMatriz(arreglo[i], nivel + 1, newPath)}
                  <div style={{padding: '12px 20px', margin: '8px 0'}}>
                      {[...Array(nivel)].map((e, j) => <br key={j} />)}
                      )
                  </div>
              </div>
          );
      } else {
          elementos.push(
              <h1 key={i} style={{ padding: '10px'}}>
                  {i === 1 && <div style={{height:'55px'}}></div>}
                  {i !== 1 && <img onClick={() => agregarSub(newPath)} className="imagenes"  src="https://res.cloudinary.com/dplncudbq/image/upload/v1706027794/agregarMas_gbbwzo.png" title="Agregar nuevas subcalculos matematicos" alt="Descripción de la imagen" />}
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      {[...Array(nivel)].map((e, j) => <br key={j+1} />)}
                      <select style={{width: 'fit-content'}} className="select-moderno" value={arreglo[i]} onChange={(event) => handleSelectChange(newPath, event)}>
                          {i === 1 ? ['+', '-', '*', '/', '%'].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          )) : Object.keys(info[coorPaso.newCoor]).filter(option => !isNaN(info[coorPaso.newCoor][option])).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                  </div>
              </h1>
          );
      }
  }
  if(nivel === 0){
    return <>
              <img onClick={() => borrar()} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1701787300/trash_cq9i3d.png" alt="Agregar Nuevo subcalculo" title="Borrar seccion completa"/>
              <div style={{ display: 'flex', flexDirection: nivel === 0 ? 'row' : 'row' }}>{elementos}</div>
          </>
  } else {
    return <div style={{ display: 'flex', flexDirection: nivel === 0 ? 'row' : 'row' }}>{elementos}</div>
  }
}


function handleSelectChange(path, event) {
  /*console.log('path');
  console.log(path);
  console.log('newPath');
  console.log(newPath);
  console.log('newcoor');
  console.log(coorPaso.newCoor);*/

  let inf = info
  if (modalContent.hasOwnProperty('item')) {
      if(path.length === 1){
        inf[coorPaso.newCoor]['valor unitario'][newPath[0]][path[0]] = event.target.value;
      } else if(path.length === 2){
        inf[coorPaso.newCoor]['valor unitario'][newPath[0]][path[0]][path[1]] = event.target.value;
      } else if(path.length === 3){
        inf[coorPaso.newCoor]['valor unitario'][newPath[0]][path[0]][path[1]][path[2]] = event.target.value;
      } 

      console.log(inf[coorPaso.newCoor]['valor unitario'][newPath[0]]);
      setInfo(inf)
      setModalContent({item: inf[coorPaso.newCoor]['valor unitario'][newPath[0]]});
      return inf[coorPaso.newCoor]['valor unitario'][newPath[0]]
  } else {
      //console.log('XD');
      //console.log( event.target.value);
      if(path.length === 1){
        console.log(inf[coorPaso.newCoor]['valor unitario'][path[0]]);
        inf[coorPaso.newCoor]['valor unitario'][path[0]] = event.target.value
        console.log(inf[coorPaso.newCoor]['valor unitario'][path[0]]);
      } else if(path.length === 2){
        inf[coorPaso.newCoor]['valor unitario'][path[0]][path[1]] = event.target.value
      } else if(path.length === 3){
        inf[coorPaso.newCoor]['valor unitario'][path[0]][path[1]][path[2]] = event.target.value
      } else if(path.length === 4){
        inf[coorPaso.newCoor]['valor unitario'][path[0]][path[1]][path[2]][path[3]] = event.target.value
      } 
      
      console.log(inf[coorPaso.newCoor]['valor unitario']);
      setInfo(inf)
      console.log(modalContent);
      setModalContent({tittle: modalContent.tittle, subtittle: modalContent.subtittle, key: modalContent.key, value: inf[coorPaso.newCoor]['valor unitario']})
      return inf[coorPaso.newCoor]['valor unitario']
  } 
}

const renderLabel = (key) => {
  const isTitle = ['titulo', 'subtitulo'].includes(coorPaso.tittle) && ['tittle', 'subtittle'].includes(key);
  const isNotUnitValue = modalContent[key] !== 'valor unitario' && key !== 'tittle' && key !== 'subtittle' && modalContent[key] !== 'valor dinamico';
  
  if (isTitle || isNotUnitValue) {
    const labelName = isTitle ? coorPaso.tittle.charAt(0).toUpperCase() + coorPaso.tittle.slice(1) : key.charAt(0).toUpperCase() + key.slice(1);
    const inputType = isNaN(modalContent[key]) ? 'text' : 'number';
    
    return (
      <label key={key}>
        {labelName}:
        {typeof modalContent[key] === 'object' ? (
          <div style={{height: 'fit-content', width: '100%'}} className="scroll">
            {modalContent[key].map((item, index) => renderSelects(item, index, [], true))}
          </div>
        ) : (
          <input
            type={inputType}
            name={key}
            value={modalContent[key]}
            onChange={handleInputChange}
            className="input-moderno"
          />
        )}
      </label>
    );
  }
};

function cerrarErrorMessage(){
  setErrorMessage(null)
  setModalIsOpen(false)
}

function reemplazarNombre(arr, oldValue, newValue) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // Si el elemento es un arreglo, llama a la función de manera recursiva
      reemplazarNombre(arr[i], oldValue, newValue);
    } else if (arr[i] === oldValue) {
      // Si el elemento es igual al valor antiguo, lo reemplaza con el valor nuevo
      arr[i] = newValue;
    }
  }
  return arr;
}

function borrar(){
  console.log('borrar');
  console.log(coorPaso.newCoor);
  let inf = info
  let newArr = []
  if(inf[coorPaso.newCoor]['valor unitario'].length === 1){
    setErrorMessage('Debe haber al menos un solo subcalculo disponible')
  } else {
    for (let u = 0; u < inf[coorPaso.newCoor]['valor unitario'].length; u++) {
      if(u !== newPath[0]){
        newArr.push(inf[coorPaso.newCoor]['valor unitario'][u])
      }
    }
    inf[coorPaso.newCoor]['valor unitario'] = newArr
    setInfo(inf)
    setModalContent({tittle: modalContent.tittle, subtittle: modalContent.subtittle, key: modalContent.key, value: inf[coorPaso.newCoor]['valor unitario']})
  }
}

function borrarLlaveValor(){
  let inf = info
  console.log(inf[coorPaso.newCoor]);
  let valoresReaccionados = reemplazarNombre(inf[coorPaso.newCoor]['valor unitario'], coorPaso.key, retornarValorNumerico(coorPaso.newCoor))
  let newArr = {}
  for (let llave in inf[coorPaso.newCoor]) {
    if(coorPaso.key !== llave){
      newArr[llave]= inf[coorPaso.newCoor][llave]
    }
  } 

  
  newArr['valor unitario'] = valoresReaccionados
  newArr['acumulado'] = 0
  inf[coorPaso.newCoor] = newArr
  console.log(newArr);
  setModalContent({tittle: modalContent.tittle, subtittle: modalContent.subtittle, key: '', value: ''})
  setModalIsOpen(false)
  setInfo(inf)
}

function sumaObjetos(){
  let totalGlobal = 0
  //console.log(info[0]['acumulado']);
  for (let e = 0; e < info.length; e++) {
    totalGlobal += info[e]['acumulado'] * info[e]['valor dinamico']
  }
  return Math.round(totalGlobal);
}

function agregarNuevoLlaveValor(acc){
  if(acc !== 'numero' && acc !== 'texto'){
    const newCoor = info.findIndex(item => item['titulo'] === acc);
    setCoorPaso({newCoor, acc: 'nueva llave valor'});
    setModalIsOpen(true);
  } else {
    let inf = [...info];
    let baseKeyName = acc === 'numero' ? 'nuevoNum' : 'nuevoText';
    let newKeyName = baseKeyName;
    let i = 0;
    while (Object.keys(inf[coorPaso.newCoor]).includes(newKeyName)) {
      newKeyName = baseKeyName + '.' + i;
      i++;
    }
    inf[coorPaso.newCoor][newKeyName] = acc === 'numero' ? 0 : 'texto';
    setInfo(inf);
    setModalIsOpen(false);
  }
}

function destruirObjeto(acc){
  console.log(info.length);
  if (info.length <= 1) {
    setModalIsOpen(true);
    setErrorMessage('Debe haber al menos un solo objeto en uso');
  } else {
    const newCoor = info.findIndex(item => item['titulo'] === acc);
    if (newCoor === -1) return; // Si no se encuentra el objeto, no hacer nada
    let newArr = info.filter((item, index) => index !== newCoor);
    setInfo(newArr)
  }
}

function totalObjetosHijos(acc){
  const newCoor = info.findIndex(item => item['titulo'] === acc);
  return Math.round(info[newCoor]['acumulado'] * info[newCoor]['valor dinamico']);
}

function crearNuevoObjeto(){
  let newDicc = {
                  'titulo': '',
                  'subtitulo': 'materiales_',
                  'descripcion': 'la madre2',
                  'UM': 'metross',
                  'rendimiento': 16,
                  'precio unitario': 850,
                  'otro2': 20,
                  'otro2 unitario': 21,
                  'valor unitario': [['rendimiento', '*', 'precio unitario']],
                  'valor dinamico': 1
  }
  let inf = [...info] // Crea una copia del array info
  console.log('desde arriba');
  console.log(inf);
  let newName = 'newObject', newSubname = 'newSubObject'
  let unique = false;
  while (!unique) {
    unique = true;
    for (let u = 0; u < info.length; u++) {
      if (info[u]['titulo'] === newName) {
        newName += '.';
        unique = false;
        break;
      }
      if (info[u]['subtitulo'] === newSubname) {
        newSubname += '.';
        unique = false;
        break;
      }
    }
  }
  newDicc['titulo'] = newName
  newDicc['subtitulo'] = newSubname
  inf.unshift(newDicc) // Modifica la copia
  console.log('abajo');
  console.log(inf);
  setInfo(inf) // Actualiza el estado con la copia modificada
}

async function data() {
  setModalIsOpen(true)
  setErrorMessage('guardando informacion, por favor espere....')
  // Define la URL del endpoint de tu función createDocument
  const url = 'https://apu-6mxv8cc0u-davimusic.vercel.app/api/createDocument';

  // Define los datos que quieres guardar en la base de datos
  const data = { correo: localStorage.getItem('email'), 
                info: info, sumaObjeto: sumaObjetos(), 
                nombre: nombreObjeto,
                compararNombre: comparacionNombreObjeto
                };

  // Realiza una solicitud POST al endpoint
  const response = await fetch(url, {
    method: 'POST', // o 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // convierte los datos a una cadena JSON
  });

  // Maneja la respuesta
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const result = await response.json(); // extrae el cuerpo de la respuesta como JSON
  llamarNombresObjetosMatematicos()
  setErrorMessage('cambios guardados exitosamente')
}

const handleInputComparacionNombreObjeto = (event) => {
  setComparacionNombreObjeto(event.target.value);
}

const handleInputNombreNuevoObjetoMatematico = (event) => {
  setNombreNuevoObjetoMatematico(event.target.value);
}

const handleSelectChangeNombresObjetosMatematicos = (event) => {
  setObjetoMatematicoEnUso(event.target.value)
  setInfo([])
  fetchInfo(event.target.value)
}

function crearNuevoObjetoMatematico(){
  setModalIsOpen(true)
  let nombreAleatorio = "";
  let estaEnArreglo = true;
  let num = 0
  while(estaEnArreglo) {
    nombreAleatorio = 'nuevo' + num;
    estaEnArreglo = nombresObjetosMatematicos.includes(nombreAleatorio);
    num += 1
  }

  setNombreNuevoObjetoMatematico(nombreAleatorio)
}

function crearNuevoObjetoMatematicoEnDb(){
  let posible = nombresObjetosMatematicos.includes(nombreNuevoObjetoMatematico);
  if(posible === false){
    setModalIsOpen(true)
    setErrorMessage('creando nuevo objeto matematico, por favor espere....')
    fetch('/api/crearNuevoObjetoMatematicoEnDb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: localStorage.getItem('email'), 
        nombreNuevoObjetoMatematico: nombreNuevoObjetoMatematico 
      }),
    })
    .then(response => response.json())
    .then(data => {setErrorMessage('creado nuevo objeto matematico exitosamente'); llamarNombresObjetosMatematicos()})
    .catch((error) => {
      console.error('Error:', error);
    });    
  }
}

async function llamarNombresObjetosMatematicos(){
  const url = 'https://apu-6mxv8cc0u-davimusic.vercel.app/api/getKeys';

  // Define los datos que quieres enviar a la base de datos
  const data = { correo: localStorage.getItem('email') };

  // Realiza una solicitud POST al endpoint
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // convierte los datos a una cadena JSON
  });

  // Maneja la respuesta
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const keys = await response.json();

  setNombresObjetosMatematicos(keys)
}

function editarNombreObjetoMatematico(){
  setModalIsOpen(true)
  setEditNombreObjetoMatematico(true)
}

function Menu(){
  const [isOpen, setIsOpen] = useState(false);
  
  function changeMenuState(){
      setIsOpen(!isOpen)
  }

  return(
  <div className={`dropdown ${isOpen ? 'open' : ''}`}> 
      <img onClick={()=> changeMenuState()} className="imagenes" style={{margin: '5px'}} src="https://res.cloudinary.com/dplncudbq/image/upload/v1701542645/menu1_ui2fw4.png" alt="Descripción de la imagen" />
      {isOpen && (
          <div className='menuContent'>
            <h2>limpio</h2>
          </div>
      )}
  </div>
  )
}

/*function moverHistorial(acc){
  let newFlecha = 0
  let flechaGlobal = flecha

  setShouldUpdateHistory(false)
  console.log('entra a adelante');
  if(acc === 'adelante'){
    if(flechaGlobal +1 <= (historial.length-1)){
      newFlecha = flechaGlobal+1
      console.log('dentro');
      console.log(flecha);
      setFlecha(newFlecha)
    }  else {
      console.log('no entorrr');
      console.log('flechaGlobal +1');
      console.log(flechaGlobal +1);
      console.log('(historial.length-1)');
      console.log(historial.length-1);
    }
  }

  if(acc === 'atras'){
    if(flechaGlobal-1 >= 0 ) {
      console.log('atras');
      newFlecha = flechaGlobal-1
      setFlecha(newFlecha)
    } else {
      //alert('no mas atras')
    }
  } 
  
  console.log('historial.length');
  console.log(historial.length);
  console.log('newFlecha');
  console.log(newFlecha);

  setNewPath(historial[newFlecha]['newPath'])
  setModalIsOpen(historial[newFlecha]['modalIsOpen'])
  setModalContent(historial[newFlecha]['modalContent'])
  setCoorPaso(historial[newFlecha]['coorPaso'])
  setUsar(historial[newFlecha]['usar'])
  setSelectValues(historial[newFlecha]['selectValues'])
  setSelectedValue(historial[newFlecha]['selectedValue'])
  setErrorMessage(historial[newFlecha]['errorMessage'])
  setInfo(historial[newFlecha]['info'])

  setTimeout(() => {
    setShouldUpdateHistory(true)
    console.log('listo');
  }, 250);
}*/

  return (
    <html style={{backgroundColor: '#00000071', backgroundImage: 'url(https://res.cloudinary.com/dplncudbq/image/upload/v1696994289/PhotoReal_awesome_city_4k_sun_shine_0_11zon_f6uqjp.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Dancing+Script&family=Montserrat+Alternates:ital,wght@0,300;1,100&family=PT+Serif:ital@1&family=Playfair+Display:ital,wght@1,500&family=Rubik+Vinyl&display=swap"
          rel="stylesheet"
        />
        <link 
          rel="icon" 
          href="https://res.cloudinary.com/dplncudbq/image/upload/v1692559936/mias/icon_efg3sf.png" 
          type="image/x-icon">
        </link>
      </head>
      <body>
        <Menu></Menu>
        {info.length === 0 ? 
          <div className="miContenedor">
            <div className="miCirculoGiratorio"></div>
          </div>
          : 
          <div className="centrar scroll" style={{display: 'flex', flexWrap: 'wrap', height: 'fit-content', padding: '20px', borderBottom: '1px solid white', backgroundColor: '#00000071'}}>                      
            <h2 style={{paddingTop: '15px'}}>Total operación: $ {sumaObjetos()}</h2>
            <img onClick={()=> crearNuevoObjetoMatematico()} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/crearNuevoObjetoMatematico_gnxugb.png" title="Crea un nuevo objeto matematico" alt="Descripción de la imagen" />
            <img onClick={()=> crearNuevoObjeto()} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/crearNuevoObjeto_o9hw7f.png" title="Crea un nuevo objeto en el actual lugar" alt="Descripción de la imagen" />
            <img onClick={()=> data()} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/save_pmx5wo.png" title="Guardar en memoria" alt="Descripción de la imagen" />
            <img onClick={()=> editarNombreObjetoMatematico()} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1701787300/edit_cdqnpt.png" title="Edita el nombre de la objeto matematico actual" alt="Descripción de la imagen" />
            <select style={{width: 'fit-content', height: 'fit-content'}} className="select-moderno" value={objetoMatematicoEnUso} onChange={(event) => handleSelectChangeNombresObjetosMatematicos(event)} title="Filtro de objetos matematicos">
              {nombresObjetosMatematicos.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>  
          </div>
        }
        <div style={{height: '75vh'}} className='scroll'>
          {info.map((item, index) => {
            if (item && typeof item === 'object') {
              item['acumulado'] = 0; // Reset the array for each item
            }
            return (
              <div style={{width: '100%'}} className="scroll">
                <div className=' bordes' style={{width: '100%', marginBottom: '20px', padding: '30px', borderRadius: '0.7em'}} key={index}>
                  <div style={{padding:'5px'}}>
                    <img onClick={()=> agregarNuevoLlaveValor(item.titulo)} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1706027794/agregarMas_gbbwzo.png" alt="Descripción de la imagen" title="Agregar contenido" />
                    <img onClick={()=> destruirObjeto(item.titulo)} className="imagenes" src="https://res.cloudinary.com/dplncudbq/image/upload/v1701787300/trash_cq9i3d.png" alt="Descripción de la imagen" title="Borrar contenido"/>
                  </div>
                  <h1 style={{padding: '5px'}} className='resaltar color1 centrar borde bordes' onClick={() => handleOnClick('titulo', item.titulo)}>{item.titulo}</h1>
                  <h2 style={{padding: '5px'}}className='resaltar color2 centrar borde bordes' onClick={() => handleOnClick('subtitulo', item.subtitulo)}>{item.subtitulo}</h2>
                  <div style={{display: 'flex'}} className="scroll">
                    {Object.entries(item).map(([key, value]) => {
                      if (typeof value === 'string' && key !== 'titulo' && key !== 'subtitulo' ) {
                        return (
                          <div onClick={() => handleOnClick(item.titulo, item.subtitulo, key, value)} style={{display: 'block'}} key={key}>
                            <div className='resaltar color1 borde bordes noSaltoDeLinea' style={{padding: '5px',  minWidth: '10vw'}}>{key}</div>
                            <div className='resaltar color2 borde bordes noSaltoDeLinea' style={{padding: '5px',  minWidth: '10vw'}}>{value}</div>
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div style={{display: 'flex'}} className="scroll">  
                    {Object.entries(item).map(([key, value]) => {
                      if (typeof value === 'number' && key !== 'acumulado' && key !== 'valor dinamico') {
                        return (
                          <div onClick={() => handleOnClick(item.titulo, item.subtitulo, key, value)} style={{display: 'block'}} key={key}>
                            <div className='resaltar color1 borde bordes noSaltoDeLinea' style={{padding: '5px',  minWidth: '10vw'}}>{key}</div>
                            <div className='resaltar color2 borde bordes noSaltoDeLinea' style={{padding: '5px',  minWidth: '10vw'}}>{value}</div>
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div style={{display: 'flex'}} className="scroll">
                    {Object.entries(item).map(([key, value]) => {
                      if (key === 'valor unitario' || key === 'valor dinamico') {
                        if (Array.isArray(value)) {
                          value = value.reduce((acc, val) => {
                            return calculation(item, val);
                          }, 0);
                        }
                        return (
                          <div onClick={() => handleOnClick(item.titulo, item.subtitulo, key, value)} className="centrar" style={{display: 'block', width:'50%'}} key={key}>
                            <div className='resaltar color1 borde bordes noSaltoDeLinea' style={{padding: '5px', width: '100%', minWidth: 'fit-content'}}>{key}</div>
                            <div className='resaltar color2 borde bordes noSaltoDeLinea' style={{padding: '5px', width: '100%', minWidth: 'fit-content'}}>{value}</div>
                          </div>
                        )
                      }
                    })}
                  </div>
                  <h2  style={{padding: '5px'}} className="centrar color3 borde bordes" >Total: $ {totalObjetosHijos(item.titulo)}</h2>
                </div>
              </div>
            );
          })}
        </div>  
        <Modal
          //appElement={document.getElementById('RootLayout')}
          isOpen={modalIsOpen}
          onRequestClose={() => {setModalIsOpen(false); setErrorMessage(null); setEditNombreObjetoMatematico(false)}}
          style={{
            content: {
              background: 'black',
              color: 'white',
              borderRadius:' 0.7em'
            }
          }}
        >
          <>
            <div className="padre">
              <div style={{display: 'block', width: '100%'}}>
                {errorMessage ? (
                  <div>{errorMessage}</div>
                ) : 
                <>
                  <h2>Editar información</h2>
                  {editNombreObjetoMatematico === true ? 
                    <>
                    <input
                    type='text'
                    name={comparacionNombreObjeto}
                    value={comparacionNombreObjeto}
                    onChange={handleInputComparacionNombreObjeto}
                    className="input-moderno botones"
                    style={{width: 'fit-content'}}/>
                    <button onClick={()=> data()} className="botones">Actualizar el nombre</button>
                    </> 
                    :
                    <>
                      {!modalContent.hasOwnProperty('item') && (
                      <div style={{margin: '20px', display: 'flex'}}>
                        {nombreNuevoObjetoMatematico === '' ?
                          <button onClick={() => setUsar(usar+1)} className="botones">Actualizar</button> :
                          null 
                        }
                        {coorPaso.tittle !== 'titulo' && coorPaso.tittle !== 'subtitulo' && modalContent.key !== 'valor unitario' && modalContent.key !== 'valor dinamico' && nombreNuevoObjetoMatematico === '' && editNombreObjetoMatematico === false ? (
                            <button onClick={() => borrarLlaveValor()} className="botones">borrar llave valor</button>
                          ) : 
                            null
                        } 
                      </div> 
                      )}
                      {coorPaso.acc === 'nueva llave valor' && (
                        <div className="centrar" style={{display:'flex', width: '50%'}}>
                          <select className="select-moderno" onChange={(e) => setSelectedValue(e.target.value)} value={selectedValue}>
                            <option value="numero">Número</option>
                            <option value="texto">Texto</option>
                          </select>
                          <button onClick={() => agregarNuevoLlaveValor(selectedValue)} className="botones">crear nueva llave valor</button>
                        </div>
                      )}
                      {nombreNuevoObjetoMatematico !== '' && (
                        <div className="centrar" style={{display:'flex'}}>
                          <input
                            type='text'
                            name={nombreNuevoObjetoMatematico}
                            value={nombreNuevoObjetoMatematico}
                            onChange={handleInputNombreNuevoObjetoMatematico}
                            className="input-moderno botones"
                            style={{width: '10%'}}
                          />
                          <button onClick={() => crearNuevoObjetoMatematicoEnDb()} className="botones">crear nuevo objeto matematico</button>
                        </div>
                      )}
                      {modalContent.hasOwnProperty('item') ? (
                          <div>
                            <div style={{height: 'fit-content', width: '100%'}} className="scroll">
                              {editarMatriz(modalContent['item'])}
                            </div>
                          </div>
                        ) : 
                          coorPaso.acc !== 'nueva llave valor' && (
                            Object.keys(modalContent).map(renderLabel)
                          )
                      }
                    </>
                  }     
                </>}
              </div>
            </div>
            <button onClick={() => {setModalIsOpen(false); setErrorMessage(null); setEditNombreObjetoMatematico(false)}} className="botones">Cerrar modal</button>
          </>
        </Modal>
      </body>
    </html>
  );
}