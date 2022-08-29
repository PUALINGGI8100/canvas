document.onreadystatechange = ()=>{
    if(document.readyState==="complete"){

        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        const resize = {
            drawer: document.querySelector("#drawer-size"),
            eraser: document.querySelector("#eraser-size"),
        };
        const mode = {
            draw: document.querySelector("#draw"),
            erase: document.querySelector("#erase"),
        };
        const color = document.querySelector("#color");
        const config = {
            x:0, y:0, color:"black",
            radius:20, rect: { w:20, h:20 }
        };
        let curMode = 1; // 1 stand for DRAW and 0 for ERASE

        // DOM Listener
        resize.drawer.addEventListener("change", (e)=>{
            config.radius = e.target.value;
        });
        resize.eraser.addEventListener("change", (e)=>{
            config.rect.w = config.rect.h = e.target.value;
        });
        color.addEventListener("change", (e)=>{
            config.color = e.target.value;
        });
        mode.draw.addEventListener("change", (e)=>{
            e.preventDefault();
            if(mode.erase.checked) mode.erase.checked=false;
            if(!e.target.checked) e.target.checked=true;
            curMode = 1;
        })
        mode.erase.addEventListener("change", (e)=>{
            e.preventDefault();
            if(mode.draw.checked) mode.draw.checked=false;
            if(!e.target.checked) e.target.checked=true;
            curMode = 0;
        })
        // helper func
        function getMousePos(evMouse){
            let bound = canvas.getBoundingClientRect();
            let scaleX = canvas.width/bound.width;
            let scaleY = canvas.height/bound.height;
            return {
                x: (evMouse.clientX-bound.left)*scaleX,
                y: (evMouse.clientY-bound.top)*scaleY,
            }
        }
        function draw(){
            ctx.beginPath();
            ctx.arc(config.x, config.y, config.radius, 0, Math.PI*2, false);
            ctx.fillStyle = config.color;
            ctx.fill();
        }
        function erase(){
            ctx.clearRect(config.x, config.y, config.rect.w, config.rect.h);
        }
        // handler mouse Event
        function mouseMoveHandler(ev){
            let pos = getMousePos(ev);
            config.x = pos.x;
            config.y = pos.y;
            curMode===1?draw():erase();
        }
        function pointerDownHandler(ev){
            canvas.onmousemove = mouseMoveHandler;
        }
        function pointerUpHandler(ev){
            canvas.onmousemove = null;
        }
        // init canvas
        canvas.width = canvas.height = 400;
        // set mouse event listener to canvas
        canvas.onpointerdown = pointerDownHandler; // left mouse click listener (press)
        canvas.onpointerup = pointerUpHandler; // left mouse click listener (release)
        canvas.onmouseleave = pointerUpHandler; // mouse leaving canvas

    }
}