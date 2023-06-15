const pregunta=document.querySelectorAll('.pregunta .contenedor');
pregunta.forEach((pregunta)=>{
    pregunta.addEventListener('click',(e)=>{
        e.currentTarget.classList.toggle('activa');

        const respuesta= pregunta.querySelector('.respuesta');
        const alturaRealRespuesta = respuesta.scrollHeight;

        if(!respuesta.style.maxHeight){
            respuesta.style.maxHeight=alturaRealRespuesta+'px';
        }else{
            respuesta.style.maxHeight=null;
        }
//reinicio
        pregunta.forEach((elemento)=>{
            if(pregunta!==elemento){
                elemento.classList.remove('activa');
                elemento.querySelector('.respuesta').style.maxHeight=null;
            }
        });
    });
});