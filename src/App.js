import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import 'typeface-roboto'

import { theme } from './settings'
import UpdateHandler from './components/UpdateHandler'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/views/Home';
import About from './components/views/About';
import MainHeader from './components/MainHeader';
import LoginForm from './components/LoginForm';
import GroupManager from './components/views/GroupManager';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true,
            loginOpen: false,
            loading: false
        }
    }

    toggleLogin = () => this.setState({ loginOpen: !this.state.loginOpen })

    login = auth => {
        this.setState({ loading: true })
        setTimeout(() => this.setState({ loading: false, loginOpen: false, auth }), 2000)
    }

    logout = () => this.setState({ auth: null })

    render() {
        const { auth, loading, loginOpen } = this.state
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <UpdateHandler appServiceWorker={this.props.appServiceWorker}>
                        <MainHeader auth={auth} onLogin={this.toggleLogin} onLogout={this.logout} />
                        {!auth && <LoginForm loading={loading} open={loginOpen} onClose={this.toggleLogin} onSubmit={this.login} />}
                        
                        {auth ?
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/groups" />} />
                                <Route path="/groups" component={GroupManager} />
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
