$(document).ready(function(){
    copyCitation = function(key) {
        navigator.clipboard.writeText(citationDictionary[key]);
    }

    var citationDictionary = {
        "NONE": ""
    }

    
    $.getJSON("pubs.json?t="+ Math.floor(Date.now()/1000), function(data){
        $("#research .content-container *:not(h3)").each(function(){
            $(this).remove();
        });

        papers = data.papers;

        $.each(papers, function(i, paper) {
            title = paper.title;
            date = paper.date;
            authors = paper.authors;
            journal = paper.journal;

            url = paper.link;
            bibtex = paper.citation;
            key = paper.citationkey;
            abstract = paper.abstract;

            // main citation
            main = "<p>" + authors + ", &ldquo;" + title + ",&rdquo; " + date + ". <span class='italic'>" + journal + "</span>.</p>";

            // add stuff with buttons here
            buttons = "<div class='paper-actions'>";
            
            if (url != "NONE") {
                buttons = buttons + "<a href='" + url + "' target='_blank'>PDF</a>";
            }

            if (bibtex != "NONE" & key != "NONE") {
                citationDictionary[key] = bibtex;
                buttons = buttons + "<a href='#research' onclick=\"copyCitation('" + key + "'); var t = this; t.innerHTML = 'Copied!'; setTimeout(function() { t.innerHTML = 'Copy Citation';}, 1000);\">Copy Citation</a></div>";
            }

            buttons = buttons + "</div>";

            // combine
            element = "<div class='publication'>" + main +  buttons + "</div>";

            console.log(element);
            $("#research .content-container").append(element);
        });
    });


});