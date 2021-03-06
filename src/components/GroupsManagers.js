import React, { Component } from 'react';
import GroupAssist from '../GroupAssist';
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

    getManager = () => {
        this.setState({ loading: true, managers: [] })
        this.api
            .getCourseManagers(this.props.match.params.id)
            .then(managers => this.setState({ loading: false, managers: Object.values(managers) }))
    }

    render() {
        const { match = { url: '' } } = this.props

        return (
            <div>
                {this.state.loading && <Loader spacing={30} />}
                <List component="nav">
                    {!this.state.loading && !this.state.managers.length &&
                        <ListItem button onClick={this.getManager}>
                            <ListItemText primary="Nenhum trabalho foi encontrado" secondary="clique para recarregar" />
                        </ListItem>
                    }
                    {this.state.managers.map(({ id, name, description }) => (
                        <ListItem key={id} button component={Link} to={`${match.url}/manager/${id}`} >
                            <ListItemText primary={name} secondary={description} />
                        </ListItem>
                    ))}
                </List>
                <Route path={match.url + '/manager/:managerId'} children={({ match }) => (
                    <Dialog
                        fullScreen
                        open={Boolean(match)}
                        TransitionComponent={ModalTransition}>
                        <GroupsList
                            managerId={match && match.params.managerId}
                        />
                    </Dialog>
                )} />
            </div>
        );
    }
}

export default GroupsManagers;