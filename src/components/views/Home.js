import React, { Component, Fragment } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import LoginForm from '../LoginForm';

class Home extends Component {
    render() {
        return (
            <main>
                <Typography gutterBottom>
                    {this.props.children || "Realize login para usar o sistema"}
                </Typography>
                <Button variant="contained" color="secondary" onClick={this.props.onLogin} >Login</Button>
            </main>
        );
    }
}

export default Home;