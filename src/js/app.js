// code here
import '../html/index.html';
import '../css/app.css';
import { uploadImage, updateUploadProgress } from './helpers';
import View from './view';
import Model from './model';
import Controller from './controller';

const UPLOAD_URL = '/upload'; //self/upload endpoint

var model = new Model();
var view = new View(model);
var controller = new Controller(model, view);
/*
window.onload = () => {

};
*/
/*
window.onClickUpload = () => {
    const file = document.getElementById('image-uploader').files[0];

    if(file) {
        // ADDED
        const xhr = formRequest(UPLOAD_URL, "POST");
        const progress = document.getElementById('upload-progress');
        const waiting = document.getElementById('waiting-state');
        const uploading = document.getElementById('upload-state');

        //call uploadImage and hand in function callback for onprogress
        uploadImage(xhr, file, (e) => {
            updateUploadProgress(e, progress);
        });

        // ADDED; will clean up
        waiting.classList.add('hidden');
        uploading.classList.remove('hidden');
        uploading.childNodes[1].childNodes[0].innerHTML = file.name;
    }
};

window.onFileAdded = () => {

};
*/
