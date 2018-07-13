import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';

class Home extends Component {
    render() {
        return (
            <main style={{ textAlign: 'center', padding: '24vh 0' }} >
                <Typography  variant="display2" gutterBottom >
                    {this.props.children || "Bem vindo! Faça login para continuar:"}
                </Typography>
                <Button variant="contained" color="secondary" size="large" onClick={this.props.onLogin} >Fazer Login</Button>
            </main>
        );
    }
}

export default Home;