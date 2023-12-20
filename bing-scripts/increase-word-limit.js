// ==UserScript==
// @name        Bing Increase Word Limit
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @license     MIT
// @version     7.0
// @author      Reddiepoint
// @description Increases the word limit for Bing Search and Bing Chat to 1000000.
// ==/UserScript==


const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            const element = document.querySelector("#b_sydConvCont > cib-serp")?.shadowRoot
                ?.querySelector("#cib-action-bar-main")?.shadowRoot
                ?.querySelector("div > div.main-container > div > div.input-row > cib-text-input")?.shadowRoot
                ?.querySelector("#searchbox");

            if (element) {
                element.setAttribute("maxlength", "1000000");
                observer.disconnect();
                break;
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });


Array.from(document.getElementsByName("q")).forEach(function(element) {
    element.setAttribute("maxlength", "1000000")
});