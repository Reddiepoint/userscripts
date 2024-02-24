// ==UserScript==
// @name        Bing Quiz Answerer
// @namespace   Violentmonkey Scripts
// @match       https://www.bing.com/*
// @licence     MIT
// @version     2.0
// @author      Reddiepoint
// @description Automatically chooses the right options for Bing Quizzes
// @run-at      document-idle
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

    // Get script content
    const scriptContent = document.querySelector("body > script:nth-child(15)").textContent;
    // Iterate over the elements
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        // Get the value of the element
        const value = element.textContent.trim();

        // // Search for the value in the page's code
        // const searchResultCount = document.documentElement.innerHTML.split(value).length - 1;
        //
        // // If there is more than one result, click on the button
        // if (searchResultCount > 1) {
        //     element.click();
        // }
        // Check if the script contains the value of the element
        if (scriptContent.includes(value)) {
            element.click();
            // break; // Stop after clicking the correct answer
        }
    }
}

setTimeout(selectOneAnswer, 500)


// Quiz Type: This or That
function thisOrThat() {
    // Get all elements with class "btOptionText"
    const optionTextElements = document.getElementsByClassName("btOptionText");
    const questionText = document.querySelector("div.bt_queText");

    // Form search
    const search = questionText.textContent.trim() + " " + optionTextElements[0].textContent.trim() + " or " + optionTextElements[1].textContent.trim();

    // Create button that copies search text to clipboard
    const button = document.createElement("button");
    button.innerText = "Copy Search";
    button.addEventListener("click", () => {
        // Copy search text to clipboard
        navigator.clipboard.writeText(search);
        button.innerText = "Copied!";
        setTimeout(() => {
            button.innerText = "Copy Search";
        }, 2000);
    });

    // Insert button after question text
    // Create a line break element
    const lineBreak = document.createElement("br");
    const pointsLocation = document.querySelector("#currentQuestionContainer > span > span.points");
    pointsLocation.insertAdjacentElement("afterend", button);
    pointsLocation.insertAdjacentElement("afterend", lineBreak);
}

setTimeout(thisOrThat, 500);
