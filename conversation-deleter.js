// ==UserScript==
// @name        Bing Chat Conversation Deleter
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @license     MIT
// @version     1.0
// @author      Reddiepoint
// @description Deletes all recent conversations.
// ==/UserScript==

function deleteAll() {
    console.log("Deleting");
    const mainElement = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-conversation-main > cib-side-panel").shadowRoot.querySelector("div.main > div > div > div");
    const button = mainElement.querySelector("cib-thread:nth-child(2)").shadowRoot.querySelector("div > div.controls > button.delete.icon-button");

    if (button) {
        setTimeout(function() {
            button.click();
            if (button) {
                deleteAll();
            }
        }, 50);
    }
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
            console.log("Detected");
            const mainElement = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-conversation-main > cib-side-panel").shadowRoot.querySelector("div.main > div > div > div");
            let existingButton = mainElement.querySelector("button");
            if (!existingButton) {
                let button = document.createElement("button");
                button.innerHTML = "Delete All Conversations";

                mainElement.appendChild(button);
                observer.disconnect();

                button.addEventListener('click', () => {
                    deleteAll();
                });
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
