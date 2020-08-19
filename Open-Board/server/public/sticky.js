function createSticky() {
    // create 
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let minimize = document.createElement("div");
    let close = document.createElement("div");
    let textBox = document.createElement("div");
    let textArea = document.createElement("textarea");
    //add class
    stickyPad.setAttribute("class", "sticky-pad");
    navBar.setAttribute("class", "nav-bar");
    minimize.setAttribute("class", "minimize");
    minimize.innerHTML='<i class="fa fa-window-minimize" aria-hidden="true"></i>'
    close.innerHTML='<i class="fa fa-times" aria-hidden="true"></i>'
    close.setAttribute("class", "close");
    textBox.setAttribute("class", "textbox");
    textArea.setAttribute("autofocus", true);
    textArea.setAttribute("placeholder", "Type Here...")
    //tree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textBox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    textBox.appendChild(textArea);
    document.body.appendChild(stickyPad);
    // events
    let isOpen = true;
    let initialX, initialY;
    let isStickyDown = false;
    close.addEventListener("click", function () {
        stickyPad.remove();
    })
    minimize.addEventListener("click", function () {
        if (isOpen) {
            textBox.style.display = "none";
        } else {
            textBox.style.display = "block";
        }
        isOpen = !isOpen;
    })
    navBar.addEventListener("mousedown", function (e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })
    navBar.addEventListener("mousemove", function (e) {
        if (isStickyDown) {
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dX = finalX - initialX;
            let dY = finalY - initialY;
            let { top, left } = stickyPad.getBoundingClientRect();
            stickyPad.style.top = top + dY + "px";
            stickyPad.style.left = left + dX + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })
    navBar.addEventListener("mouseup", function (e) {
        isStickyDown = false;
    })
    navBar.addEventListener("mouseleave", function (e) {
        isStickyDown = false
    })
}
