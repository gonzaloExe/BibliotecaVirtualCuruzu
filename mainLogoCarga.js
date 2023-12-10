window.addEventListener('load',()=>{
    const contenedor_loader=document.querySelector('.contenedor_loader')
    contenedor_loader.style.opacity=0
    contenedor_loader.style.visivility='hidden'
    document.getElementById("loader").classList.toggle("loader2")
 
    
})
const app=document.getElementById('typewriter');
const typewriter=new Typewriter(app,{
    loop:true,
    delay:125
});

typewriter
.typeString('')
.pauseFor(30)
.start();


  


  
