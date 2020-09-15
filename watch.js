//images
const powerOff = "watchImg/powerOff.png";
const turnOn = "watchImg/turnOn.png";
const imgWatch = "watchImg/watch.png";
const buttonDown = "watchImg/pressedD.png";
const buttonUp = "watchImg/pressedU.png";
const buttonLeft = "watchImg/pressedL.png";
const buttonRight = "watchImg/pressedR.png";
const vibration = "watchImg/vibration.png";


document.addEventListener('keydown', choose);

function choose(e) {
    if(e.keyCode===37){
            updownAudio.play();
            click(turnOn);           
            document.removeEventListener('keydown', choose);
            startAudio.play();

            startAudio.addEventListener("ended",function(){
            document.removeEventListener('keydown', choose);
            //explain the buttons
            selectTraining();
            
           });
            
    }
}
function selectTraining(){
    say("Hello! Nice to meet you again!");
    say("Please press up button for multiplication table trainer");
    say("Please press down button for time telling trainer");
    document.addEventListener('keydown', chooseApp);

    function chooseApp(e){
    if(e.keyCode===38){//up
        document.removeEventListener('keydown', chooseApp);
        click(buttonUp);
        multiplicationApp();
    }else if(e.keyCode===40){//down
        document.removeEventListener('keydown', chooseApp);
        click(buttonDown);
        timeTellingApp();
    }else{
        say("Please click up or down");
        }
    }
}

function click(button){
        if(button==="watchImg/pressedD.png" || button==="watchImg/pressedU.png"){
            updownAudio.play();     
        }else if(button==="watchImg/pressedL.png" || button==="watchImg/pressedR.png"){
            leftAudio.play();    
        }
           
        document.getElementById("watch").src = button;
        setTimeout(function(){ document.getElementById("watch").src = imgWatch; }, 500);
        }


