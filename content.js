chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message == "ip-address"){
        // get Ip adress from api
        $.getJSON('https://ipapi.co/json/', function(data) {
            sendResponse(data.ip);
        });
    }
});

function sendToBackground(type, data) {
    chrome.runtime.sendMessage({
        type,
        target: 'background',
        data
    });
}
