var cursor = document.querySelector('cursor')
var cursorScale = document.querySelector('cursor_scale')
let mouseX = 0;
let mouseY = 0;

gsap.to({}, 0.016 , {
    repeat:-1,
    onRepeat: function(){
        gsap.set(cursor, {
            css:{
                left:mouseX,
                top:mouseY
            }
        })
    }
})


window.addEventListener('mousemove', function(e){
     mouseX = e.clientX;
     mouseY = e.clientY;
})


cursorScale.addEventListener('mouseleave' , ()=>{
     cursorScale.remove('grow')
})

cursorScale.addEventListener('mousemove' , ()=>{
    cursorScale.add('grow')
})