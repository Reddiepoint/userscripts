// ==UserScript==
// @name        Bing Chat Conversation Deleter
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @license     MIT
// @version     3.1
// @author      Reddiepoint
// @description Deletes all recent conversations from Bing Chat.
// ==/UserScript==

(function() {
    'use strict';

    function waitForElement(selector) {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                }
            }, 10);
        });
    }

    async function deleteConversations() {
        const sidePanel = await waitForElement("#b_sydConvCont > cib-serp");
        const secondChild = sidePanel.shadowRoot.querySelector("#cib-conversation-main > cib-side-panel").shadowRoot.querySelector("#cib-threads-container > cib-thread:nth-child(2)");
        const controls = secondChild.shadowRoot.querySelector("div > div > div.controls");
        // document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-conversation-main > cib-side-panel").shadowRoot.querySelector("#cib-threads-container > cib-thread.active").shadowRoot.querySelector("div > div > div.controls > button.delete.icon-button")
        let deleteButton = controls.querySelector("button.delete.icon-button");
        if (deleteButton) {
            deleteButton.click();
            await new Promise(resolve => setTimeout(resolve, 10));
            const confirmInterval = setInterval(() => {
                const confirmButton = controls.querySelector("button.confirm.icon-button");
                if (confirmButton) {
                    clearInterval(confirmInterval);
                    confirmButton.click();
                }
            }, 10);
            const restartInterval = setInterval(() => {
                // const secondChild = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-conversation-main > cib-side-panel").shadowRoot.querySelector("#cib-threads-container > cib-thread:nth-child(2)")
                if (!secondChild) clearInterval(restartInterval);
                if (secondChild.shadowRoot.querySelector("div > div.controls > button.delete.icon-button")) {
                    clearInterval(restartInterval);
                    deleteConversations();
                }
            }, 10);
        }
    }


    async function addButton() {
        const sidePanel = await waitForElement("#b_sydConvCont > cib-serp");
        const sidePanelShadowRoot = sidePanel.shadowRoot;
        const mainDiv = sidePanelShadowRoot.querySelector("#cib-conversation-main > cib-side-panel");
        const mainDivShadowRoot = mainDiv.shadowRoot;
        const div = mainDivShadowRoot.querySelector("div.main > div > div > div");

        const button = document.createElement("button");
        button.innerText = "Delete all conversations";
        button.addEventListener("click", deleteConversations);
        div.appendChild(button);
    }

    addButton();
})();
