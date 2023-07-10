// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  try to take over the world!
// @author       me
// @match        *://*facebook*/*
// @match        *://*linkedin*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
    function cleanup() {
        const regex = /^\(.*\) /;

        if (document.title.match(regex) != null) {
            document.title = document.title.replace(regex, '');
        }

         // clean fb
        document.querySelectorAll('[aria-label*="unread"]').forEach(node => {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        })

        // clean linkedin
        var nodes = document.querySelectorAll('.notification-badge--show');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].classList.remove('notification-badge--show');
        }
    }

    const titleNode = document.querySelector('title');
    const config = { childList: true };
    const observer = new MutationObserver(cleanup);
    observer.observe(titleNode, config);

    //-----------------------------------------------------------------

    cleanup();
})();