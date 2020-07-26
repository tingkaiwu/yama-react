import React from 'react';
import { Login } from './views/SignIn/Login';
import Admin from './layouts/Admin';
import { Switch, Route, Redirect } from 'react-router'

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/admin" /> : <Login handleLoginSucceed={this.props.handleLoginSucceed} />;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Admin /> : <Redirect to="/login" />;
    }
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getLogin} />
                    <Route path="/login" render={this.getLogin} />
                    <Route path="/admin" render={this.getHome} />
                    <Route render={this.getLogin} />
                </Switch>
            </div>
        );
    }
}
