import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../actions/eventsActions';
import PropTypes from 'prop-types';
import domtoimage from 'dom-to-image';
import * as _ from 'lodash'
import { Button } from 'semantic-ui-react'
import { Dropdown, Menu } from 'semantic-ui-react'
import ScreenSaverCanvas from '../../components/ScreenSaver/ScreenSaverCanvas'
import moment from 'moment'
import { background, eventFilter, verticalPlacement, horizontalPlacement } from './ScreenSaverOptions'

class GenerateScreen extends Component {
    constructor(props) {
        super(props)
        this.windowHeight = window.outerHeight
        this.windowWidth = window.outerWidth
        this.state = {
            backgroundImage: background[0].value,
            width: this.windowWidth,
            height: this.windowHeight,
            events: this.props.events.eventsList,
            eventFilter: "all",
            previewScale: .5,
        }
    }

    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    filterEvents = () => {
        let { events } = this.state

        if (this.state.eventFilter === "all") {
            return _.filter(events, (e => {
                return (moment().isSame(moment(e.startTime), "week"))
            }))
        } else if (this.state.eventFilter === "mandatory") {
            return _.filter(events, (e => {
                return (moment().isSame(moment(e.startTime), "week") && e.isMandatory)
            }))
        }
    }

    generateScreenSaver = () => {
        this.forceUpdate()
        let temp_node = this.node.cloneNode(true)
        temp_node.childNodes[0].style.transformOrigin = 'top left'
        temp_node.childNodes[0].style.transform = 'scale(1.5) scale(1.5)'
        document.body.appendChild(temp_node);
        domtoimage.toJpeg(temp_node, { quality: 100 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                return link.click();
            }).then(() => {
                document.body.removeChild(temp_node);
            })
    }

    handleOptionChange = (e, v) => {
        this.setState({
            [v.id]: v.value
        })
    }

    render() {
        return (
            <div className="content-container" >
                <div className="screen-saver-container">
                    <div ref={node => this.node = node}>
                        <ScreenSaverCanvas params={this.state} events={this.filterEvents()} />
                    </div>
                    <div className="screen-saver-options">
                        <Menu secondary>
                            <Dropdown id="backgroundImage" placeholder='Background Image' options={background} onChange={this.handleOptionChange} selection />
                        </Menu>
                        <Menu secondary>
                            <Dropdown id="eventFilter" placeholder='Event Filter' options={eventFilter} onChange={this.handleOptionChange} selection />
                        </Menu>
                        <Menu secondary>
                            <Dropdown id="verticalPlacement" placeholder='Vertical Placement' options={verticalPlacement} onChange={this.handleOptionChange} selection />
                        </Menu>
                        <Menu secondary>
                            <Dropdown id="horizontalPlacement" placeholder='Horizontal Placement' options={horizontalPlacement} onChange={this.handleOptionChange} selection />
                        </Menu>
                        <Button onClick={() => { this.generateScreenSaver() }}>Generate Screen Saver</Button>
                    </div>
                </div>
            </div>
        )
    }
}

GenerateScreen.propTypes = {
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
)(GenerateScreen);