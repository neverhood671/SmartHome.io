function addOnClickEventListeners(targetElementsSelector, onClickClassName) {
    Array.from(document.querySelectorAll(targetElementsSelector)).forEach(elem => {
        elem.addEventListener("click", e => {
            if (e.currentTarget.classList.contains(onClickClassName)) {
                e.currentTarget.classList.remove(onClickClassName);
            } else {
                e.currentTarget.classList.add(onClickClassName);
            }
        }, true);
    });
}

function initPage() {
	addOnClickEventListeners(".navigation", "show_nav_dropdown");
	addOnClickEventListeners(".filter_section", "show_options");
}

