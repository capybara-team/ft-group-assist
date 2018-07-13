import React, { Component, Fragment } from 'react';
import Header from './Header';
import { Button, IconButton, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'

class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuAnchor: null,
        }
    }

    openMenu = e => this.setState({ menuAnchor: e.currentTarget })

    closeMenu = e => this.setState({ menuAnchor: null })

    render() {
        const { auth, onLogout, onLogin, loading } = this.props
        const { menuAnchor } = this.state
        const open = Boolean(menuAnchor)
        return (
            <div>
                <Header
                    title="Group Assist FullTeaching"
                    rightAction={
                        auth ?
                            loading ? <CircularProgress color="inherit" /> :
                                <Fragment>
                                    <IconButton
                                        aria-owns={open ? 'user-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.openMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>

                                    <Menu
                                        id="user-menu"
                                        anchorEl={menuAnchor}
                                        open={open}
                                        onClose={this.closeMenu}
                                    >
                                        <MenuItem onClick={() => this.closeMenu() || (onLogout && onLogout())}>Logout</MenuItem>
                                    </Menu>
                                </Fragment> :
                            <Button color="inherit" onClick={onLogin} >Login</Button>
                    }
                />
            </div>
        );
    }
}

export default MainHeader;