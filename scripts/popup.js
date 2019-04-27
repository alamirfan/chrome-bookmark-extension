$(document).ready(function() {
    chrome.runtime.sendMessage({
            text: "getCategories"
        },
        function(response) {
            catArray = JSON.parse(response);
            $.each(catArray, function(i, item) {
                $("#categories").append($("<option>").attr('value', item));
            });
        }
    );

    var submitbtn = document.getElementById('submitButton');
    if (submitbtn) {
        submitbtn.addEventListener('click', saveFunction);
    }
});

function saveFunction() {
    document.getElementById("submitButton").innerHTML = "Saving... Please wait!"
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
        url = tabs[0].url;
        title = tabs[0].title;

        var category = document.getElementById("datalistCategories").value;
        var tags = document.getElementById("tags").value;
        var info = document.getElementById("info").value;

        chrome.runtime.sendMessage({
                text: "saveThis",
                url: url,
                title: title,
                category: category,
                tags: tags,
                info: info
            },
            function(response) {
                records = JSON.parse(response);
                for (i = 0; i < records.length; i++) {
                    var title = records[i]["title"];
                    var url = records[i]["url"];
                    var info = records[i]["info"];
                    var tags = records[i]["tags"];
                    var category = records[i]["category"];
                    $('#records').append("<a href=" + url + " target='_blank'><span class='title'>" + title + "</span><span class='url'>" + url + "</span><span class='info'>" + info + "</span><span class='tags'>" + tags + "</span><span class='category'>" + category + "</span><span class='clear'></span></a>");
                }
                document.getElementById("content").style.display = "none";
                document.getElementById("savedSuccess").style.display = "block";
                document.getElementById("headInfo").style.display = "block";
                document.getElementById("records").style.display = "block";
            }
        );

    });

}