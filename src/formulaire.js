import React, {useState} from "react";
import styled from "@emotion/styled";
import {Link,useNavigate} from "react-router-dom";
import tarifs from "./tarifs";
import {background} from "@chakra-ui/react";
import {color} from "framer-motion";
import {AppContext} from "./context/appcontext";







export default function Formulaire(){

    const [open, setOpen] = useState(false);
    const node = React.useRef();
    const appContext = React.useContext(AppContext);
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        appContext.setCurrentUser(null)
        navigate('/login')
    }



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
                <Link to={"/home"}>
                    Accueil
                </Link>
                <a href="titovideo/src/tarifs">
                    Nous connaître
                </a>
                <Link to="/tarifs">
                    Tarifs
                </Link>

                <a  onClick={logout} className="btn btn-primary">
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









    return(
        <div className="body">


            <header className="header">
                <h1 className="header__title">Tito</h1><h1 className="header__title2">video</h1>
                <div ref={node}>
                    <Burger open={open} setOpen={setOpen}/>
                    <Menu open={open} setOpen={setOpen}/>
                </div>
            </header>

            <h1 className="form__title">Choisissez ce que vous voulez avoir </h1>

            <div className="form__video">
                <button  className="form__video__1">
                    <p className="p__form">Vlog/irl</p>
                </button>
                <button className="form__video__2">
                    <p className="p__form">Gaming</p>
                </button>
                <button className="form__video__3">
                    <p className="p__form">Cuisine</p>
                </button>
                <button className="form__video__4">
                    <p className="p__form">Evènement</p>
                </button>

            </div>

        </div>
    )
}
