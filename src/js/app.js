// code here
import '../html/index.html';
import '../css/app.css';
import { postRequest, uploadImage } from './helpers';

const UPLOAD_URL = '/upload'; //self/upload endpoint

//postRequest('/upload', { message: 'MESSAGE'});

window.onClickUpload = () => {
    const file = document.getElementById('image-uploader').files[0];
    var progress = document.getElementById('upload-progress');

    //call uploadImage and hand in function callback for onprogress
    uploadImage(UPLOAD_URL, file, (e) => {
        progress.value = (e.loaded/e.total)*100;

        console.log(progress);
        console.log(`${e.loaded} / ${e.total}`);
    });
};
