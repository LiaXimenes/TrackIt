import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useContext } from "react";

import UserContext from '../context/UserContext';

export default function History(){
    const {user} = useContext(UserContext);

    return(
        <>
            <Navbar >
                <p>TrackIt</p>
                <img src={user.image} alt="" />
            </Navbar>

            
            <Historic>
                <h1>Histórico</h1>

                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Historic>


            <Footer>
                <Link to="/Habits">
                    <p>Hábitos</p>
                </Link>
                
                <Circle>
                <p>Hoje</p>
                </Circle>
                
                <Link to="/History">
                    <p>Histórico</p>
                </Link>
            </Footer>
      </>
    )
}

const Navbar = styled.div`
    width: 100%;
    height: 70px;
    background:#126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow:  4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 0;
    top: 0;

    p{
        font-size: 38px;
        font-family: 'Playball', cursive;
        color: #ffffff;
        margin-left: 16px;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 50px;
        margin-right: 18px;
    }
`;

const Historic = styled.div`
    width: 340px;
    margin-left: 18px;
    padding-top: 98px;

    h1{
        font-size: 23px;
        font-family: 'Lexend Deca', sans-serif;
        color:#126BA5; 
        padding-bottom: 17px;
    }

    p{
        font-size: 18px;
        font-family: 'Lexend Deca', sans-serif;
        line-height: 22px;
        color: #666666; 
    }
`;

const Footer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #ffffff;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #52B6FF;
    margin-top: 400px;

    a{ 
        text-decoration: none;
        color: #52B6FF;
   
    }
`;

const Circle = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50px;
    background: #52B6FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-bottom: 30px;
`;