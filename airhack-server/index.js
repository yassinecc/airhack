const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { getDistance } = require('geolib');
const googleMapsClient = require('@google/maps').createClient({
  Promise: Promise,
  key: 'AIzaSyBeLMccTUfAVn3AisQ-KdFqex7rbEcnzC4',
});
const port = 5000;
const EARTH_RADIUS = 6378;

const tasks = [
  { dueTime: '16:30', lat: 48.85554319120794, lng: 2.3613359633447204, assignee_id: 1, id: 6480 },
  { dueTime: '13:15', lat: 48.85313729018271, lng: 2.32256080014798, assignee_id: 1, id: 9297 },
  { dueTime: '21:45', lat: 48.838453425693785, lng: 2.372673134911582, assignee_id: 2, id: 1889 },
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hooks/health', (req, res) => {
  res.send('health');
});

app.get('/api/tasks', async (req, res) => {
  try {
    const newTasks = await Promise.all(
      tasks.map(async task => {
        const address = await getAddressFromTask(task);
        return { ...task, address };
      })
    );
    res.json(newTasks);
  } catch (error) {
    console.log('error', error);
  }
});

app.post('/api/hooks/incomingTasks', (req, res) => {
  const newBody = { ...req.body, tasks: assignTaskers(req.body.tasks) };
  console.log(
    getDistance(
      { latitude: 48.882149, longitude: 2.305142 },
      { latitude: 48.856815, longitude: 2.390498 }
    )
  );
  return res.send(newBody);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const assignTaskers = tasks => tasks.map(el => ({ ...el, assignee_id: 1 }));

const getAddressFromTask = async task =>
  googleMapsClient
    .reverseGeocode({
      latlng: {
        lat: task.lat,
        lng: task.lng,
      },
    })
    .asPromise()
    .then(response => response.json.results[0].formatted_address);
