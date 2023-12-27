// ==UserScript==
// @name        Bing Quiz Answerer
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @licence     MIT
// @version     2.0
// @author      Reddiepoint
// @description Automatically chooses the right options for Bing Quizzes
// ==/UserScript==


// Quiz Type: Select 5 Answers
// Get all elements with the class "b_cards bt_lstcl_card btcc btcNoImg"
const elements = Array.from(document.querySelectorAll(".b_cards.bt_lstcl_card.btcc.btcNoImg"));

// Loop through the elements
setTimeout(() => {
    elements.forEach(element => {
        console.log("Running");
        element.click();
    });
}, 500);


// Quiz Type: Select 1 Answer (Out of 4)
setTimeout(() => {
    // Get all elements with class "rqOption"
    const elements = document.getElementsByClassName("rqOption");

    // Iterate over the elements
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        // Get the value of the element
        const value = element.textContent.trim();

        // Search for the value in the page's code
        const searchResultCount = document.documentElement.innerHTML.split(value).length - 1;

        // If there is more than one result, click on the button
        if (searchResultCount > 1) {
            element.click();
        }
    }
}, 500);