// getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

var Alldata;

async function getText() {
  let myObject = await fetch("DbConnection.php");
  let myText = await myObject.text();
  Alldata = JSON.parse(myText);
  
  
}
console.log(Alldata);
getText();



// If start Quiz Button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show the info box 
}

// If Exit Quiz Button Clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //Hide the info box
};

// If Continue Button Clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //Hide the info box
  quiz_box.classList.add("activeQuiz"); //Show the quiz box
  showQuestions(generateRandomQuestion());
  console.log(Alldata);
      queCounter(1);
      startTimer(30);
      startTimerLine(0);
};

var que_count = 0;
var que_numb = 1;
var counter;
var counterLine;
var timeValue = 30;
var widthValue=0;
var userScore= 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box= document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick =()=>{
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  // que_count = 0;
  // usedNumbers = [];
  // // que_numb = 1;
  // timeValue = 30;
  // widthValue=0;
  // userScore = 0;
      showQuestions(generateRandomQuestion());  
      queCounter(que_numb);
      clearInterval(counter);
      startTimer(timeValue);
      clearInterval(counterLine);
      startTimerLine(widthValue);
      next_btn.style.display ="none";
      timeOff.textContent="Time Left";
}
quit_quiz.onclick =()=>{
  window.location.reload();
}

//If Next Button Clicked
next_btn.onclick = () => {
  
  if (que_count < Alldata.length - 1) {
    console.log("index", que_count);
    que_count++;
    que_numb++;
    console.log(que_count);
    showQuestions(generateRandomQuestion());
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
    changeProgress(que_count, Alldata.length);
  } else {
    que_count++;
    changeProgress(que_count, Alldata.length);
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questions completed");
    showResultBox();
  }
    
} 
//Creation of function Random !!
var usedNumbers = [];
var randomNumber;
function generateRandomQuestion() {
  randomNumber = Math.floor(Math.random() * Alldata.length);
  console.log("random", randomNumber);
  if (usedNumbers.includes(randomNumber)) {
    generateRandomQuestion();
  } else {
    usedNumbers.push(randomNumber);
  }
  // console.log(usedNumbers, "array");
  return randomNumber;
}
//getting questions & options from array
countRandom = 1;
let currentQUestion;
function showQuestions(index) {
    currentQUestion = index;
    const que_text = document.querySelector(".que_text");
    let que_tag =
      "<span>" + que_numb + "." + Alldata[index].question + "</span>";
    let option_tag =
      '<div class="option" data-number="1">' +
      Alldata[index].choix1 +
      "<span></span> </div>" +
      '<div class="option" data-number="2">' +
      Alldata[index].choix2 +
      "<span></span> </div>" +
      '<div class="option" data-number="3">' +
      Alldata[index].choix3 +
      "<span></span> </div>" +
      '<div class="option" data-number="4">' +
      Alldata[index].choix4 +
      "<span></span> </div>";
    que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
  countRandom++;
}  
// Correct answer vs user Answer
let tickIcon = '<div class="icon tick"><i class="fa fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  // startTimer(timeValue);
  // let userAns = answer.textContent;
  // console.log(userAns, "userAnswer");
  // console.log(correctAns, "correctAnswer");
  // console.log(correctAns==userAns);
  let userAns = answer.dataset["number"];
  let correctAns = Alldata[currentQUestion].answer;
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    userScore+=1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  }
  else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    // if answers is incorrect then automatically selected the correct answers
    for (let i = 0; i < allOptions; i++){
      if (option_list.children[i].dataset["number"] == correctAns) {
        // console.log(option_list.children[i].dataset["number"] == correctAns);
        option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }
  //Once user selected disabled all options
  for (let i = 0; i< allOptions; i++){
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display ="block";
}
// function of current number of question
function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountTag =
    ' <span style="display: flex;"><p>' +
    index +
    "</p>Of<p>" +
    Alldata.length +
    "</p>Questions</span>";
    console.log(Alldata.length);
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent="Time Off";

      let correctAns = Alldata[que_count].answer;
      console.log(correctAns);
      
      // console.log(correctAns==userAns);
      let allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++){
        if (option_list.children[i].dataset["number"] == correctAns) {
          // console.log(option_list.children[i].dataset["number"] == correctAns);
          option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
      for (let i = 0; i< allOptions; i++){
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display ="block";
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 60);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px" ;
    if (time > 549) {
      clearInterval(counterLine);
      timeCount.textContent = "00";
    }
  }
}

function showResultBox(){
  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_box.classList.remove("activeQuiz");//hide the quiz box
  result_box.classList.add("activeResult");//show the result box
  const scoreText= result_box.querySelector(".score_text");
  if( userScore > 3 ){
    let scoreTag=' <span> and congrats! You got <p>'+ userScore +'</p> out of <p>'+ Alldata.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
    console.log(Alldata.length);
  }
  else if( userScore > 1 ){
    let scoreTag = ` <span> and nice, You got <p>${userScore}</p> out of <p>${Alldata.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  }
  else{
    let scoreTag = `<span> and sorry, You got only <p>${userScore}</p> out of <p>${Alldata.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  }
}
//function of progress bar
let progressDone = document.getElementById("progress-done");
function changeProgress(maxValue, finalValue) {
  progressDone.style.width = `${(maxValue * 100) / finalValue}%`;
  progressDone.innerHTML = `${Number((maxValue * 100) / finalValue)
  }%`;
}

