import axios from 'axios';

const baseURL = 'https://todo-manager-api1.herokuapp.com/api/';
let token = null;
const user = JSON.parse(localStorage.getItem('todoUser'));
if (user) {
  token = user.token;
}

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token ? token : ''}`,
  },
});