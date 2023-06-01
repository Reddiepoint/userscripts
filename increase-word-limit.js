// ==UserScript==
// @name        Bing Increase Word Limit
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @license     MIT
// @version     5.0
// @author      Reddiepoint
// @description Increases the word limit for Bing Search and Bing Chat to 1000000.
// ==/UserScript==

function addMaxLengthEventListener(object) {
    object.addEventListener("focusin", event => {
        if (event.target.getAttribute("maxlength")) {
            event.target.setAttribute("maxlength", "1000000");
        }
    });
}

addMaxLengthEventListener(document);

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
            const cibSerpElement = document.querySelector("#b_sydConvCont > cib-serp");
            if (cibSerpElement) {
                const element = cibSerpElement.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("#searchbox");
                addMaxLengthEventListener(element);
                observer.disconnect();
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });