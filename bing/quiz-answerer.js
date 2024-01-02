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
function selectFiveAnswers() {
    // Get all elements with the class "b_cards bt_lstcl_card btcc btcNoImg"
    const elements = Array.from(document.querySelectorAll(".b_cards.bt_lstcl_card.btcc.btcNoImg"));

    // Loop through the elements
    setTimeout(() => {
        elements.forEach(element => {
            console.log("Running");
            element.click();
        });
    }, 500);
}

selectFiveAnswers();


// Quiz Type: Select 1 Answer (Out of 4)
function selectOneAnswer() {
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
}

setTimeout(selectOneAnswer, 500)


// Quiz Type: This or That
function thisOrThat() {
    // Get all elements with class "btOptionText"
    const optionTextElements = document.getElementsByClassName("btOptionText");

    // Iterate over the optionTextElements
    for (let i = 0; i < optionTextElements.length; i++) {
        const optionTextElement = optionTextElements[i];

        // Get the text of the optionTextElement
        const optionText = optionTextElement.textContent.trim();

        // Get the div with class "btOptionAns" inside the parent element
        const optionAnsElement = document.querySelector(".btOptionAns");

        // Get the text of the optionAnsElement
        const optionAnsText = optionAnsElement.textContent.trim();

        // Check if the optionAnsText contains the optionText
        if (optionAnsText.includes(optionText)) {
            // Get the parent element of the optionTextElement
            const parentElement = optionTextElement.parentElement;

            // Click on the parent element
            parentElement.click();
        }
    }
}

setTimeout(thisOrThat, 500);
