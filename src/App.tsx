import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Main from "./views/main/index";
import User from "./views/user/index";

function App() {
    return (
        <BrowserRouter basename="/web">
            <Route path="/main" render={() => <Main />}></Route>
            <Route path="/user" render={() => <User />}></Route>
            <Redirect from="/" to="/main" exact></Redirect>
        </BrowserRouter>
    );
}

export default App;
