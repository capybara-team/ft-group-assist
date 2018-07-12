import React, { Component, Fragment } from 'react';
import { Drawer, Toolbar, List, ListItem, ListItemText, Avatar, Divider } from '@material-ui/core';
import { Link, Switch, Route } from 'react-router-dom'

const drawerWidth = 320
const list = [
    { id: 1, name: "Física", description: "Trabalho de Física", },
    { id: 2, name: "Matemática", description: "Trabalho de Matemática" },
    { id: 3, name: "Português", description: "Trabalho de Português" },
    { id: 4, name: "Química", description: "Trabalho de Química" },
    { id: 5, name: "Artes", description: "Trabalho de Artes" },
]

class GroupManager extends Component {
    render() {
        const { match = { url: '' } } = this.props
        return (
            <main>
                <Drawer
                    variant="permanent"
                >
                    <Toolbar />
                    <List component="nav" style={{ width: drawerWidth }} >
                        {list.map(({ id, name, description }) =>
                            <Fragment key={id}>
                                <ListItem button component={Link} to={`/groups/${id}`} >
                                    <Avatar children={name.charAt(0)} />
                                    <ListItemText primary={name} secondary={description} />
                                </ListItem>
                                <Divider inset />
                            </Fragment>
                        )}
                    </List>
                </Drawer>
                <div style={{ marginLeft: drawerWidth }} >
                    <Switch>
                        <Route path={match.url + '/:id'} render={({ match }) =>
                            <div>
                                Grupo: {match.params.id}
                            </div>
                        } />

                    </Switch>
                </div>
            </main>
        );
    }
}

export default GroupManager;