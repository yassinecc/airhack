import axios from 'axios';
export const getTasks = async () =>
  axios.get('http://localhost:5000/api/tasks').then(({ data }) => data);
