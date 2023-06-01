// ==UserScript==
// @name        Bing Chat Conversation Deleter
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @license     MIT
// @version     2.0
// @author      Reddiepoint
// @description Deletes all recent conversations from Bing Chat.
// ==/UserScript==

const mainElementSelector = "#b_sydConvCont > cib-serp";
const shadowRootSelector = "#cib-conversation-main > cib-side-panel";
const divSelector = "div.main > div > div > div";
const buttonSelector = "cib-thread:nth-child(2)";
const deleteButtonSelector = "div > div.controls > button.delete.icon-button";

function getMainElement() {
    const mainElement = document.querySelector(mainElementSelector);
    if (!mainElement) {
        return null;
    }
    const shadowRoot1 = mainElement.shadowRoot;
    if (!shadowRoot1) {
        return null;
    }
    const shadowRoot2 = shadowRoot1.querySelector(shadowRootSelector).shadowRoot;
    if (!shadowRoot2) {
        return null;
    }
    return shadowRoot2.querySelector(divSelector);
}

function getDeleteButton(mainElement) {
    if (!mainElement) {
        return null;
    }
    const buttonElement = mainElement.querySelector(buttonSelector);
    if (!buttonElement) {
        return null;
    }
    return buttonElement.shadowRoot.querySelector(deleteButtonSelector);
}

function deleteAll() {
    const mainElement = getMainElement();
    const button = getDeleteButton(mainElement);

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
            const mainElement = getMainElement();
            let existingButton = mainElement && mainElement.querySelector("button");
            if (!existingButton) {
                let button = document.createElement("button");
                button.innerHTML = "Delete All Conversations";

                mainElement && mainElement.appendChild(button);

                button.addEventListener('click', () => {
                    deleteAll();
                });
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });