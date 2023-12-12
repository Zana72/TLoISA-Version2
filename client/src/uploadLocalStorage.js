export default function uploadLocalStorage() {

    const serverAddress = "https://evaluation-tloisa-default-rtdb.europe-west1.firebasedatabase.app/";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "activeActivity": localStorage.getItem("activeActivity"),
        "activities": localStorage.getItem("activities"),
        "activityTargetPairs": localStorage.getItem("activityTargetPairs"),
        "behaviourChains": localStorage.getItem("behaviourChains"),
        "canvas": localStorage.getItem("canvas"),
        "goal": localStorage.getItem("goal"),
        "ideas": localStorage.getItem("ideas"),
        "metric": localStorage.getItem("metric"),
        "synthesis": localStorage.getItem("synthesis"),
        "targetGroup": localStorage.getItem("targetGroup"),
        "timestamp": new Date()
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverAddress + "main.json", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}