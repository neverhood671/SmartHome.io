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

function addMouseoverMousoutEventListeners(targetElementsSelector, onMouseoverMousoutClassName) {
    Array.from(document.querySelectorAll(targetElementsSelector)).forEach(elem => {
        elem.addEventListener("mouseover", e => {
            e.currentTarget.classList.add(onMouseoverMousoutClassName);
        }, true);
    });

    Array.from(document.querySelectorAll(targetElementsSelector)).forEach(elem => {
        elem.addEventListener("mouseout", e => {
            e.currentTarget.classList.remove(onMouseoverMousoutClassName);
        }, true);
    });
}


function initPage() {
	document.querySelector(".selected_value").innerHTML = document.querySelector('.selected .label').innerHTML;
    addOnClickEventListeners(".navigation", "show_nav_dropdown");
    addOnClickEventListeners(".filter", "show_device_type");
    addMouseoverMousoutEventListeners(".card", "card_hover")
}