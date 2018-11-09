// code here
import '../html/index.html';
import '../css/app.css';
import { postRequest } from './helpers';

postRequest('/upload', { message: 'MESSAGE'});
