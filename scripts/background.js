var allCategories,
savingInfo="";
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.text=="getCategories") {
        var categories=getCategories();
        sendResponse(categories)
    }
    if (request.text=="saveThis") {
        var info=saveToDB(request.url, request.title, request.category, request.tags, request.info);
        sendResponse(info)
    }
}

);
function saveToDB(url, title, category, tags, info) {
    $.ajax( {
        method: "GET", async: false, url: "https://irfanalam.net/bookmark-app.php", data: {
            url: url, title: title, category: category, tags: tags, info: info
        }
        , success: function(answer) {
            if(answer !="error") {
                savingInfo=answer;
            }
        }
    }
    );
    return savingInfo;
}

function getCategories() {
    $.ajax( {
        method: "GET", async: false, url: "https://irfanalam.net/bookmark-app.php", data: {
            query: "categories"
        }
        , success: function(answer) {
            allCategories=answer
        }
    }
    );
    return allCategories;
}