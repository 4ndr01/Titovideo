import logo from './logo.svg';
import './App.css';
import React from "react";
import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "./context/appcontext";
import styled from "@emotion/styled";
import Login from "./login";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import * as donnees from "react-bootstrap/ElementChildren";







export default function App() {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();


    const [user, setUser] = useState({
        username: "",
        commande: "",
    })






    const StyledMenu = styled.nav`
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #242423;
      transform: ${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
      height: 100vh;
      text-align: left;
      padding: 2rem;
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.3s ease-in-out;

      @media (max-width: 576px) {
        width: 100%;
      }

      a {
        font-size: 1rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: white;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
          font-size: 1.5rem;
          text-align: center;
        }

        &:hover {
          color: #343078;
        }
      }
    `

    const Menu = ({open}) => {
        return (
            <StyledMenu open={open}>
                <Link to={"/tarifs"}>
                    Vos commandes
                </Link>
                <a href="">
                    Nous connaître
                </a>

                <Link to={'/home'}>
                    Mes commandes
                </Link>


                <a className="btn btn-primary" onClick={logout}>
                    Déconnexion
                </a>
            </StyledMenu>
        )
    }

    const StyledBurger = styled.button`
      position: absolute;
      top: 5%;
      left: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 2rem;
      height: 2rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 10;

      &:focus {
        outline: none;
      }

      div {
      
        width: 2rem;
        height: 0.25rem;
        background: ${({open}) => open ? '#7421fc' : '#7421fc'};
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        :first-child {
          transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }

        :nth-child(2) {
          opacity: ${({open}) => open ? '0' : '1'};
          transform: ${({open}) => open ? 'translateX(20px)' : 'translateX(0)'};
        }

        :nth-child(3) {
          transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        }
      }
    `

    const Burger = ({open, setOpen}) => {
        return (
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
        )
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        appContext.setCurrentUser(null)
        navigate('/login')
    }
    //commande en cours



//afficher les commandes
    const [Donnees, setDonnees] = useState([])

useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
          `http://localhost:3001/commandes?username=${user.username}&password=${user.password}&commande=${user.commande}`

        );
            setDonnees(result.data);
        };
        fetchData().then(r => console.log(r));
    }, []);



    const [open, setOpen] = React.useState(false);

    const node = React.useRef();
    return (
        <div>
            <div>

            </div>

                <header className="header">
                    <h1 className="header__title">Tito</h1><h1 className="header__title2">video</h1>

                        <Burger open={open} setOpen={setOpen}/>
                        <Menu open={open} setOpen={setOpen}/>

                </header>

            {Donnees.map((donnee) => (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{donnee.commande}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{donnee.username}</h6>
                        <p className="card-text">{donnee.password}</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>

            ))}




        </div>
    );
}



