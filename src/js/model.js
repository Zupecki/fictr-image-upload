import Event, { uploadFile, updateUploadProgress } from './helpers';
//import { uploadFile } from './helpers'

export default class ImageUploaderModel {
    constructor() {
        //this.galleryItems = [];
        //this.loadedImages = [];
        this.loadFileEvent = new Event(this, 'Image Loaded');
        this.uploadFileEvent = new Event(this, 'Upload File');
        this.uploadProgressEvent = new Event(this, 'Upload Progress');
        this.cancelFileEvent = new Event(this, 'Cancel File');
        this.uploadProgress = 0;
        this.imagesUploaded = 0;
        this.objName = 'Model';
    }

    loadFile(file) {
        this.loadedImage = new Image(file);
        // for multiple image expansion
        /*
        this.uploadList.push(new Image(file));
        for(var i = 0; i < this.uploadList.length; i++) {
            console.log(`Image #${i+1}: ${this.uploadList[i].getName()}`);
        }
        */
        
        // trigger View to reRender
        this.loadFileEvent.notify();
    }

    cancelFile() {
        this.reinit();
    }

    getUploadProgress() {
        return this.uploadProgress;
    }

    setUploadProgress(e) {
        this.uploadProgress = e.loaded/e.total*100;
        console.log(`MODEL UPLOAD PROGRESS: ${this.getUploadProgress()}`);

        //tell view to render for progress
        this.uploadProgressEvent.notify();
    }

    getImages() {
        return this.imageList;
    }

    uploadFile() {
        //send up to server
        uploadFile(this.loadedImage.getFile(), this.loadedImage.getDescription(), (e) => {
            //set percent upload completed
            if(e.lengthComputable) {
                this.setUploadProgress(e);
            }
        },
        () => {
            //reinit model when upload complete
            this.reinit();
        },
        () => {
            return
        });
    }

    reinit() {
        setTimeout(1000);
        this.imagesUploaded += 1;
        this.uploadProgress = 0;
        delete this.loadedImage;
        this.uploadProgressEvent.notify();
    }

};

export class Image {
    constructor(file) {
        this.file = file;
        this.iName = file.name;
        this.description = '';
    }

    getName() {
        return this.iName;
    }

    getDescription() {
        return this.description;
    }

    getFile() {
        return this.file;
    }

    setDescription(description) {
        this.description = description;
    }
}
