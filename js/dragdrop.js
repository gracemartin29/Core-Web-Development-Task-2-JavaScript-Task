item.addEventListener("dragstart", function (event) {
    // allows sliders to slide without dragging
    if (sliderIsChanging) {
        event.preventDefault();
        return;
    }

    draggedElements = event.target;

    const style = window.getComputedStyle(draggedElements);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
})

dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
})

dropZone.addEventListener("drop", function (event) {
    draggedElements.style.left = event.clientX - offsetX + "px";
    draggedElements.style.top = event.clientY - offsetY + "px";
})