const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hooks/health', (req, res) => {
  res.send('health');
});

app.post('/api/hooks/incomingTasks', (req, res) => {
  res.send('coucou');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