function timeTellingApp(){

                function endSession(){
                say("If you want to go to the main menu press right button");
                say("If you want to choose another mode press left button");

                document.addEventListener("keydown",chooseAction);

                function chooseAction(e){
                    if(e.keyCode===37){
                        click(buttonLeft);
                        document.removeEventListener("keydown",chooseAction);
                        newTraining();
                    }else if(e.keyCode===39){
                        click(buttonRight);
                        document.removeEventListener("keydown",chooseAction);
                        selectTraining();
                    }else{
                        say("Please click left or right");
                    }
                }

            }

    say("Welcome to the time telling trainer app!");
    var score,numQuestions,endTraining;
    newTraining();

    function newTraining(){
        say("Please choose the traning mode");
        say("Press up button to go to trainer ");
        say("Press down to tell current time");

        score=0;
        numQuestions=0;

        document.addEventListener('keydown', chooseMode);

        function chooseMode(e){
        if(e.keyCode===38){//up
            document.removeEventListener('keydown', chooseMode);
            click(buttonUp);
            digToSp();
        }else if(e.keyCode===40){//down
            document.removeEventListener('keydown', chooseMode);
            click(buttonDown);
            tellTime();
        }else{
            say("Please click up or down");
                }
        }
        
    }

    function tellTime(){
        var today = new Date();
        var time = today.getHours() + "  " + today.getMinutes() + " ";
        say(time);
        endSession();


    }

    function determineDigToSp(hours,minutes){

        var timeStr, minStr, hourStr, pastOrTo, prep="";
        var minute = parseInt(minutes,10);
        var hour = parseInt(hours,10);
        if(minute>30){
            minStr = 60-minute.toString();
            pastOrTo = "to";
            hour = hour+1;
        }else if(minute<=30){
            minStr = minute.toString();
            pastOrTo = "past";
        }

        if(hour>12){
            hour=hour-12;
        }

        if(hour===0){
            hour=12;
            hourStr = "12";
        }

        if(minStr=="15"){
            minStr = "quarter";
        }else if(minStr=="30"){
            minStr = "half";
        }
        if(typeof hourStr=="undefined"){
            hourStr = hour.toString();
        }
        if(minute.toString()=="0"){
            hourStr = hour + "oclock"
            minStr = "";
            pastOrTo = "";
        }


        timeStr = minStr + " " + pastOrTo +" "+ hourStr + " ";
        return timeStr;
    }


    function createRandomMinute(){
        var quarters = ['00','15','30','45'];         
        var minute;

        var minuteRand = Math.floor((Math.random() * 59));
        quarters.push(minuteRand.toString());
        
        shuffleArray(quarters);
        minute = quarters[0];

        return minute;
    }
    function digToSp(){
        //often used minutes         
        var timeStr;
        var minute = createRandomMinute();
        var hour = Math.floor((Math.random() * 23));
        timeStr = determineDigToSp(hour.toString(),minute);

        var choices = [];
        var ans = timeStr;
        var falseAnswer;
        choices.push(ans);

        for(var i=0;i<3;i++){
            var hour2 = Math.floor((Math.random() * 23));
            var min = createRandomMinute();
            falseAnswer = determineDigToSp(hour2.toString(),min);
            if(falseAnswer!=ans && !choices.includes(falseAnswer)){
                choices.push(falseAnswer);
            }
        }

        shuffleArray(choices);
        say("Now you will hear a time in numbers. Please choose the correct spoken version of this time");
        answer(hour,minute,choices,ans);

        ////////////////////////////////////////////////

    function answer(hour,minute,choices,answer){
        say(hour+"  "+minute);
        say("Use up and down keys to hear the possible answers. When you hear the correct one press left button");
        var selectedChoice;
        document.addEventListener('keydown', ans);
        var cont = false;    
                function ans(e) {
                    switch (e.keyCode) {

                    case 38://up
                        click(buttonUp);
                        if(selectedChoice===3||typeof selectedChoice=="undefined"){
                            selectedChoice=-1;
                        }
                        say(choices[++selectedChoice]);
                        break;
                    case 40://down
                        click(buttonDown);
                        if(selectedChoice===0||typeof selectedChoice=="undefined"){
                            selectedChoice=4;
                        }
                        say(choices[--selectedChoice]);
                        break;
                    case 37://left
                        click(buttonLeft);
                        if (typeof selectedChoice == "undefined") {
                            click(vibration);
                            errorAudio.play();
                            say("You have not made a choice yet. Please click up and down buttons to listen the choices");
                        }else{                           
                            document.removeEventListener('keydown', ans);
                            if(choices[selectedChoice]===answer){
                                correctAudio.play();
                                say("You get this right! Congrats!");
                                score++;
                                cont=true;
                            }else{
                                click(vibration);
                                errorAudio.play();
                                say("You are wrong. It is Okay. You will get it next time");
                                say("The right answer is"+answer);
                                cont=true;
                            }
                            numQuestions++;
                            
                        if(cont){
                        say("click left if you want to continue");
                        say("click right if you want to hear your score and finish");

                        document.removeEventListener('keydown', ans);
                        document.addEventListener('keydown', chooseNext);
                        

                        function chooseNext(e){
                        if(e.keyCode===37){//left
                            click(buttonLeft);
                            document.removeEventListener('keydown', chooseNext);
                            // questionFinished=true;
                            digToSp();
                            
                        }else if(e.keyCode===39){//right
                            click(buttonRight);
                            document.removeEventListener('keydown', chooseNext);
                            tellScore(score,numQuestions);
                            // endTraining=true;
                            // questionFinished=true;
                            endSession();
                            // return;
                        }else{
                            say("Please click up or down");
                            }
                        }

                        }

                        }
                        break;    
                    }
        
                    }
                console.log("before return from Answer");
                
            }

            function tellScore(score,numQuestions){
                say("You have " + score + "correct out of" + numQuestions + "questions");
            }


        ///////////////////////////////////////////////


}
}



