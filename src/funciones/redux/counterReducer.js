const initialState = {
  mirar: 'hola mundo de la madre XD',
  objetoMatematico: [],
  objetosMatematicos: [],
  correo: '',
  accion: '',//contenidoFinal, 'mostrarProyectos',//para estar entre login, un apu en especifico y los proyectos creados
  nombreObjetoMatematicoEnUso: '',
  materiales: {}
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MIRAR':
        return {
          ...state,
          mirar: action.payload, 
        };
    case 'UPDATE_INFO':
        return {
          ...state,
          objetoMatematico: action.payload, 
        };      
    case 'UPDATE_OBJETOS_MATEMATICOS':
        return {
          ...state,
          objetosMatematicos: action.payload, 
        };      
    case 'UPDATE_CORREO':
        return {
          ...state,
          correo: action.payload, 
        };       
    case 'UPDATE_ACCION':
        return {
          ...state,
          accion: action.payload, 
        };  
    case 'UPDATE_NOMBRE_OBJETO_MATEMATICO_EN_USO':
        return {
          ...state,
          nombreObjetoMatematicoEnUso: action.payload, 
        };
    case 'UPDATE_MATERIALES':
        return {
          ...state,
          materiales: action.payload, 
        };        
    default:
      return state;
  }
};

export default counterReducer;
