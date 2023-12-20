// ==UserScript==
// @name        Bing Quiz Answerer
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @licence     MIT
// @version     1.0
// @author      Reddiepoint
// @description Automatically chooses the right options for Bing Quizzes
// ==/UserScript==

// Get all elements with the class "b_cards bt_lstcl_card btcc btcNoImg"
const elements = Array.from(document.querySelectorAll(".b_cards.bt_lstcl_card.btcc.btcNoImg"));

// Loop through the elements
setTimeout(() => {
    elements.forEach(element => {
        console.log("Running");
        element.click();
    });
}, 500);