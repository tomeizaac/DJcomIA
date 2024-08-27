pulsoDirX=0
pulsoDirY=0
pulsoEsqX=0
pulsoEsqY=0

function setup(){
    canvas= createCanvas(780,480);
    canvas.center()

    video= createCapture(VIDEO)
    video.size(780,480)
    video.hide()    

    poseNet= ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log("O poseNet foi carregado com sucesso!!")
}

function gotPoses(results){
    if(results.length> 0){
        console.log(results)
        pulsoEsqX= results[0].pose.leftWrist.x
        pulsoDirX= results[0].pose.rightWrist.x
        pulsoEsqY= results[0].pose.leftWrist.y  
        pulsoDirY= results[0].pose.rightWrist.y
    }
}

function draw(){
    image(video, 0, 0, 780, 480);
    ellipse(pulsoDirX, pulsoDirY, 60)
    ellipse(pulsoEsqX, pulsoEsqY, 60)

    volume= floor(Number(pulsoEsqY))
    document.getElementById("volume").innerHTML= "Volume: " + volume
    if(volume>0 && volume<96){
        musica.setVolume(1)
    }
    if(volume>96 && volume<192){
        musica.setVolume(0.8)
    }
    if(volume>192 && volume<288){
        musica.setVolume(0.6)
    }
    if(volume>288 && volume<384){
        musica.setVolume(0.4)
    }
    if(volume>384 && volume<480){
        musica.setVolume(0.2)
    }

    velocidade= floor(Number(pulsoDirY))
    document.getElementById("speed").innerHTML= "Velocidade: " + velocidade
    if(velocidade>0 && velocidade<96){
        musica.rate(2.5)
    }
    if(velocidade>96 && velocidade<192){
        musica.rate(2.0)
    }
    if(velocidade>192 && velocidade<288){
        musica.rate(1.5)
    }
    if(velocidade>288 && velocidade<384){
        musica.rate(1.0)
    }
    if(velocidade>384 && velocidade<480){
        musica.rate(0.5)
    }
}

function preload(){
    musica=loadSound("music.mp3")
}

function tocar(){
    musica.play()
}