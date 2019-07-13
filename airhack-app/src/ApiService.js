import axios from 'axios';
export const getTasks = async () =>
  axios.get('https://904f2b48.ngrok.io/api/tasks').then(({ data }) => data);
