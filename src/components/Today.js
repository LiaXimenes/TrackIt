import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import UserContext from '../context/UserContext';

export default function Today(){
    const {user} = useContext(UserContext);
    const [arrayFromServer, setArrayFromServer ] = useState([]);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        request.then((response) => {console.log(response.data); setArrayFromServer(response.data)});
        request.catch(() => console.log("deu ruim"));
    }, [])

    function GetHabitArray(){
        const req = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        req.then((response) => setArrayFromServer(response.data));
        req.catch(() => console.log("deu bom nao"));
        
    }       


    return(
        <>
            <Navbar >
                <p>TrackIt</p>
                <img src={user.image} alt="" />
            </Navbar>

            <Presentday>
                <h1>Segunda, 17/5</h1>
                <p>Nenhum hábito concluido ainda</p>
            </Presentday>

            <TodaysHabits>
                {arrayFromServer.map(item => 
                    <Habit key = {item.id} >
                        <div>
                            <h1>{item.name}</h1>
                            <p>Sequência atual:{item.currentSequence}</p>
                            <p>Seu recorde: {item.highestSequence}</p>
                        </div>

                        <Checkbox done = {item.done} onClick = {() => (item.done === false ? true : false)}></Checkbox>
                    </Habit> 
                )}
            </TodaysHabits> 

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

const Presentday = styled.div`
    padding-top: 98px;
    margin-left: 18px;
    padding-bottom: 28px;

    h1{
        font-size: 23px;
        font-family: 'Lexend Deca', sans-serif;
        color:#126BA5;
        padding-bottom: 7px;
    }
    
    p{
        font-size: 18px;
        color: #bababa;
        font-family: 'Lexend Deca', sans-serif;
    }
`;

const TodaysHabits = styled.ul`
    margin-left: 20px;
    margin-bottom: 10px;
`;

const Habit = styled.li`
    width: 340px;
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;

    h1{
        font-family: 'Lexend Deca', sans-serif;
        color: #666666;
        font-size: 20px;
        padding-top: 13px;
        padding-bottom: 10px;
    }

    p{
        font-size: 12px;
        font-family: 'Lexend Deca', sans-serif;
        color: #666666;
    }
`;

const Checkbox = styled.button`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    background: ${props => (props.done === true ? "#8FC549" : "#EBEBEB")} ;
    box-shadow: solid 1px #E7E7E7;
    margin-right: 25px;
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
    margin-top: 50px;

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