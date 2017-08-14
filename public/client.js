$(document).ready(function () {
    console.log('jquery');
    getMessages();
    $('#addTaskButton').on('click', function () {
        console.log('botton clicked');
        var taskInput = $('#taskInput').val();
        var inputObject = {
            task: taskInput
        };//end of input object
        $.ajax({
            method: 'POST',
            url: '/toDo',
            data: inputObject,
            success: function (response) {
                console.log(response);
                getMessages();
            }//end of ajax object
        });//endof ajax

    });//end of clickadd button


    $('#messageContainer').on('click', '.completeButton', function () {
        console.log('completedly clickity');

        //changeMessageColor();
        var messageId = $(this).parent().data().id; // a number 
        //var newMessage = $(this).siblings('input').val(); // a string
        console.log('message id is', messageId);
        //console.log('message text is', newMessage);
        //var messageUpdate = {
        //message: newMessage
        //};
        changeMessageColor();
        $.ajax({
            method: 'PUT',
            url: '/toDo/' + messageId, // will end up as something like /message/3  +messageId to get the number when it works
            success: function (response) {
                getMessages();
                changeMessageColor();
            }
        })
    });//end of complete click

    //delete ajax
$('#messageContainer').on('click', '.deleteButton', function () {
        console.log('deleted clickity');

        //changeMessageColor();
        var messageId = $(this).data().id; // a number 
      
        $.ajax({
            method: 'DELETE',
            url: '/toDo/' + messageId, // will end up as something like /message/3  +messageId to get the number when it works
            success: function (response) {
                getMessages();
               
            }
        })
    });//end of complete click

    //end of delete ajax




});//end of doc.ready


function getMessages() {
    $.ajax({
        method: 'GET',
        url: '/toDo',
        success: function (response) {
            console.log(response);
            drawMessage(response);
        }
    })
};






function drawMessage(toDoArray) {
    $('#messageContainer').empty(); // clears all messages currently on DOM

    // Loops through all messages from the database
    for (var i = 0; i < toDoArray.length; i++) {
        var message = toDoArray[i]; // grabs a single message from the array
        var $messageDiv = $('<div></div>'); // creating new empty div
        $messageDiv.data('id', message.id); // adding id from SQL to the new empty div
        // $messageDiv.data(); // this would return {id: 4}
        $messageDiv.append('<div class="Task">' + message.task + '</div>'); // adding the user's name to the empty div
        var $messageDivInput = $('<input class="message">'); // creating new empty input
        $messageDivInput.val(message.task); // this adds our message from SQL to our input
        $messageDiv.append($messageDivInput); // this adds our input, with our message, to the parent div
        $messageDiv.append('<button class="completeButton">complete</button>'); // this adds our save button to the parent div
        $messageDiv.append('<button class="deleteButton">Delete</button>'); // this adds our save button to the parent div
        $('#messageContainer').prepend($messageDiv); // adds the entire new div to the DOM
    }
}//end of drawmessage


//function for changing color
function changeMessageColor() {
    $('body').on('click', '.completeButton', function () {
        $(this).css("color", "green");
    })
}

