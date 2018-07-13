import React, { Component, Fragment } from 'react';
import { Drawer, Toolbar, List, ListItem, ListItemText, Avatar, Divider, Typography } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom'
import GroupAssist from '../../GroupAssist';
import Loader from '../Loader';
import GroupsManagers from '../GroupsManagers';

const drawerWidth = 320

class CoursesManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            courses: []
        }
        this.api = GroupAssist.init()
    }

    componentDidMount() {
        this.getCourses()
    }

    getCourses = () => {
        this.setState({ loading: true })
        this.api
            .getCourses()
            .then(courses => this.setState({ courses }))
            .catch(console.error)
            .then(() => this.setState({ loading: false }))
    }

    render() {
        const { match = { url: '' } } = this.props
        return (
            <main>
                <Drawer
                    variant="permanent"
                >
                    <Toolbar />
                    {this.state.loading && <Loader spacing={30} />}
                    <List component="nav" style={{ width: drawerWidth }} >

                        {!this.state.loading && !this.state.courses.length &&
                            <ListItem button onClick={this.getCourses}>
                                <ListItemText primary="Nenhuma turma foi cadastrada" secondary="clique para recarregar" />
                            </ListItem>
                        }
                        {this.state.courses.map(({ id, title }) =>
                            <Fragment key={id}>
                                <ListItem button component={Link} to={`${match.url}/${id}`} >
                                    <Avatar children={title.charAt(0)} />
                                    <ListItemText primary={title} />
                                </ListItem>
                                <Divider inset />
                            </Fragment>
                        )}
                    </List>
                </Drawer>
                <div style={{ marginLeft: drawerWidth }} >
                    <Switch>
                        <Route path={match.url + '/:id'} component={GroupsManagers} />
                        <Route render={() => <Typography variant="display1" align="center" >Selecione um curso</Typography>} />
                    </Switch>
                </div>
            </main>
        );
    }
}

export default CoursesManager;