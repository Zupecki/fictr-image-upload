export const consolePrint = x => console.log(x);
export const sumNums = (x,y) => x+y;
export const postRequest = (path, data = {}) => {
    const xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", path);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
};

export const uploadImage = (path, file, onprogress) => {
    const formData = new FormData();
    formData.append('file', file);
    const xhr = new XMLHttpRequest();

    // if function passed in, call onprogress callback
    if (onprogress) {
        xhr.onprogress = onprogress;
    }

    // Add any event handlers here...
    xhr.open('POST', path, true);
    xhr.send(formData);
}

export const updateUploadState = (element) => {
    //code here
}
