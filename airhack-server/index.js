const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getDistance } = require('geolib');
const port = 5000;
const EARTH_RADIUS = 6378;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hooks/health', (req, res) => {
  res.send('health');
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
