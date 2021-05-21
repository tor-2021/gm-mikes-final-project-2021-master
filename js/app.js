//Get A reference to your Database

//const { default: firebase } = require("firebase");

//CRUD Create Read Update Delete
$(() => {  // this is a shortcut for document.onload = function() {}




/* *************TIP CALCULATOR *********************/
  let $tipCalculate = $('#calculate');

  function calculateTip() {
    let $bill_Amt = $("#billamt").val();
    let $serQual = $("#serviceQual").val();
    let $totalOfPeople = $("#peopleamt").val();

    //validate input
    // if ($bill_Amt === "" || $serQual == 0 || $totalOfPeople == 0) {
    //   alert("Please enter values");
    //   return;
    // }
    console.log("service", $serQual)
    if ($bill_Amt === "0") {
        alert("Please enter how much was your bill");
        $("#totalTip").removeAttr("style").hide();
       return;
    }else if ($serQual == null ) {
         alert("Select Tip Option");
         $("#totalTip").removeAttr("style").hide();
      return;
    }else if ( $totalOfPeople == "0") {
        alert("How many people are saring the bill");
        $("#totalTip").removeAttr("style").hide();
      return;
    }

    //Calculate tip
    $bill_Amt = Math.round($bill_Amt * 100) / 100;
    $bill_Amt = $bill_Amt.toFixed(2);

    let $totalTip = ($bill_Amt * $serQual);

    //round the percent up to the next largest integer
    $serQualRound = Math.ceil($serQual* 100)+"%";

    //round to two nearest decimal places
    $totalTip = Math.round($totalTip * 100) / 100;
    //Have two digits after decimal point
    $totalTip = $totalTip.toFixed(2);

    let $eachTotal = ($bill_Amt * $serQual) / $totalOfPeople;
    //round to two nearest decimal places
    $eachTotal = Math.round($eachTotal * 100) / 100;
    //Have two digits after decimal point
    $eachTotal = $eachTotal.toFixed(2);

    let $totalwithtip =  +$bill_Amt + +$eachTotal;
 
    let $total_each =   ($bill_Amt / $totalOfPeople);
    $total_each = $total_each.toFixed(2);

    let finalTotal = +$total_each + +$eachTotal;
    finalTotal = finalTotal.toFixed(2);

    console.log(`tip amount ${$totalTip}`);
    console.log(`each tip amount ${$eachTotal}`);
    console.log(`bill amount ${$bill_Amt}`);
    console.log(`$totalwithtip ${$totalwithtip}`);
    console.log(`each person pays with total ${$total_each}`);
    console.log(`final total with tip ${finalTotal}`);

    if ($totalOfPeople === "" || $totalOfPeople <= 1) {
        $totalOfPeople = 1;
        $("#totalTip").removeClass( "totalTipWrap_a" ).addClass( "totalTipWrap_b");
        $("#totalTip").css("display","block");
        $("#subtotal").text(`Bill Subtotal = $${$bill_Amt}`);
        $("#service").text(`${$serQualRound} Tip = $${$totalTip}`);
        $("#finalTotal").text(`Grand total = $${finalTotal}`);

        $("#sharing").removeAttr("style").hide();
        $("#sharingtip").removeAttr("style").hide();
        $("#total_tip").removeAttr("style").hide();
    } else {
        $("#totalTip").removeClass( "totalTipWrap_b" ).addClass( "totalTipWrap_a");
        $("#totalTip").css("display","block");
        $("#subtotal").show();
        $("#service").show();
        $("#sharing").show();
        $("#sharingtip").show();
        $("#total_tip").show();
        $("#finalTotal").show();
        $("#each").show();

        $("#subtotal").text(`Bill Subtotal = $${$bill_Amt}`);
        $("#service").text(`${$serQualRound} Tip = $${$totalTip}`);
        $("#sharing").text(`People sharing: ${$totalOfPeople}`);
        $("#sharingtip").text(`Tip per person = $${$eachTotal}`);
       /// $("#total_tip").text(`Subtotal + Tip sharing with ${$totalOfPeople} people.`);
        $("#finalTotal").text(`Each person pays $${finalTotal}`);
    }
  }
  //Hide the tip amount on load
   $("#totalTip").removeAttr("style").hide();

  //click to call function
  $tipCalculate.on('click', function () {
    calculateTip();
  });
/* *************End TIP CALCULATOR *********************/
 // *****************News API*********************************
 let $newsApiArray4 = [];
 //const newsApiKey = '920337af32494de4bb7af3eb74483884';
 function newsApi() {
   $.get(`https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/top-headlines?country=ca&apiKey=${newsApiKey}`).then((response) => {  
   $newsApiArray4 =  response.articles;
     console.log(" News Api" , $newsApiArray4);  
     let $list = $("#getNewsApi");
     $.each($newsApiArray4, function (index) {
       let url_n = this.url;
       let showTitle = this.title;
       let description = this.description;
       let news = this.source.name;
       let newsPhoto = this.urlToImage;
       let publishedAt = this.publishedAt;
      let fallBackImage = `./images/mineralwater-blueberry.jpg`;
    
      let $getList = $('<li> </li>').addClass('product-item');
      let $showIndex = $(`<div>${index + 1}</div>`).addClass('show-index');
      let $vElement = $('<img>').attr('src', this.urlToImage || fallBackImage).addClass('product-image');
      $getList.append($showIndex)
      .append($vElement); 
      $list.append($getList);
      
         // create up vote element
         let $upVoteElement = $('<i class="fa fa-thumbs-up pull-right"></i>');
         $( ".fa-thumbs-up" ).attr( "title", "Like" );
         $upVoteElement.on('click', function (evt) {
          evt.preventDefault();
          updateDisplay(evt);
          evt.target.focus();
         });
 
         // create down vote element
         let $downVoteElement = $('<i class="fa fa-thumbs-down pull-right"></i><span></span>');
         $( ".fa-thumbs-down" ).attr( "title", "Dislike" );
         $downVoteElement.on('click', function (evt) {
          evt.preventDefault();
         updateDownVote(evt);
        
         });
         let $lftIcon = $('<span class="material-icons">format_color_fill</span>').addClass('vote');

      $lftIcon.on('click', function () {
        var fontColors = [ '#9aa0a6', '#ffffff' ];
        fontColors.reverse();
        var font_random_colors = fontColors[Math.floor(Math.random() * fontColors.length)];
        var bgColors = [ '#202124', '#3f51b5', '#673ab7', '#6200ee' ];
        var bg_random_color = bgColors[Math.floor(Math.random() * bgColors.length)];
        $("header, .product-name, .show-vote, .show-index").css({backgroundColor: bg_random_color, color: font_random_colors});
      });
      
      function updateDownVote(evt){
        let $count_down = 1;
       let current_count = $count_down++;
        if (!$count_down) {
          alert("Hey, Down Vote not working");
        } else { 
         $(evt.target).text(`${current_count}`);
         evt.target.focus();
        }
       console.log('counter', current_count)
       }

      function updateDisplay(evt){
        let $count_up = 1; 
        let current_count = $count_up++;
        if (!$count_up) {
          alert("Hey, Like vote not working");
        } else {
          $(evt.target).text(`${current_count}`);
          evt.target.focus();
        }
        console.log('counter', current_count)
       };

   
      let $getDescription = $(`<section>   
      <article class="first-row"><div>${index + 1}</div><div>${news}</div></article>
      <p>${description}</p>
      <a href="${url_n}" class="readMore" target="_blank">Read more</a>
      </section>`).addClass('product-name');
      $getList.append($getDescription);  

      let $rateRow = $(`<div"></div>`).addClass('show-vote');
      $( ".vote" ).attr( "title", "Change Theme");

      $getList.append($rateRow); 
      $rateRow.append($lftIcon)
      .append($upVoteElement)
      .append($downVoteElement)
     });

   });
  }
  newsApi();
  /*************** newsAPI end ****************** */

  /*************** firebase start ****************** */
   // mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));

   var messageAppReference = firebase.database();
   console.log(messageAppReference);

   const $messageBoard = $('.message-board');
   
//Create with Firebase 
$('#message-form').submit(function (event) {
 if (event.target.matches('button')) {
   event.target.focus()
 }
 // by default a form submit reloads the DOM which will subsequently reload all our JS
 // to avoid this we preventDefault()
 event.preventDefault();
 
 // grab user message input
 var message = $('#message').val();
 if (message === "") {
   alert("Please enter Message");
   return;
 }
 // clear message input (for UX purposes)
 $('#message').val('');

 // create a section for messages data in your db
 var messagesReference = messageAppReference.ref('messages');

 // use the set method to save data to the messages
 messagesReference.push({
   message: message,
   votes: 0,
 });
});

(function getFanMessages() {
   // use reference to app database to listen for changes in messages data
   messageAppReference.ref('messages').on('value', function (results) {
     const allMessages = results.val();
     const messages = [];
     // iterate through results coming from database call; messages
     for (let msg in allMessages) {
       // get method is supposed to represent HTTP GET method
       let message = allMessages[msg].message;
       let $numOfVotes = allMessages[msg].votes;
       // create message element
       let $messageListElement = $('<li></li>');
       // create delete element
       
       let $deleteElement = $('<i class="fa fa-trash pull-right delete"></i>');
       $deleteElement.on('click', function (e) {
         var deleteMsg = confirm("Want to delete?");
            if (deleteMsg == true) 
            {
              let id = $(e.target.parentNode).data('id');
              deleteMessage(id);
              return true;
            } else {
              return false;
            }
       });
       // create up vote element
       let $upVoteElement = $('<i class="fa fa-thumbs-up pull-right"></i>');
       $upVoteElement.on('click', function (e) {
         let id = $(e.target.parentNode).data('id');
         updateMessage(id, ++$numOfVotes);
       });

       // create down vote element
       let $downVoteElement = $('<i class="fa fa-thumbs-down pull-right"></i>');
       $downVoteElement.on('click', function (e) {
         // console.log('down clicked', numOfVotes);
         let id = $(e.target.parentNode).data('id');
         updateMessage(id, --$numOfVotes);
       });

       // add id as data attribute so we can refer to later for updating
       $messageListElement
       .attr('data-id', msg) // add id as data attribute so we can refer to later for updating
       .html(message) // add message to li
       .append($deleteElement) // add delete element
       .append($upVoteElement) // add voting elements increase
       .append($downVoteElement) // add voting elements decrease
       .append( // show votes
               '<div class="pull-right">' + $numOfVotes + '</div>'
               );
       // push element to array of messages
       messages.push($messageListElement);
     }

     // remove lis to avoid dupes
     $messageBoard.empty();
     for (let i in messages) {
       $messageBoard.append(messages[i]);
     }

});

//Update with Firebase
function updateMessage(id, votes) {
 // find message whose objectId is equal to the id we're searching with
 var messageReference = messageAppReference.ref('messages/' + id);

 // update votes property
 messageReference.update({ votes });
}

//Delete with Firebase
function deleteMessage(id) {
 // find message whose objectId is equal to the id we're searching with
 var messageReference = messageAppReference.ref('messages/' + id);

 messageReference.remove();
}
})();
/* ************** end firebase comments **************/
});


