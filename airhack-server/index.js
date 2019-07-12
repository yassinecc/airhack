const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hooks/health', (req, res) => {
  res.send('health');
});

app.post('/api/hooks/incomingTasks', (req, res) => {
  res.send('coucou');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
