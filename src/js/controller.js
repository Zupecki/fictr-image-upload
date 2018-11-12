export default class imageUploaderController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.objName = 'Controller';

        this.init();
    }

    init() {
        this.setupHandlers();
        this.link();
    }

    setupHandlers() {
        //for view
        this.loadFileHandler = this.loadFile.bind(this);
        this.setDescriptionHandler = this.setDescription.bind(this);
        this.uploadFileHandler = this.uploadFile.bind(this);
        this.cancelFileHandler = this.cancelFile.bind(this);
    }

    link() {
        this.view.loadFileEvent.attach(this.loadFileHandler);
        this.view.uploadFileEvent.attach(this.setDescriptionHandler);
        this.view.uploadFileEvent.attach(this.uploadFileHandler);
        this.view.cancelFileEvent.attach(this.cancelFileHandler);
    }

    cancelFile() {
        this.model.cancelFile();
    }

    loadFile(file) {
        this.model.loadFile(file);
    }

    setDescription(description) {
        this.model.loadedImage.setDescription(description);
    }

    uploadFile() {
        this.model.uploadFile();
    }
}
