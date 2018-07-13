import React, { Component } from 'react';
import { MuiThemeProvider, Snackbar } from '@material-ui/core';
import 'typeface-roboto'

import { theme, apiUrl, tokenStorage } from './settings'
import UpdateHandler from './components/UpdateHandler'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/views/Home';
import About from './components/views/About';
import MainHeader from './components/MainHeader';
import LoginForm from './components/LoginForm';
import CoursesManager from './components/views/CoursesManager';

import GroupAssist from './GroupAssist'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: null,
            loginOpen: false,
            loading: false,
            loginError: null
        }

        this.api = GroupAssist.init({ url: apiUrl, token: this.token })
    }

    set token(token) {
        localStorage.setItem(tokenStorage, token)
    }

    get token() {
        return localStorage.getItem(tokenStorage)
    }

    componentDidMount() {
        if (this.token) {
            this.setState({ loading: true })
            this.api
                .getUser()
                .then(auth => this.setState({ loading: false, loginOpen: false, auth }))
        }
    }

    toggleLogin = () => this.setState({ loginOpen: !this.state.loginOpen })

    login = ({ email, pass: password }) => {
        this.setState({ loading: true })
        this.api
            .auth({ email, password })
            .then(({ user: auth, access_token }) => {
                this.setState({ loginOpen: false, auth })
                this.token = access_token
            })
            .catch(loginError => this.setState({ loginError }))
            .then(() => this.setState({ loading: false }))
    }

    logout = () => {
        this.setState({ auth: null })
        this.token = ''
        this.api.logout()
    }

    render() {
        const { auth, loading, loginOpen, loginError } = this.state
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <UpdateHandler appServiceWorker={this.props.appServiceWorker}>
                        <MainHeader auth={auth} loading={loading} onLogin={this.toggleLogin} onLogout={this.logout} />
                        {!auth &&
                            <LoginForm
                                loading={loading}
                                open={loginOpen}
                                onClose={this.toggleLogin}
                                onSubmit={this.login}
                                error={loginError}
                            />}

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

                        <Snackbar
                            message={loginError + ''}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={Boolean(loginError)}
                            autoHideDuration={6000}
                            onClose={() => this.setState({ loginError: null })}
                        />
                    </UpdateHandler>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;