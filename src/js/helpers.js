export const consolePrint = x => console.log(x);
export const sumNums = (x,y) => x+y;
export const postRequest = (path, data = {}) => {
    const xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", path);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
};
