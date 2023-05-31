import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from "./context/appcontext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login";
import { ChakraProvider } from '@chakra-ui/react'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import tarifs from "./tarifs";
import Formulaire from "./formulaire";


const { Button } = chakraTheme.components

const theme = extendBaseTheme({
    components: {
        Button,

    },
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <AppProvider />
                <BrowserRouter>
                    <Routes>


                        <Route path="/login" element={<Login />} />



                     </Routes>
                </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
