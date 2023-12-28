// ==UserScript==
// @name        Mega Sort By Size
// @namespace   Violentmonkey Scripts
// @match       https://mega.nz/folder/*
// @licence     MIT
// @version     1.0
// @author      Reddiepoint
// @description Adds a button that automatically sorts the files in the current folder by size
// ==/UserScript==


// Function to insert the "Sort by Size" button
const insertSortBySizeButton = () => {
    const listViewBtn = document.querySelector(".listing-view");
    const blockViewBtn = document.querySelector(".block-view");

    if (listViewBtn && blockViewBtn && !document.getElementById("sortbysize")) {
        const sortBySize = () => {
            listViewBtn.click(); // Click the list view button
            const sizeBtn = document.querySelector(".size");

            setTimeout(() => {
                if (sizeBtn) {
                    sizeBtn.click(); // Click once to sort ascending
                    sizeBtn.click(); // Click again to sort descending
                }
            }, 500); // Adjust the timeout as necessary
            blockViewBtn.click(); // Go back to block view
        };

        const btn = document.createElement("button");
        btn.textContent = "Sort by Size";
        btn.id = "sortbysize";
        btn.onclick = sortBySize;
        const target = document.querySelector(".fm-breadcrumbs-wrapper"); // Adjust the selector as necessary
        target.appendChild(btn);
    }
};

// MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations, obs) => {
    const listViewBtn = document.querySelector(".listing-view");
    const blockViewBtn = document.querySelector(".block-view");
    if (listViewBtn && blockViewBtn) {
        insertSortBySizeButton();
        // Once the buttons are found and the "Sort by Size" button is inserted, disconnect the observer
        obs.disconnect();
        observer.disconnect();
    }
});

// Start observing the document body for added nodes
observer.observe(document.body, {
    childList: true,
    subtree: true
});