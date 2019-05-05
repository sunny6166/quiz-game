window.onload = function () {
    var questionArea = document.getElementsByClassName('questions')[0]
         stage = document.getElementById('stage'),
        answerArea   = document.getElementsByClassName('answers')[0]
        checker      = document.getElementsByClassName('checker')[0]
        current      =0
        score = document.getElementsByClassName("score")
        scoreSpan = score[0].getElementsByTagName('span')
        actualScore =0
        scoreSpan[0].innerHTML = actualScore;
        rightAnswer = new Audio('http://f5361a5c08a4c03f7c6f-acbeb9602bd0a56bf9c1a6bed3d8280b.r27.cf2.rackcdn.com/RightSound2%202.mp3'),
        wrongAnswer = new Audio('http://f5361a5c08a4c03f7c6f-acbeb9602bd0a56bf9c1a6bed3d8280b.r27.cf2.rackcdn.com/wrongSound2.mp3'),

    
       // An object that holds all the questions 
       // In the array last digit gives the right answer position
       allQuestions = {

        'Which is the biggest country of the World? ' : ['Russia', 'America', 'Canada','China', 0],
        'Which is the biggest country by population?' : ['Canada','India','China','Brazil', 2],
        'Capital of Natherland ?' : ['Amsterdam','Rotterdam','The Hague','Brussels',0],
        'Capital of France? ' : ['Paris', 'nantes', 'Nice','Rotters', 0],
        'Capital of Belgium? ' : ['Frankfurt', 'nantes', 'Brussels','Rotters', 2],
        'Capital of America? ' : ['New York', 'Toronto', 'Washington','Florida', 2],
         'Biggest Continent of World?' : ['Africa','Asia','Austrailia','euorpe', 1]
      };
      
          
        
        
    function loadQuestion(curr) {
    // This function loads all the question into the questionArea
    // It grabs the current question based on the current variable
    
      var question = Object.keys(allQuestions)[curr];
      
      questionArea.innerHTML = '';
      questionArea.innerHTML = question;    
    }
    
    function loadAnswers(curr) {
    // This function loads all the possible answers of the given question
    // It grabs the needed answer-array with the help of the current-variable
    // Every answecheckAnswerr is added with an 'onclick'-function
    
      var answers = allQuestions[Object.keys(allQuestions)[curr]];
      
      answerArea.innerHTML = '';
      
      for (var i = 0; i < answers.length -1; i += 1) {
        var createDiv = document.createElement('div'),
            text = document.createTextNode(answers[i]);
        
        createDiv.appendChild(text);      
        createDiv.addEventListener("click", checkAnswer(i, answers));
        
        
        answerArea.appendChild(createDiv);
      }
    }
    function checkAnswer(i, arr) {
      // This is the function that will run, when clicked on one of the answers
      // Check if givenAnswer is same as the correct one
      // After this, check if it's the last question:
      // If it is: empty the answerArea and let them know it's done.

      return function () {
        //var answer = arr[arr.length-1]
        //var answerText = document.getElementById('answer-text')
        //answerText
        var givenAnswer = i,
            correctAnswer = arr[arr.length-1];
        
        if (givenAnswer === correctAnswer) {
          addChecker(true);     
          actualScore += 10;
          rightAnswer.play();
      scoreSpan[0].textContent = actualScore;        
        } else {
          addChecker(false);
          wrongAnswer.play();
      
      //scoreSpan[0].textContent = actualScore;                        
        }
        
        if (current < Object.keys(allQuestions).length -1) {
          current += 1;
          
          loadQuestion(current);
          loadAnswers(current);
        } else {
          questionArea.innerHTML = 'Quiz Over';
          answerArea.innerHTML = '';
        }
                                
      };
    }
    
    function addChecker(chek) {
    // This function adds a div element to the page
    // Used to see if it was correct or false
    
      var createDiv = document.createElement('div'),
          txt       = document.createTextNode(current + 1);
      
      createDiv.appendChild(txt);
      
      if (chek) {
        
        createDiv.className += 'correct';
        checker.appendChild(createDiv);
      } else {
        createDiv.className += 'false';
        checker.appendChild(createDiv);
      }
    }
    
    
    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);
    
  };