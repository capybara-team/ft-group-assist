import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import 'typeface-roboto'

import { theme, apiUrl } from './settings'
import UpdateHandler from './components/UpdateHandler'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/views/Home';
import About from './components/views/About';
import MainHeader from './components/MainHeader';
import LoginForm from './components/LoginForm';
import CoursesManager from './components/views/CoursesManager';

import GroupAssist from './GroupAssistMock'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: null,
            loginOpen: false,
            loading: false
        }

        this.api = GroupAssist.init({ url: apiUrl })
    }

    toggleLogin = () => this.setState({ loginOpen: !this.state.loginOpen })

    login = auth => {
        this.setState({ loading: true })
        this.api
            .auth(auth)
            .then(auth => this.setState({ loading: false, loginOpen: false, auth }))
    }

    logout = () => {
        this.setState({ loading: true })
        this.api
            .logout()
            .then(() => this.setState({ loading: false, auth: null }))
    }

    render() {
        const { auth, loading, loginOpen } = this.state
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <UpdateHandler appServiceWorker={this.props.appServiceWorker}>
                        <MainHeader auth={auth} loading={loading} onLogin={this.toggleLogin} onLogout={this.logout} />
                        {!auth && <LoginForm loading={loading} open={loginOpen} onClose={this.toggleLogin} onSubmit={this.login} />}

                        {auth ?
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/groups" />} />
                                <Route path="/groups" component={CoursesManager} />
                                <Route path="/about" component={About} />
                            </Switch> :
                            <Switch>
                                <Route exact path="/" render={() => <Home onLogin={this.toggleLogin} />} />
                                <Route render={() =>
                                    <Home onLogin={this.toggleLogin}>Você precisa estar logado para acessar esta função</Home>
                                } />
                            </Switch>
                        }
                    </UpdateHandler>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
