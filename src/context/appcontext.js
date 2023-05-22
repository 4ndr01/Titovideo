import {createContext} from "react";
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Login from "../login";
import App from "../App";
import Tarifs from "../tarifs";
import Formulaire from "../formulaire";
import Signup from "../signup";
import Monteur_login from "../monteur_login";
import {navigate} from "@reach/router";
import { ChakraProvider } from '@chakra-ui/react'


export const AppContext = createContext(null);

export function AppProvider() {

        const [currentUser, setCurrentUser] = useState(null)









        //login
        const [user, setUser] = useState({
            loggedIn: false,
            username: null,
            password: null,

        })

        const router = createBrowserRouter([
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>},
            {
                path: '/',
                element: user.loggedIn ? <App/> : <Login/>

            },

            {
                path:'/home',
                element: <App />

            },

            {
                path:'/tarifs',
                element: <Tarifs />
            },
            {
                path:'/formulaire',
                element: <Formulaire />
            },
            {
                path:'/monteur_login',
                element: <Monteur_login />
            },



        ]);

        return (
            <ChakraProvider>
            <AppContext.Provider value={{
                currentUser, setCurrentUser,
                user, setUser}}>
                <RouterProvider router={router} />
            </AppContext.Provider>
            </ChakraProvider>
        )



}