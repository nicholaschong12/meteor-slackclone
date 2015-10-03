/*Meteor.methods({
  newMessage: function (message) {
    message.timestamp = Date.now();
    message.user = Meteor.userId();
    Messages.insert(message);
  }
})*/

Messages.allow({
  insert: function (userId, doc) {
    return true;
  }
});