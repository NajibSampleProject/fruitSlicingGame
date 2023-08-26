// This is the logic of the game that needs to be followed 
// click on start/reset button 
  //are we playing
    // yes
      // reload page
    // no
      // show trials left
      // change button text to reset game

      // 1. create a random fruits
      // define a random speed
      // 2.move the fruit down one step in loop every 30 seconds
          // is fruits too low
              // no repeat no 2
              // yes --> any trials left
                  // yes: repeat no.1
                  // no: show game over
                  // button text to start game

                  
// slice the fruits **** After first page executed 
    // play sound
    // explode fruit




    // variable change mode
    var playing = false;

    // variable score 
    var score = 0;

    // variable life left (trailsleft)
    var trialsLeft;
    var step;
    var action; //used for setInterval

    // Array of fruits to choose randomly
    var fruits = ['apricot','apple', 'blueberries', 'cherry', 'grapes', 'kiwi', 'orange', 'pear', 'watermelon', 'avocado', 'banana', 'blackberry', 'cabbage', 'cantaloupe', 'carrot', 'chilli', 'coconut', 'corn', 'cucumber', 'durian', 'fig', 'grapes', 'lemon', 'lychee', 'mango', 'mushroom', 'olive', 'onion', 'orange', 'orange1', 'papaya', 'pepper', 'pinapple', 'pom','pumpkin', 'raspberry', 'strawberry', 'tomato'];

    $(function(){
      $("#startreset").click(function(){

        // check if we are playing
        if(playing == true){

           // reolad the page
          location.reload();
        } else {

          // changing the mode of game to true
          playing = true;

          // set scoore to 0
          $("#scorevalue").html(score);

          // show the trialleft box appear
          $("#trialsleft").show();

          // heart/life left
          trialsLeft = 3;

          // add hearts functions
          addheart();

          // hide gameover box
          $("#gameover").hide();

          // changeg button text to resetgame

          $("#startreset").html("Reset Game");

          // begin sending fruits down the screen
          startAction();



        }
      })


       // fruit slice 
    $("#fruit1").mouseover(function(){

      // increse score by 1
      score++;

      // update the score box in game
      $("#scorevalue").html(score);

      // playing sound as mouseover 
      $("#sliceSound")[0].play();


      // stop fruits going further down and hide
      clearInterval(action);

      // hide  fruits 
      $("#fruit1").hide("explode", 500);

      // send new fruits 
      setTimeout(startAction,500);
       
    })
  


    // some repeated functions
    function addheart(){
      $("#trialsleft").empty();
      for(i=0; i < trialsLeft; i++){
        $("#trialsleft").append('<img src="cartoon images/heart.png" class="life">');
      }
    }


   
      // javascript solutions (temporarily)
    for (var i=0; i<fruits.length; i++){
      var randomIndex = Math.floor(Math.random() * fruits.length - 1) + 1;
      console.log("random index is: "+randomIndex);
    }


    // random fruits (buggy should be fixed later on!!!)
    function chooseFruit(){
      $("#fruit1").attr('src', 'cartoon images/' +fruits[Math.round([20*Math.random()])]+ '.png');
      console.log("The fruits is: "+fruits[Math.round([fruits.length*Math.random()])+1]);

      if($("#fruit1").attr('src', 'cartoon images/' +fruits[Math.round([20*Math.random()])]+ '.png') === $("#fruit1").attr('src', 'cartoon images/' +fruits[Math.round([37*Math.random()]+1)]+ '.png')) {
        $("#fruit1").attr('src', 'cartoon images/' +fruits[Math.round([20*Math.random()])]+ '.png');
      console.log("The fruits is: "+fruits[Math.round([20*Math.random()])]);

      }
    }


  


    // function to stop dropping fruits 
    function stopAction(){
      clearInterval(action);
      $("#fruit1").hide();
      $("#trialsleft").hide();
    }


    // generate fruits
    function startAction(){
      $("#fruit1").show();
      chooseFruit(); //choose random fruits
      $("#fruit1").css({
        'left': Math.round(700*Math.random()), 'top': -70    //random position from left 
      });

      // generate a random step for moving the fruits
      step = Math.round(5*Math.random()+1);

      // every 10-15 ms move the fruits down 
      action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        // check if the fruits is too low? 
        if($("#fruit1").position().top > $("#fruitContainers").height()){
            
            // check if any life/trials left?
            if(trialsLeft > 1){
              $("#fruit1").show();
              chooseFruit(); //choose random fruits
              $("#fruit1").css({
                'left': Math.round(700*Math.random()), 'top': -70    //random position from left 
              });

              // reduce the no of heart /life 
              trialsLeft --;

              // populate life left 
              addheart()
            }else{
             
              // Playing mode false
              playing = false;
              if(playing == false){
                $("#gameoverSound")[0].play();
              }
              // Update the reset game to Start Game
              $("startreset").html("Start Game");
              
               // show game over
              $("#gameover").show();

              $("#gameover").html('<p>Game Over!</p><p>Your Score is '+score+'</p>');
              
              stopAction();
            }
        }
      }, 10)
    }




  });