import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import { siteUrl } from '../settings';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }

    onSubmit = event => {
        event.preventDefault()
        this.props.onSubmit && this.props.onSubmit(this.state)
    }

    render() {
        const { onClose, onSubmit, onErrorClose, error, loading, ...dialogProps } = this.props
        return (
            <Dialog aria-labelledby="login-title" onClose={onClose} {...dialogProps}>
                <form onSubmit={this.onSubmit}>
                    <DialogTitle id="login-title">Fazer Login</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            fullWidth
                            required
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="dense"
                            label="Email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            required
                            type="password"
                            name="senha"
                            autoComplete="password"
                            margin="dense"
                            label="Senha"
                            value={this.state.pass}
                            onChange={e => this.setState({ pass: e.target.value })}
                            disabled={loading}
                        />
                        <DialogActions>
                            <Button
                                variant="raised"
                                color="secondary"
                                onClick={onClose}
                                disabled={loading}
                            >Cancelar</Button>
                            <Button
                                variant="raised"
                                color="primary"
                                component="button"
                                type="submit"
                                disabled={loading}
                            >Login</Button>
                        </DialogActions>
                        <DialogActions>
                            <DialogContentText>Ainda não é registrado?</DialogContentText>
                            <Button component="a" href={siteUrl} title="Inscrever-se no FullTeaching" target="_blank" >Inscrever-se</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        );
    }
}

export default LoginForm;