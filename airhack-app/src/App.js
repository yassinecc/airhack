import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import { getTasks } from './ApiService';

const DrawerItem = ({ task }) => (task ? <div>{task.address}</div> : null);

const myId = 1;

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
      {props.children}
    </GoogleMap>
  ))
);

class SimpleMap extends Component {
  state = { tasks: [], currentTaskId: null };
  static defaultProps = {
    center: {
      lat: 48.86,
      lng: 2.347639,
    },
    zoom: 13,
  };
  async componentDidMount() {
    const tasks = await getTasks();
    this.setState({ tasks: tasks });
  }

  getMyTasks = () => {
    return this.state.tasks.filter(task => task.assignee_id === myId);
  };

  render() {
    const myTasks = this.getMyTasks();
    return (
      <div>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeLMccTUfAVn3AisQ-KdFqex7rbEcnzC4&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          zoom={this.props.zoom}
          center={this.props.center}
        >
          <Polyline
            geodesic
            path={myTasks}
            options={{
              path: myTasks,
              strokeColor: 'teal',
              strokeOpacity: 0.75,
              strokeWeight: 2,
            }}
          />
          {myTasks.map(task => (
            <Marker
              icon={{ url: '/assets/pin.svg' }}
              key={task.id}
              position={task}
              onClick={() => this.setState({ currentTaskId: task.id })}
            />
          ))}
        </MyMapComponent>
        <Drawer
          width="30vw"
          showMask={false}
          closable={false}
          placement="right"
          visible={this.state.currentTaskId !== null}
          onClose={() => {
            this.setState({ currentTaskId: null });
          }}
        >
          <div>
            <DrawerItem task={myTasks.find(task => task.id === this.state.currentTaskId)} />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default SimpleMap;
