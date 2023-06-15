const pregunta=document.querySelectorAll('.pregunta .contenedor');
pregunta.forEach((pregunta)=>{
    pregunta.addEventListener('click',(e)=>{
        e.currentTarget.classList.toggle('activa');

        const respuesta= pregunta.querySelector('.respuesta');
        const alturaRealRespuesta = respuesta.scrollHeight;

        if(respuesta.style.maxHeight){
            console.log('No esta vacia')
        }else{
            console.log('esta vacia')
        }
    })
});