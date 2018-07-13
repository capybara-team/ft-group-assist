import React, { Component } from 'react';
import { Close as CloseIcon } from '@material-ui/icons'
import Header from './Header';
import GroupAssist from '../GroupAssistMock';
import Loader from './Loader';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Star } from '@material-ui/icons'

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            groups: []
        }
        this.api = GroupAssist.init()
    }

    componentDidMount() {
        this.getGroups()
    }

    componentWillReceiveProps({ managerId }) {
        managerId !== this.props.managerId &&
            this.getGroups()
    }

    getGroups() {
        this.setState({ loading: true, groups: [] })
        this.api
            .getManagerGroups(this.props.managerId)
            .then(groups => this.setState({ loading: false, groups }))
    }

    render() {
        return (
            <div>
                <Header title="Informações do grupo"
                    backButton
                    backButtonIcon={<CloseIcon />}
                />
                {this.state.loading && <Loader spacing={30} />}

                <List>
                    {this.state.groups.map(({ id, name, description, joined }) => (
                        <ListItem key={id} button >
                            {joined &&
                                <ListItemIcon>
                                    <Star />
                                </ListItemIcon>
                            }
                            <ListItemText inset primary={name} secondary={description} />
                        </ListItem>
                    ))}
                </List>

            </div>
        );
    }
}

export default GroupsList;