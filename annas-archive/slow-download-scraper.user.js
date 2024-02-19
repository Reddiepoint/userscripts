// ==UserScript==
// @name        Anna's Archive Slow Download Scraper
// @namespace   Violentmonkey Scripts
// @match       https://annas-archive.org/md5/*
// @match       https://annas-archive.org/slow_download/*
// @version     1.0
// @author      Reddiepoint
// @description Gets the URLS for each slow download option
// @run-at      document-idle
// @grant       GM_openInTab
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==


if (location.href.includes("slow_download") && localStorage.getItem("scraping") > 0) {
    const downloadLinks = document.querySelectorAll("a");
    for (let downloadLink of downloadLinks) {
        if (downloadLink.textContent.includes("Download now")) {
            // Set random timeout
            const object = JSON.parse(localStorage.getItem("links"));
            object.links.push(downloadLink.href);
            localStorage.setItem("links", JSON.stringify(object));
            localStorage.setItem("scraping", localStorage.getItem("scraping") - 1);
            window.close();

        }
    }
}

if (location.href.includes("md5")) {
    const button = document.createElement("button");
    button.innerText = "Download";
    button.addEventListener("click", download);
    // Insert button before downloads panel
    const downloadsPanel = document.querySelector("#md5-panel-downloads > ul");
    downloadsPanel.insertAdjacentElement("beforebegin", button);

    function download() {
        const children = downloadsPanel.children;
        let n = 0;
        for (let child of children) {
            let link = child.querySelector("a").href;
            console.log("Found the link:", link);

            localStorage.setItem("scraping", "3");
            let object = {
                links: []
            }
            localStorage.setItem("links", JSON.stringify(object));

            setTimeout(() => {
                GM_openInTab(link, {
                    active: false
                });
            }, 1000 * n)
            n++;
        }

        let repeat = setInterval(() => {
            if (localStorage.getItem("scraping") == 0) {
                // Make new element with links after button
                let links = JSON.parse(localStorage.getItem("links"));
                const downloadlinks = links.links;
                let newElement = document.createElement("li");
                newElement.innerHTML = downloadlinks.join(" ");
                button.insertAdjacentElement("afterend", newElement);
                clearInterval(repeat);
            }
        }, 500);

    }

}



