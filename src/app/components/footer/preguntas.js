const pregunta=document.querySelectorAll('.pregunta .contenedor');
pregunta.forEach((pregunta)=>{
    pregunta.addEventListener('click',(e)=>{
        e.currentTarget.classList.toggle('activa')
    })
});