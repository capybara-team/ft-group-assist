import React, { Component } from 'react';
import { withStyles, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core'
import {
    ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'


const styles = {
    root: {
        // paddingTop: 64
        zIndex: 1201
    },
    flex: {
        flex: 1,
    },
    menuButtonWrapper: {
        marginLeft: -12,
        marginRight: 20,
    },
}

class Header extends Component {

    goBack = () => window.history.back()

    render() {
        const { children, classes, title, backButton = false, backButtonIcon, rightAction, appBarProps, ...props } = this.props

        return (
            <AppBar className={classes.root} position="sticky" {...appBarProps} {...props}>
                <Toolbar>
                    {backButton &&
                        <div className={classes.menuButtonWrapper}>
                            <IconButton color="inherit" aria-label="back" onClick={this.goBack}>
                                {backButtonIcon || <ArrowBackIcon />}
                            </IconButton>
                        </div>
                    }

                    {title &&
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {title}
                        </Typography>
                    }

                    {rightAction && <div>{rightAction}</div>}
                </Toolbar>
                {children}
            </AppBar>
        )
    }

}

export default withStyles(styles)(Header);
