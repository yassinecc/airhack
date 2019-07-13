import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getTasks } from './ApiService';

const Marker = ({ fullAddress }) => (
  <button
    style={{ backgroundColor: 'transparent', borderWidth: 0 }}
    onClick={() => console.log('clic', fullAddress)}
  >
    <ion-icon size="large" name="pin" />
  </button>
);

const myId = 1;

class SimpleMap extends Component {
  state = { tasks: [] };
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

  render() {
    const myTasks = this.state.tasks.filter(task => task.assignee_id === myId);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBeLMccTUfAVn3AisQ-KdFqex7rbEcnzC4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {myTasks.map(task => {
            return (
              <Marker fullAddress={task.address} key={task.id} lat={task.lat} lng={task.lng} />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
