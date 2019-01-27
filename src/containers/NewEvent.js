import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import EventForm from '../components/EventForm'

import * as _ from 'lodash'

class NewEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isMandatory: false
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    toggleMandatory = () => {
        this.setState({
            isMandatory: !this.state.isMandatory
        })
    }

    onSubmit = () => {
    }

    render() {
        console.log(this.state)
        return <EventForm event={this.state} handleChange={this.handleChange} toggleMandatory={this.toggleMandatory} />
    }
}

NewEvent.propTypes = {
    eventsActions: PropTypes.object,
    events: PropTypes.object
};
function mapStateToProps(state) {
    return {
        events: state.events,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        eventsActions: bindActionCreators(eventsActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewEvent);