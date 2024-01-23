/*let audioEnUso = false, audioPausado = false;
let punteroAudio, punteroBarraDeAudio;
let arreAudios = []
let IdseccionAudioPlayer = 0, cantidadComponentesAudios = 0

let arreAudiosPadre =   [[['https://res.cloudinary.com/dplncudbq/video/upload/v1658158699/mias/26mesclaLista_kf3qai.wav','https://res.cloudinary.com/dplncudbq/image/upload/v1658015902/mias/i1_ndc8ga.png', 'titulo', 'chachara.....'],
                    ['https://res.cloudinary.com/dplncudbq/video/upload/v1657579441/mias/m1_s2epfa.mp3','https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png', 'titulo2', 'chachara2.....'],
                    ['https://res.cloudinary.com/dplncudbq/video/upload/v1657299118/mias/m2_koysag.mp3','https://res.cloudinary.com/dplncudbq/image/upload/v1657297550/mias/logoGenerico_dotmc8.png', 'titulo3', 'chachara3.....'],
                    ],
                    [['https://res.cloudinary.com/dplncudbq/video/upload/v1655393042/mias/25mayoMescla_fgwly2.wav','https://res.cloudinary.com/dplncudbq/image/upload/v1657473712/mias/icon_a5cxv7.png', 'titulo', 'chachara.....'],
                    ['https://res.cloudinary.com/dplncudbq/video/upload/v1655401932/mias/pista1C_i5w9id.wav','https://res.cloudinary.com/dplncudbq/image/upload/v1657563363/mias/h16_gdnh00.jpg', 'titulo2', 'chachara2.....'],
                    ['https://res.cloudinary.com/dplncudbq/video/upload/v1656010089/mias/voces_os7tgw.wav','https://res.cloudinary.com/dplncudbq/image/upload/v1657987574/mias/f11_fcmy9f.png', 'titulo3', 'chachara3.....'],
                    ]] 



export function usarReproductorAudio(idSeccion){

    arreAudios = []
    IdseccionAudioPlayer = idSeccion
    //let audioPlayer = document.getElementById(`contenedorAudioPlayer${IdseccionAudioPlayer}`)
    arreAudios = arreAudiosPadre[IdseccionAudioPlayer]
    let cod = "";

    cod += `
    <div  className="padding1" >
        <div className="borde2 padding1 color1 sombra">
    `

    for (let i = 0; i < arreAudios.length; i++) {
            cod += `
            <div id="componente${IdseccionAudioPlayer}div_miAudio${i}" className="flex" onclick="seleccionarAudio('componente${IdseccionAudioPlayer}div_miAudio${i}', '${IdseccionAudioPlayer}')">
                <div>
                    <img style="width:50px" src="${arreAudios[i][1]}" alt="seo">
                </div>
                <div className="block">
                    <div>
                        ${arreAudios[i][2]}
                    </div>
                    <div>
                        ${arreAudios[i][3]}
                    </div>
                </div>
            </div>
            <audio id="Audiocomponente${IdseccionAudioPlayer}div_miAudio${i}">
                <source src="${arreAudios[i][0]}" type="audio/wav">
                Your browser does not support the audio element.
            </audio>
            `
        } 

        cod += `
            <img style="width:50px" onclick="playAudio(${cantidadComponentesAudios})" src="../static/images/play.png" alt="seo">
            <img style="width:50px" onclick="pauseAudio('pausar')" src="../static/images/pause.png" alt="seo">
            <img style="width:50px" onclick="stopAudio()" src="../static/images/stop.png" alt="seo">
            <input className="rangeLimpio fondoTransparente" type="range" onchange="actualizarUbicacionAudio(this.value)" id="${IdseccionAudioPlayer}barraDeReproductorAudio" value="0" max="0"/>
        </div>
    </div>
    `
    cantidadComponentesAudios += 1
    //audioPlayer.innerHTML = cod;
    return cod
}

function seleccionarAudio(id, idSeccionAUsar){

    if(punteroAudio != undefined){
        stopAudio()
    }

    punteroAudio = document.getElementById(`Audio${id}`); 
    
    let buscar = "";
    for (let u = 0; u < arreAudiosPadre.length; u++) {
        for (let i = 0; i < arreAudiosPadre[u].length; i++) {
            buscar = `componente${u}div_miAudio${i}`
            document.getElementById(buscar).classNameList.remove("fondoTransparente")
        }
    }
    
    document.getElementById(`${id}`).classNameList.add("fondoTransparente")

    punteroBarraDeAudio =  document.getElementById(`${idSeccionAUsar}barraDeReproductorAudio`)
    punteroBarraDeAudio.value = 0;
    punteroBarraDeAudio.max = punteroAudio.duration;
    
    playAudio()
}

function playAudio(id) { 
    if(punteroAudio == undefined){
        if(arreAudios.length != 0){
            seleccionarAudio(`componente${id}div_miAudio${0}`, id)
        } else {
            alert("no hay audios cargados!!!")
        }
    } else {
        if(audioPausado == false){
            stopAudio()
            setTimeout(reiniciarInputRange, 1100)
        } else {
            audioEnUso = false
            setTimeout(reiniciarInputRange, 1100)
        }
        
    }
    
} 

function reiniciarInputRange(){
    punteroAudio.play()
    audioEnUso = true
    cronometro()
}

function pauseAudio() { 
    audioPausado = true;
    punteroAudio.pause(); 
    audioEnUso = false;
} 

function stopAudio() {
    pauseAudio()
    punteroAudio.currentTime = 0;
    punteroBarraDeAudio.value = 0;
}

function actualizarUbicacionAudio(acc){
    punteroAudio.currentTime = acc;
}

function cronometro(){
    if(audioEnUso == true){
        
        punteroBarraDeAudio.value = parseFloat(punteroBarraDeAudio.value) + 1
        console.log(punteroBarraDeAudio.value);
        setTimeout(cronometro, 1000)
    }
}*/