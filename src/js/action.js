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

function popup() {
    Array.from(document.querySelectorAll(".device_card")).forEach(elem => {
        elem.addEventListener("click", e => {

            let deviceDefenition = Array.from(e.currentTarget.childNodes),
                popupWindow = document.querySelector(".popup_window");

            popupWindow.insertAdjacentHTML('afterBegin', e.currentTarget.innerHTML);
            document.querySelector(".vertical_slider").value = e.currentTarget.lastChild.innerHTML;

            if (e.currentTarget.classList.contains("temp")) {
                popupWindow.classList.add("temp_popup");
                document.querySelector(".min").innerHTML = document.querySelector(".vertical_slider").min;
                document.querySelector(".max").innerHTML = document.querySelector(".vertical_slider").max;
            } else if (e.currentTarget.classList.contains("light")) {
                popupWindow.classList.add("light_popup");
                document.querySelectorAll(".range_label").forEach(e => e.innerHTML = "☀");
            } else if (e.currentTarget.classList.contains("floor")) {}

            document.querySelector(".popup").classList.add("show_popup");
        }, true);
    });


    document.querySelector(".close").addEventListener("click", e => {
        document.querySelector(".popup").classList.remove("show_popup");

        let popupWindow = document.querySelector(".popup_window");

        Array.from(document.querySelectorAll(".popup_window .device_def")).forEach(e => {
            popupWindow.removeChild(e);
        });

        if (popupWindow.classList.contains("temp_popup")) {
            popupWindow.classList.remove("temp_popup");
        } else if (popupWindow.classList.contains("light_popup")) {
            popupWindow.classList.remove("light_popup");
        } else if (popupWindow.classList.contains("floor_popup")) {
            popupWindow.classList.remove("floor_popup");
        }
    });
}


function initPage() {
    document.querySelector(".selected_value").innerHTML = document.querySelector('.selected .label').innerHTML;
    addOnClickEventListeners(".navigation", "show_nav_dropdown");
    addOnClickEventListeners(".filter", "show_device_type");
    addMouseoverMousoutEventListeners(".card", "card_hover");

    popup();
}