const initDraggable = () => {
    const draggable = document.getElementById("cart-shopping");

    if (draggable) {
        draggable.style.position = "fixed";
        draggable.style.left = "92%";
        draggable.style.top = "20%";

        draggable.addEventListener("mousedown", (e) => {
            let offsetX = e.clientX - draggable.offsetLeft;
            let offsetY = e.clientY - draggable.offsetTop;

            const mouseMoveHandler = (e) => {
                draggable.style.left = `${e.clientX - offsetX}px`;
                draggable.style.top = `${e.clientY - offsetY}px`;
            };

            const mouseUpHandler = () => {
                document.removeEventListener("mousemove", mouseMoveHandler);
                document.removeEventListener("mouseup", mouseUpHandler);
            };

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
        });
    }
};

export default initDraggable;
