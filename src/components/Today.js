import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import UserContext from '../context/UserContext';
import ProgressContext from '../context/ProgressContext';

import dayjs from 'dayjs';
import "dayjs/locale/pt-br";

export default function Today() {
    const { user } = useContext(UserContext);
    const { progress, setProgress } = useContext(ProgressContext);

    const [arrayFromServer, setArrayFromServer] = useState([]);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    const body = {}

    useEffect(() => {
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        request.then((response) => setArrayFromServer(response.data));
        request.catch();
    }, [])

    useEffect(() => {
        const doneHabits = arrayFromServer.filter((item) => item.done);
        setProgress(doneHabits);
    }, [arrayFromServer])

    function GetHabitArray() {
        const req = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        req.then((response) => setArrayFromServer(response.data));
        req.catch();
    }

    function CheckIfDone({ id, done }) {
        if (done === false) {
            AddCheckMark(id);
        } else { DeleteCheckMark(id) }
    }

    function AddCheckMark(id) {
        const requestCheckMark = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config)
        requestCheckMark.then(() => GetHabitArray());
        requestCheckMark.catch();
    }

    function DeleteCheckMark(id) {
        const reqDelCheckMark = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config)
        reqDelCheckMark.then(() => GetHabitArray());
        reqDelCheckMark.catch();
    }

    return (
        <>
            <Navbar >
                <p>TrackIt</p>
                <img src={user.image} alt="" />
            </Navbar>

            <Presentday>
                <h1>{dayjs().locale('pt-br').format("dddd, D/M")}</h1>
                {arrayFromServer.length > 0 ?
                    <p className={(progress.length * 100) / arrayFromServer.length > 0 ? "changeColorMessage" : ""}>{(progress.length * 100) / arrayFromServer.length === 0 ? "Nenhum hábito concluido ainda" : `${(progress.length * 100) / arrayFromServer.length}% dos Habitos concluídos`}</p>
                    :
                    <p>Você não tem nenhum habito cadastrado hoje. Cadastre algo!</p>
                }

            </Presentday>

            <TodaysHabits>
                {arrayFromServer.map(item =>
                    <Habit key={item.id} >
                        <div>
                            <h1>{item.name}</h1>
                            <p className={(item.done) === true ? "changeColorMessage" : ""}>Sequência atual:{item.currentSequence}</p>
                            <p className={item.highestSequence !== 0 ? (item.highestSequence >= item.currentSequence ? "changeColorMessage" : "") : ""}>Seu recorde: {item.highestSequence}</p>
                        </div>

                        <Checkbox done={item.done} onClick={() => CheckIfDone(item)} className={(item.done) === true ? "changeColor" : ""}>{item.done === true ? ":)" : ":("}</Checkbox>
                    </Habit>
                )}
            </TodaysHabits>

            <Footer>
                <Link to="/Habit">
                    <p>Hábitos</p>
                </Link>

                <Circle>
                    <CircularProgressbar strokeWidth={10} value={(progress.length * 100) / arrayFromServer.length} text={"Hoje"} background={true} backgroundPadding={5} styles={buildStyles({
                        textColor: '#fff',
                        trailColor: '#52B6FF',
                        backgroundColor: '#52B6FF',
                        pathColor: '#fff',
                    })} />
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
        &.changeColorMessage{
            color:#8FC549;
        }
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
        &.changeColorMessage{
            color:#8FC549;
        }
    }
`;

const Checkbox = styled.button`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    background: "#EBEBEB" ;
    box-shadow: solid 1px #E7E7E7;
    margin-right: 25px;
    font-size: 50px;
    color: #fff;

    &.changeColor{
        background: #8FC549;
        
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
    margin-top: 50px;

    a{ 
        text-decoration: none;
        color: #52B6FF;
   
    }
`;

const Circle = styled.div`
    width: 90px;
    height: 90px;
`;