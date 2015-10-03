Template.messages.helpers({
messages: Messages.find()
});

//Footer keypress
Template.footer.events({
  /*'keypress input': function(e) {
    var inputVal = $('.input-box_text').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
        Messages.insert({text: $('.input-box_text').val()});
        $('.input-box_text').val("");
        return false;
      }    
    }
  }*/
  'submit .input-box-form': function(e){ 
	  e.preventDefault();
	  var inputVal = $('.input-box_text').val();
	  if(inputVal != ""){
		  Messages.insert({
			  text:inputVal,
			  users: Meteor.userId(),
			  timeStamp:Date.now(),
			
		  });
		   $(".input-box_text").val("")
	  }
	
  }
});


//Account UI Config

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

//Template for displaying Username & Timesamp

Template.registerHelper("usernameFromId", function (userId) {

    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }

    return user.username;
});

Template.registerHelper("timestampToTime", function (timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

//Client subscribe
Meteor.subscribe('messages');
Meteor.subscribe('allUsernames');

Messages.allow({
  insert: function (userId, doc) {
    return true;
  }
});



