let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;
function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;
            
             createBullet(qCount) ;
             
    addQuestion(questionsObject[currentIndex],qCount);
countdown(5,qCount);

            submitButton.onclick= ()=> {
            let correctAnswer = questionsObject[currentIndex].right_answer ;
            
            currentIndex++
            selectAnswer(correctAnswer)
            quizArea.innerHTML =""
            answersArea.innerHTML =""
            addQuestion(questionsObject[currentIndex],qCount);
clearInterval(countdownInterval)
countdown(5,qCount);

            

handleBullets() 
showResults(qCount)

}  

            


    }
};

myRequest.open("GET", "questions.json", true);
myRequest.send();
}
getQuestions()

function createBullet(qCount){
    countSpan.innerHTML = qCount;
    for(let i=0; i< qCount ;i++){
        let theBullet = document.createElement('span');
        if (i === 0) {
            theBullet.className = "on";
    }

        bulletsSpanContainer.appendChild(theBullet);
    }
}

function addQuestion(object, count) {
    if(currentIndex< count){
        let question = document.createElement("h2");
        question = document.createTextNode(object.title);
        quizArea.appendChild(question);


        for(let j=1 ;j<=4;j++){
            let main = document.createElement("div");
            main.className= "answer"

            let label = document.createElement("label");
            let labelTxt=document.createTextNode(object[`answer_${j}`]);
            label.htmlFor= `answer_${j}` ;
            label.dataset = "for" ;

            let input = document.createElement("input");
            input.type = "radio" ;
            input.name = "question" ;
            input.dataset.id = `answer_${j}` ;
            input.dataset.answer = object[`answer_${j}`] ;
            


            label.appendChild(labelTxt)

            main.appendChild(input)
            main.appendChild(label)

            answersArea.appendChild(main);
            
        }}}

function selectAnswer(rAnsewr){
    let answers = document.getElementsByName("question") ;
    let correctAnswer ;
    for(let i=0 ; i<answers.length ;i++){
        if(answers[i].checked){
            correctAnswer=answers[i].dataset.answer
        }
        }

        if(correctAnswer === rAnsewr){
            rightAnswers++ ;
        }
        

    }
function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);


  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
    console.log(arrayOfSpans)
    console.log(span)
    console.log(index)
  })



}

function showResults(count){
    let theResults;
    if(currentIndex === count){
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
        theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
        theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
}
  }
function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}