import React, { Component } from 'react';
import GroupAssist from '../GroupAssistMock';
import Loader from './Loader';
import { Slide, List, ListItem, ListItemText, Dialog } from '@material-ui/core';
import { Link, Route } from 'react-router-dom'
import GroupsList from './GroupsList';


function ModalTransition(props) {
    return <Slide direction="up" {...props} />;
}

class GroupsManagers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            managers: []
        }
        this.api = GroupAssist.init()
    }

    componentDidMount() {
        this.getManager()
    }

    componentWillReceiveProps(props) {
        props.match.params.id !== this.props.match.params.id &&
            this.getManager()
    }

    getManager() {
        this.setState({ loading: true, managers: [] })
        this.api
            .getCourseManagers(this.props.match.params.id)
            .then(managers => this.setState({ loading: false, managers }))
    }

    render() {
        const { match = { url: '' } } = this.props

        return (
            <div>
                {this.state.loading && <Loader spacing={30} />}
                <List component="nav">
                    {this.state.managers.map(({ id, name, description }) => (
                        <ListItem key={id} button component={Link} to={`${match.url}/manager/${id}`} >
                            <ListItemText primary={name} secondary={description} />
                        </ListItem>
                    ))}
                </List>
                <Route path={match.url + '/:managerId'} children={({ match }) => (
                    <Dialog
                        fullScreen
                        open={Boolean(match)}
                        TransitionComponent={ModalTransition}>
                        <GroupsList />
                    </Dialog>
                )} />
            </div>
        );
    }
}

export default GroupsManagers;