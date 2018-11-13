export const uploadFile = (file, description, onprogress, onload, onerror) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    const xhr = new XMLHttpRequest();

    // if function passed in, call onprogress callback
    if (onprogress) {
        xhr.upload.addEventListener('progress', onprogress);
        //xhr.onprogress = onprogress;
    }

    if(onload) {
        xhr.onload = onload;
    }

    if(onerror) {
        xhr.onerror = onerror;
    }

    xhr.open('POST', '/upload', true);
    xhr.send(formData);
}

export default class Event {
    constructor(sender, name) {
        this._sender = sender;
        this._listeners = [];
        this.eventName = name;
    }
    
    attach (listener) {
        this._listeners.push(listener);
    }

    notify (args) {
        for(var i = 0; i < this._listeners.length; i++) {
            //console.log(`${this.eventName} triggered ${args}`);
            this._listeners[i](args);
        }
    }
}
