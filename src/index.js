import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {useState} from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import UserContext from './context/UserContext';
import ProgressContext from './context/ProgressContext';

import "./css/reset.css";

import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Today from "./components/Today.js";
import Habit from "./components/Habit.js";
import History from "./components/History.js";

function App(){
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState([])


    return(
        <>
        <UserContext.Provider value={{user, setUser}}>
        <ProgressContext.Provider value={{progress, setProgress}}>
            <BrowserRouter> 
			<Switch>
				<Route path="/" exact>
                    <Login />
				</Route>
                <Route path="/Register" exact>
                    <Register />
				</Route>
                <Route path="/Habit" exact>
                    <Habit />
				</Route>
                <Route path="/Today" exact>
                    <Today />
				</Route>
                <Route path="/History" exact>
                    <History />
				</Route>
			</Switch>
		    </BrowserRouter>
        </ProgressContext.Provider>
        </UserContext.Provider>
        </>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));
