import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {useState, useContext} from "react";


import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Today from "./components/Today.js";
import Habit from "./components/Habit.js";
import History from "./components/History.js";

function App(){
    return(
        <>
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
        </>
     
    )

}


ReactDOM.render(<App />, document.querySelector(".root"));
