const initialState = {
  mirar: 'hola mundo de la madre XD',
  objetoMatematico: [],
  objetosMatematicos: []
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
    default:
      return state;
  }
};

export default counterReducer;
