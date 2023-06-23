let activeTabId, lastUrl, lastTitle;
let targetUrl = "https://www.walmart.com/";


function getTabInfo(tabId) {
    chrome.tabs.get(tabId, function(tab) {
        if(lastUrl != tab.url || lastTitle != tab.title)
            // in the future, the online server socket will be replaced
            var ws = new WebSocket('ws://localhost:40510');
            
            if(tab.url.includes(targetUrl)){
                $.getJSON('https://ipapi.co/json/', function(data) {
                    console.log("................", data.ip);
                });
                (async () => {
                    // send message to active tab to get data from it
                    let response = await chrome.tabs.sendMessage(tab.id, "ip-address");
                    ws.onopen = function () {
                        console.log('websocket is connected ...')
    
                        // sending a send event to websocket server
                        ws.send(response)
                    }
    
                    // // event emmited when receiving message from server
                    ws.onmessage = function (ev) {
                        console.log(ev);
                    }
                })();
                // event emmited when connected
               
            }
        console.log(lastUrl = tab.url, lastTitle = tab.title);
    });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    getTabInfo(activeTabId = activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(activeTabId == tabId) {
        getTabInfo(tabId);
    }
});