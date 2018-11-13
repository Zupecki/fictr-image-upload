//Your view code here
import Event from './helpers';
//import '../html/index.html';

export default class uploadImageView {
    constructor(model) {
        this.model = model;
        this.objName = 'View';

        //event objects
        this.loadFileEvent = new Event(this, 'Image Loaded');
        this.uploadFileEvent = new Event(this, 'Upload Image');
        this.cancelFileEvent = new Event(this, 'Cancel');
        this.descriptionTypingEvent = new Event(this, 'Typing');
        
        //element references
        this.view = document.querySelector('.view');
        this.state = document.querySelector('.state-container');
        this.controls = document.querySelector('.controls-container');

        this.init();
    }

    init() {
        this.setupHandlers();
        this.link();
        this.render();
    }

    setupHandlers() {
        this.loadFileHandler = this.loadFile.bind(this);
        this.uploadFileHandler = this.uploadFile.bind(this);
        this.descriptionClipHandler = this.descriptionClip.bind(this);
        this.cancelFileHandler = this.cancelFile.bind(this);

        //for model
        this.renderViewHandler = this.render.bind(this);
    }

    link() {
        this.model.loadFileEvent.attach(this.renderViewHandler);
        this.model.uploadFileEvent.attach(this.renderViewHandler);
        this.model.uploadProgressEvent.attach(this.renderViewHandler);
        this.model.cancelFileEvent.attach(this.renderViewHandler);
    }

    loadFile() {
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        //ensure there's a file, check type
        if(!this.uploadFileElement.files.length > 0 || 
            !validImageTypes.includes(this.uploadFileElement.files[0]["type"])) {
            return
        }

        //get file
        const file = this.uploadFileElement.files[0];

        //send file to Controller through Event
        this.loadFileEvent.notify(file);
    }

    cancelFile() {
        console.log('cancel file clicked');
        this.cancelFileEvent.notify();
    }

    uploadFile() {
        this.uploadFileEvent.notify(this.imageDescriptionElement.value);
    }

    //update view
    render(event = null) {
        console.log(`EVENT: ${event}`);
        //if model has no images, ergo zero state
        if(!this.model.loadedImage) {
            this.messageParts = ['don\'t hesitate', 'and pick a curated selfie'];

            if(this.model.imagesUploaded > 0)
                this.messageParts = ['upload complete', 'and pick another selfie'];
            if(event == 'cancelled')
                this.messageParts = ['upload cancelled', 'and pick a better selfie'];

            this.state.innerHTML = this.getZeroMarkup(this.messageParts);
            this.controls.innerHTML = "";

            //input and listener
            this.uploadFileElement = this.view.querySelector('#image-uploader');
            this.uploadFileElement.addEventListener('change', this.loadFileHandler);
        }

        //check if image is loaded into local memory
        if(this.model.loadedImage && this.model.uploadProgress == 0) {
            this.state.innerHTML = this.getReadyMarkup();

            //image preview
            this.imagePreviewElement = this.view.querySelector('#image-preview');
            this.createImagePreview(this.model.loadedImage.file);

            //description
            this.imageDescriptionElement = this.view.querySelector('#image-description');
            this.imageDescriptionElement.addEventListener('keydown', this.descriptionClipHandler);

            //render and get buttons
            this.controls.innerHTML = this.getControlsMarkup();
            this.uploadButton = this.view.querySelector('#upload-button');
            this.uploadButton.addEventListener('click', this.uploadFileHandler);
            this.cancelButton = this.view.querySelector('#cancel-button');
            this.cancelButton.addEventListener('click', this.cancelFileHandler);

            //progress
            this.progElement = this.view.querySelector('#upload-progress');
        }

        //if image uploading, update progress bar
        if(this.model.loadedImage && this.model.uploadProgress > 0) {
            this.uploadProgress = this.model.uploadProgress;
            this.progElement.value = this.uploadProgress;
        }
    }

    getZeroMarkup(message) {
        return `
            <div id="zero">
                <p class="brand-text">${message[0]}</p>
                <input type="file" accept="image/*" name="image-upload" id="image-uploader" class="hidden">
                <label for="image-uploader"><p class="brand-text bold" id="click-me">click me</p></label>
                <p class="brand-text">${message[1]}</p>
            </div>
        `
    }

    getDragMarkup() {
        return `
            <div id="drag" class="state-box">
                <p class="brand-text">drop your image, dare you</p>
            </div>
        `
    }

    getReadyMarkup() {
        return `
            <div id="ready" class="state-box">
                <p class="brand-text" id="image-name">${this.model.loadedImage.iName}</p>
                <div id="image-constrainer">
                    <img id="image-preview" title="${this.model.loadedImage.iName}" src="">
                </div>
                <textarea id="image-description" placeholder="insert description here (optional)"rows="3" cols="30"></textarea>
            </div>
        `
    }

    getControlsMarkup() {
        return `
            <button id="upload-button">Upload</button>
            <button id="cancel-button">Cancel</button>
            <div id="progress-wrapper">
                <p class="upload-error hidden"></p>
                <progress class="" id="upload-progress" name="upload-progress" max="100" value=""></progress>
            </div>
        `
    }

    getUploadCompleteMarkup() {
        return `
            <p>upload complete</p>
        `
    }

    createImagePreview(image) {
        const reader = new FileReader();

        reader.onload = (e) => {
            this.imagePreviewElement.src = e.target.result;
        };

        reader.readAsDataURL(image);
    }

    descriptionClip() {
        const description = this.imageDescriptionElement;
        const charLimit = 140;
        console.log(description.value.length);
        if(description.value.length >= charLimit)
            description.value = description.value.substring(0, charLimit);
    }
};