function multiplicationApp(){
    say("Welcome to the multiplication table trainer app!");
    var score,numQuestions,endTraining;
    newTraining();
    function newTraining(){
        say("Please choose training mode");
        say("Press up and down buttons to hear the numbers and press left button to choose the number you just heard");

        document.addEventListener('keydown', chooseNumber);
        var numbers = ['1','2','3','4','5','6','7','8','9','10'];
        score=0;
        numQuestions=0;
        endTraining=false;
        questionFinished=true;
        var selectedChoice;
        
        function chooseNumber(e){
            switch(e.keyCode){
                case 38://up
                    click(buttonUp);
                    if(selectedChoice===9||typeof selectedChoice=="undefined"){
                        selectedChoice=-1;
                    }
                    say(numbers[++selectedChoice]);
                    break;
                case 40://down
                    click(buttonDown);
                    if(selectedChoice===0||typeof selectedChoice=="undefined"){
                        selectedChoice=10;
                    }
                    say(numbers[--selectedChoice]);
                    break;
                case 37://left
                    click(buttonLeft);
                    
                    if (typeof selectedChoice == "undefined") {
                        click(vibration);
                        errorAudio.play();
                        say("You have not made a choice yet. Please click up and down buttons to listen the choices");
                    }else{
                        document.removeEventListener('keydown', chooseNumber);
                        say("You chose"+numbers[selectedChoice]);
                        say("Now you will hear the expression. Choose the right answer to it. Click up or down buttons to hear the possible answers. When you hear the correct answer click the left button");                        
                        
                        // while(!endTraining){
                        //     if (questionFinished){
                        //     alert("inside while loop");
                            startTraining(parseInt(numbers[selectedChoice],10));
                        //    }

                            //console.log("the end of while loop but inside");
                        //} 
                           
                        //say("out of while loop already");
                        // if(endTraining){
                        //     endSession();
                        // }
                        break; 
                    }
            }

        }
    }

    function startTraining(num){
        questionFinished=false;
        var num2 = Math.floor((Math.random() * 10) + 1);
        var choices = [];
        var ans = num*num2;
        var falseAnswer;
        choices.push(ans.toString());
        for(var i=0;i<3;i++){
            falseAnswer = Math.floor((Math.random() * 10) + 1) * num;
            if(falseAnswer!=ans && !choices.includes(falseAnswer.toString())){
                choices.push(falseAnswer.toString());
            }
        }
        shuffleArray(choices);
        answer(num,num2,choices,ans);
         console.log("after return from answer. Inside the startTraining");
        return;
    }


    function answer(num,num2,choices,answer){
        say(num+"times"+num2);
        var selectedChoice;
        document.addEventListener('keydown', ans);
        var cont = false;    
                function ans(e) {
                    switch (e.keyCode) {

                    case 38://up
                        click(buttonUp);
                        if(selectedChoice===3||typeof selectedChoice=="undefined"){
                            selectedChoice=-1;
                        }
                        say(choices[++selectedChoice]);
                        break;
                    case 40://down
                        click(buttonDown);
                        if(selectedChoice===0||typeof selectedChoice=="undefined"){
                            selectedChoice=4;
                        }
                        say(choices[--selectedChoice]);
                        break;
                    case 37://left
                        click(buttonLeft);
                        if (typeof selectedChoice == "undefined") {
                            click(vibration);
                            errorAudio.play();
                            say("You have not made a choice yet. Please click up and down buttons to listen the choices");
                        }else{                           
                            document.removeEventListener('keydown', ans);
                            if(parseInt(choices[selectedChoice],10)===answer){
                                correctAudio.play();
                                say("You get this right! Congrats!");
                                score++;
                                cont=true;
                            }else{
                                click(vibration);
                                errorAudio.play();
                                say("You are wrong. It is Okay. You will get it next time");
                                say("The right answer is"+answer);
                                cont=true;
                            }
                            numQuestions++;
                            
                        if(cont){
                        say("click left if you want to continue");
                        say("click right if you want to hear your score and finish");

                        document.removeEventListener('keydown', ans);
                        document.addEventListener('keydown', chooseNext);
                        

                        function chooseNext(e){
                        if(e.keyCode===37){//left
                            click(buttonLeft);
                            document.removeEventListener('keydown', chooseNext);
                            // questionFinished=true;
                            startTraining(num);
                            
                        }else if(e.keyCode===39){//right
                            click(buttonRight);
                            document.removeEventListener('keydown', chooseNext);
                            tellScore(score,numQuestions);
                            // endTraining=true;
                            // questionFinished=true;
                            endSession();
                            // return;
                        }else{
                            say("Please click up or down");
                            }
                        }

                        }

                        }
                        break;    
                    }
        
                    }
                console.log("before return from Answer");
                
            }

            function tellScore(score,numQuestions){
                say("You have " + score + "correct out of" + numQuestions + "questions");
            }

            function endSession(){
                say("If you want to go to the main menu press right button");
                say("If you want to choose another number press left button");

                document.addEventListener("keydown",chooseAction);

                function chooseAction(e){
                    if(e.keyCode===37){
                        click(buttonLeft);
                        document.removeEventListener("keydown",chooseAction);
                        newTraining();
                    }else if(e.keyCode===39){
                        click(buttonRight);
                        document.removeEventListener("keydown",chooseAction);
                        selectTraining();
                    }else{
                        say("Please click left or right");
                    }
                }

            }
    }
function say(m) {
  var msg = new SpeechSynthesisUtterance();
  msg.volume = 1;
  msg.rate = 0.7;
  msg.pitch = 1.5;
  msg.text = m;
  speechSynthesis.speak(msg);
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

