import {parse} from "./csv/index.js"

var pubs;
$.ajax({
    type: "GET",
    url: "bibliography.csv",
    dataType: "text",
    success: function(response) { 
        pubs = parse(response);

        /*
        Cheat sheet:
        0 = author
        1 = year
        2 = title
        3 = journal
        4 = volume
        5 = issue
        6 = doi
        7 = pdf (url)
        8 = bibtex
        */

        // Sort by (1) year, (2) journal ["In progress" < "Working paper" < anything else (a journal)]
        pubs.sort(sortPublications);
        pubs.splice(0, 1);

        $.each(pubs, function(index, value) {
            var html = "<div class=\"bibliography-item\">\n";
            html += ("<p>" + value[0] + " (" + value[1] + "). \"" + value[2] + ".\"");
            html += (" <span class=\"it\">" + value[3] + "</span>.</p>\n");

            // If any of (DOI, PDF, BibTeX) exist, make ul
            if (value[6] != "" | value[7] != "" | value[8] != "") {
                html += "<ul>\n";

                // Add DOI
                if (value[6] != "") {
                    html += ("<li><a target=\"_blank\" href=\"" + value[6] + "\"><span>DOI</span></a></li>\n");
                }
                // Add PDF
                if (value[7] != "") {
                    html += ("<li><a target=\"_blank\" href=\"" + value[7] + "\"><span>PDF</span></a></li>\n");
                }
                // Add citation/BibTeX
                if (value[8] != "") {
                    html += ("<li class=\"bibtex-cite-btn\"><a><span>Cite<div class=\"bibtex-cite-val\">" + value[8] + "</div></span></a></li>\n");
                }

                html += "</ul>\n";
            }

            html += "</div>";

            $("#papers").append(html);
        });



        $(".bibtex-cite-btn a").each(function() {
            $(this).on("click", function() {
                var copyText = $(this).find("div.bibtex-cite-val").eq(0).text();
                navigator.clipboard.writeText(copyText);
                
                var textSpan = $(this).find("span:not(.bibtex-cite-val)");
                textSpan.text("BibTeX Copied!");
                setTimeout(function() {
                    textSpan.text("Cite");
                }, 500);
            });
        });
    }
})

var pub_status = ["Working paper", "In progress"]

function sortPublications(a, b) {
    var a_status = pub_status.indexOf(a[3])
    var b_status = pub_status.indexOf(b[3])

    if (a[1] === b[1] & a_status == b_status) {
        // Case: year and publication status are the same
        return 0;
    } else if (a[1] === b[1] & a_status != b_status) {
        // Case: year is the same but publication status is different
        return (a_status < b_status) ? -1 : 1;
    } else if (a[1] != b[1]) {
        // Case: year is different (sort in descending order of year)
        return (a[1] < b[1]) ? 1 : -1;
    }
}
