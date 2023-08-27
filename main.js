objects=[];
status="";

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!")
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video, 0, 0, 380, 380);

        if(status !=""){
            r=random(255);
            g=random(255);
            b=random(255);
            objectDetector.detect(video, gotResult);
            
            document.getElementById("baby").innerHTML="Number of Objects Detected are : "+objects.length;
           


            for (i=0; i<objects.length; i++){
          

                fill(r,g,b);
                percent=floor(objects[i].confidence*100);
        
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y+15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                if(objects[i].label == 'person'){
                    document.getElementById("status").innerHTML="Status : Baby Detected";
                }else{
                    document.getElementById("status").innerHTML="Status : No Baby Detected";
                    var audio = new Audio('M.mp3');
                    audio.play();

                }

            }
        }
}


