let imageUploader = document.getElementById("picture-upload")
function uploadPicture() {
    imageUploader.click();
    imageUploader.addEventListener("change", function () {
        let imgObj = imageUploader.files[0];
        let imgLink = URL.createObjectURL(imgObj);
        let img = document.createElement("img");
        img.src = imgLink;
        img.setAttribute("class","up-img");
        //creating container
        let Pad = document.createElement("div");
        let navBar = document.createElement("div");
        let close = document.createElement("div");
        let textBox = document.createElement("div");
        //add class
        Pad.setAttribute("class", "sticky-pad");
        navBar.setAttribute("class", "nav-bar-img");
        close.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
        close.setAttribute("class", "close-img");
        textBox.setAttribute("class", "textbox");

        Pad.appendChild(navBar);
        Pad.appendChild(textBox);
        navBar.appendChild(close);
        textBox.appendChild(img);
        document.body.appendChild(Pad);

        let isOpen = true;
        let initialX, initialY;
        let isStickyDown = false;
        close.addEventListener("click", function () {
            Pad.remove();
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
                let { top, left } = Pad.getBoundingClientRect();
                Pad.style.top = top + dY + "px";
                Pad.style.left = left + dX + "px";
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

    })
}


// download image
function download() {
    let url = board.toDataURL();
    let a = document.createElement("a");
    a.setAttribute("class","a")
    a.download = "canvas.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.querySelector(".a").addEventListener("click",function(e){
        e.preventDefault();
    })
    document.body.removeChild(a);
}

