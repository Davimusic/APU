"use client"

import { ApuMicro } from "./apuMicro";
import Login from "./login";
//import MisApu from "@/pages/misApu";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterReducer from "@/funciones/redux/counterReducer";
const store = createStore(counterReducer);



export default function RootLayout() {
  return (
    <Provider store={store}>
      <ApuMicro/>
    </Provider>
  );
}
