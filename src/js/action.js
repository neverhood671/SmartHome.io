 var is_dragging;

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


 function clearPopup() {
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
 }

 function initPopup() {
     Array.from(document.querySelectorAll(".device_card")).forEach(elem => {
         elem.addEventListener("click", e => {

             clearPopup();

             let deviceDefenition = Array.from(e.currentTarget.childNodes),
                 popupWindow = document.querySelector(".popup_window");

             popupWindow.insertAdjacentHTML('afterBegin', e.currentTarget.innerHTML);
             document.querySelector(".slider").value = e.currentTarget.lastChild.innerHTML;

             if (e.currentTarget.classList.contains("temp")) {
                 popupWindow.classList.add("temp_popup")
             } else if (e.currentTarget.classList.contains("light")) {
                 popupWindow.classList.add("light_popup");
             } else if (e.currentTarget.classList.contains("floor")) {
                 popupWindow.classList.add("floor_popup");
             }

             document.querySelector("body").classList.add("disable_scroll");
             document.querySelector(".popup").classList.add("show_popup");
             document.querySelector(".main_content").classList.add("blur_background");
             document.querySelector(".main_header").classList.add("blur_background");
             document.querySelector(".footer").classList.add("blur_background");
         }, true);
     });


     document.querySelector(".close").addEventListener("click", e => {
         document.querySelector("body").classList.remove("disable_scroll");
         document.querySelector(".popup").classList.remove("show_popup");
         document.querySelector(".main_content").classList.remove("blur_background");
         document.querySelector(".main_header").classList.remove("blur_background");
         document.querySelector(".footer").classList.remove("blur_background");
     });
 }


 function initPage() {
     document.querySelector(".selected_value").innerHTML = document.querySelector('.selected').innerHTML;
     addOnClickEventListeners(".navigation", "show_nav_dropdown");
     addOnClickEventListeners(".filter", "show_device_type");
     addMouseoverMousoutEventListeners(".card", "card_hover");
     initFilter();
     initCircleRange();
     initVerticalScroll();
     initPopup();
     initScroll("scenario_arrow", "scenario_card", "scenario_cards");
     initScroll("devices_arrow", "device_card", "device_cards");
 }


 function initScroll(arrowClassName, cardsClassName, cardsBlockClassName) {
     document.querySelectorAll(`.${arrowClassName}`).forEach(arrow => {
         arrow.addEventListener("click", e => {
             var direction = e.currentTarget.classList.contains("next") ? -1 : 1,
                 cardWidth = getElementWidth(document.querySelector(`.${cardsClassName}`)),
                 areaWidth = getElementWidth(document.querySelector(`.${cardsBlockClassName}`)),
                 offset = Math.floor(areaWidth / cardWidth) * cardWidth,
                 currentTranslate = /\.*translateX\((.*)px\)/i.exec(document.querySelector(`.${cardsClassName}`).style.transform),
                 summaryTranslate;
             currentTranslate = currentTranslate == null ? 0 : parseFloat(currentTranslate[1]);
             summaryTranslate = currentTranslate + direction * offset;

             if ((summaryTranslate > 0) || (Math.abs(summaryTranslate) >= document.documentElement.clientWidth)) {
                 summaryTranslate = 0
             }

             document.querySelectorAll(`.${cardsClassName}`).forEach(card => card.style.transform = `translateX(${summaryTranslate}px)`);
         });
     }, true);
 }

 function initVerticalScroll() {
     document.querySelector(".scheduled_scenarios_block").addEventListener("scroll", e => {
         var cardWithArrows = document.querySelector(".scheduled_scenario_card:nth-of-type(3)"),
             hideArrowClassName = "scroll";
         if (!cardWithArrows.classList.contains(hideArrowClassName)) {
             cardWithArrows.classList.add(hideArrowClassName);
         }
         if (e.target.scrollTop == 0) {
             cardWithArrows.classList.remove(hideArrowClassName);
         }
     });
 }


 function initFilter() {
     Array.from(document.querySelectorAll(".device_type")).forEach(elem => {
         elem.addEventListener("click", e => {
             document.querySelectorAll(".device_type.selected").forEach(e => e.classList.remove("selected"));
             e.currentTarget.classList.add("selected");
             document.querySelector(".selected_value").innerHTML = e.currentTarget.innerHTML;


             Array.from(document.querySelectorAll(".hide")).forEach(elem => elem.classList.remove("hide"));
             var selectedOption = document.querySelector(".device_type.selected").id;

             if (selectedOption !== "all") {

                 Array.from(document.querySelectorAll(".device_card"))
                     .filter(card => {
                         return (selectedOption !== card.dataset.room) && (selectedOption !== card.dataset.type);
                     })
                     .forEach(card => {
                         card.classList.add("hide");
                     });
             }
         });
     })
 }


 function initCircleRange() {

     is_dragging = false;

     addListenerMulti(document.querySelector(".circle"), "mousedown touchstart", e => is_dragging = true);
     addListenerMulti(document.querySelector(".circle"), "mouseup touchend", e => is_dragging = false);

     addListenerMulti(document.querySelector(".circle"), "mousemove touchmove", e => {
         if (is_dragging) {
             var touch, circle = document.querySelector(".circle");

             if (e.changedTouches) {
                 touch = e.changedTouches[0];
             }

             var center_x = (document.querySelector(".circle").offsetWidth / 2) + getOffset(document.querySelector(".circle")).left,
                 center_y = (document.querySelector(".circle").offsetHeight / 2) + getOffset(document.querySelector(".circle")).top,
                 pos_x = e.pageX || touch.pageX,
                 pos_y = e.pageY || touch.pageY,
                 delta_y = center_y - pos_y,
                 delta_x = center_x - pos_x,
                 angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI),
                 angle = angle - 90;
             if (angle < 0) {
                 angle = 360 + angle;
             }
             angle = Math.round(angle);
             if ((angle < 140) || (angle > 220)) {
                 document.querySelector(".dot").setAttribute('style', "transform: rotate(" + angle + "deg)");
                 let tempreture = Math.round(angle > 180 ? (-14 + (angle - 180) * 2 / 15) : (10 + angle * 2 / 15));
                 document.querySelector(".temp_display").innerHTML = tempreture > 0 ? "+" + tempreture : tempreture;
             }
         }
     });


 }

 function getOffset(elem) {
     if (elem.getBoundingClientRect) {
         return getOffsetRect(elem)
     } else {
         return getOffsetSum(elem)
     }
 }

 function getOffsetSum(elem) {
     var top = 0,
         left = 0
     while (elem) {
         top = top + parseInt(elem.offsetTop)
         left = left + parseInt(elem.offsetLeft)
         elem = elem.offsetParent
     }

     return { top: top, left: left }
 }

 function getOffsetRect(elem) {

     var box = elem.getBoundingClientRect(),
         body = document.body,
         docElem = document.documentElement,

         scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
         scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,

         clientTop = docElem.clientTop || body.clientTop || 0,
         clientLeft = docElem.clientLeft || body.clientLeft || 0,

         top = box.top + scrollTop - clientTop,
         left = box.left + scrollLeft - clientLeft;

     return { top: Math.round(top), left: Math.round(left) }
 }


 function addListenerMulti(elem, events, handler) {
     events.split(' ').forEach(e => elem.addEventListener(e, handler, false));
 }

 function getElementWidth(element) {
     var style = element.currentStyle || window.getComputedStyle(element),
         width = element.offsetWidth,
         margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
         padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
         border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
     return width + margin - padding + border;
 }