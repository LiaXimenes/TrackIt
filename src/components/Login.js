import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    function onLogin(){

        const body = {
            email,
            password
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
        request.then(() => goToHabits())
        request.catch(() => alert("Ocorreu um Erro!"))


        function goToHabits(){
            history.push("/Today");
        }
    }

    return( 
        <Whitebody>
            <Top>
                <Growth src="plant-growth.jpg" />
                <Logo src="TrackIt.png" />
            </Top>

            <Inputs>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value = {email} />
                <input type="text" placeholder="senha" onChange={(e) => setPassword(e.target.value)} value = {password}/>

                <button onClick={onLogin}>Entrar</button>

                <Link to="/Register">
                    <p>Não tem conta? Cadastre-se</p>
                </Link>
                
            </Inputs>
        </Whitebody>
    )
}

const Whitebody = styled.div`
    width: 100%;
    height: 700px;
    background: #ffffff;
`

const Top = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 68px;
    margin-bottom: 32px;
`;

const Growth = styled.img`
    width: 200px;
    height: 120px; 
`;

const Logo = styled.img`
    width: 160px;
    height: 50px;
`;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: solid 1px #D4D4D4;
        margin-bottom: 6px;
        padding-left: 10px;
        font-size: 18px;
        color:black
    }

    button{
        width: 315px;
        height: 45px;
        border-radius: 5px;
        background: #52B6FF;
        font-size: 20px;
        color: #FFFFFF;
        margin-bottom: 25px;
        font-family: 'Lexend Deca', sans-serif;
    }

    p{
        color: #52B6FF;
        font-family: 'Lexend Deca', sans-serif;
    }

`;