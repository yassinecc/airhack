import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import { getTasks } from './ApiService';

const Marker = ({ fullAddress, onPress }) => (
  <button style={{ backgroundColor: 'transparent', borderWidth: 0 }} onClick={onPress}>
    <ion-icon size="large" name="pin" />
  </button>
);

const DrawerItem = ({ task }) => (task ? <div>{task.address}</div> : null);

const myId = 1;

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

  getMyTasks = tasks => {
    return this.state.tasks.filter(task => task.assignee_id === myId);
  };

  renderPolylines = (map, maps) => {
    let geodesicPolyline = new maps.Polyline({
      path: this.getMyTasks(this.state.tasks),
    });
    geodesicPolyline.setMap(map);
  };

  render() {
    if (this.map && this.maps) {
      this.renderPolylines(this.map, this.maps);
    }
    const myTasks = this.state.tasks.filter(task => task.assignee_id === myId);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBeLMccTUfAVn3AisQ-KdFqex7rbEcnzC4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => {
            this.maps = maps;
            this.map = map;
          }}
        >
          {myTasks.map(task => {
            return (
              <Marker
                onPress={() => {
                  this.setState({ currentTaskId: task.id });
                }}
                fullAddress={task.address}
                key={task.id}
                lat={task.lat}
                lng={task.lng}
              />
            );
          })}
        </GoogleMapReact>
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
