import React, { Component, Fragment } from 'react';
import { Drawer, Toolbar, List, ListItem, ListItemText, Avatar, Divider } from '@material-ui/core';
import { Link, Route } from 'react-router-dom'
import GroupAssist from '../../GroupAssistMock';
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
        this.api
            .getCourses()
            .then(courses => this.setState({ loading: false, courses }))
    }

    render() {
        const { match = { url: '' } } = this.props
        return (
            <main>
                <Drawer
                    variant="permanent"
                >
                    <Toolbar />
                    <List component="nav" style={{ width: drawerWidth }} >
                        {this.state.loading && <Loader spacing={30} />}
                        {this.state.courses.map(({ id, name, description }) =>
                            <Fragment key={id}>
                                <ListItem button component={Link} to={`${match.url}/${id}`} >
                                    <Avatar children={name.charAt(0)} />
                                    <ListItemText primary={name} secondary={description} />
                                </ListItem>
                                <Divider inset />
                            </Fragment>
                        )}
                    </List>
                </Drawer>
                <div style={{ marginLeft: drawerWidth }} >
                    <Route path={match.url + '/:id'} component={GroupsManagers} />
                </div>
            </main>
        );
    }
}

export default CoursesManager;