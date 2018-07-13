import React, { Component, Fragment } from 'react';
import { Close as CloseIcon } from '@material-ui/icons'
import Header from './Header';
import GroupAssist from '../GroupAssist';
import Loader from './Loader';
import { List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, Button, Divider } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons'

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
            groups: []
        }
        this.api = GroupAssist.init()
    }

    updateLoading = (loading = false) => this.setState({ loading })

    componentDidMount() {
        this.updateLoading(true)
        this.api.getUser()
            .then(user => this.setState({ user, loading: false }))
            .then(this.getGroups)
    }

    componentWillReceiveProps({ managerId }) {
        if (managerId !== this.props.managerId) {
            this.getGroups()
        }
    }

    joinGroup = (group) => {
        this.leaveGroup()
            .then(() => this.updateLoading(true))
            .then(() => this.api.joinGroup(group))
            .then(() => this.updateGroup(group))
            .then(() => this.updateLoading())
    }

    updateGroup = (group) => {
        const { groups } = this.state
        let pos
        return this.api.getGroup(group)
            .then(group => {
                pos = groups.findIndex(({ id }) => id == group.id)
                console.log(pos)
                if (pos >= 0)
                    groups[pos] = group
                else
                    groups.push(group)
                this.setState({ groups })
            })

    }

    leaveGroup = () => {
        const group = this.getCurrentGroup()
        if (!group) return Promise.resolve(null)
        this.updateLoading(true)
        return this.api
            .leaveGroup(group.id)
            .then(() => this.updateGroup(group.id))
            .then(() => this.updateLoading())
    }

    getGroups = () => {
        if (!this.props.managerId) return;
        this.setState({ loading: true, groups: [] })
        this.api
            .getManagerGroups(this.props.managerId)
            .then(groups => Promise.all(groups.map(
                ({ id }) => this.api.getGroup(id)
            )))
            .then(groups => this.setState({ loading: false, groups }))
    }

    getCurrentGroup() {
        return this.state.user && this.state.groups.find(
            ({ members }) => members.find(
                ({ id }) => id == this.state.user.id
            )
        )
    }

    render() {
        const { loading } = this.state
        return (
            <div>
                <Header title="Informações do grupo"
                    backButton
                    backButtonIcon={<CloseIcon />}
                />
                <List>
                    {!loading && !this.state.groups.length &&
                        <ListItem button onClick={this.getGroups}>
                            <ListItemText primary="Nenhum grupo foi encontrado" secondary="clique para recarregar" />
                        </ListItem>
                    }
                    {this.state.groups.map(({ id, name, description, members, owner }) => {
                        const isMember = this.state.user && members.find(({ id }) => id == this.state.user.id)
                        return (
                            <Fragment>
                                <ListItem key={id}>
                                    <ListItemIcon>
                                        {isMember ?
                                            <Star /> :
                                            <StarBorder />
                                        }
                                    </ListItemIcon>
                                    <ListItemText inset primary={name} secondary={description} />
                                    <ListItemSecondaryAction>
                                        {isMember ?
                                            <Button disabled={loading} size="small" variant="raised" color="secondary" onClick={this.leaveGroup}>Sair</Button>
                                            :
                                            <Button disabled={loading} size="small" variant="raised" color="primary" onClick={() => this.joinGroup(id)}>Entrar</Button>
                                        }
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <List disablePadding>
                                    <ListItem >
                                        <ListItemText inset primary={owner.name} secondary="Dono" />
                                    </ListItem>
                                    {members.map(member =>
                                        <ListItem >
                                            <ListItemText inset primary={member.name} secondary="Membro" />
                                        </ListItem>
                                    )}
                                </List>
                                <Divider />
                            </Fragment>
                        )
                    })}
                </List>
                {loading && <Loader spacing={30} />}
            </div>
        );
    }
}

export default GroupsList;