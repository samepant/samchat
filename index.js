// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var sms = require('./sendsms.js');
var config = require('./config');
var mongoose = require('mongoose');
var Message = require('./messageModel.js');
var moment = require('moment-timezone');

//connect to mongoose
mongoose.connect(config.mongoURI, function(err) {
  if(err) {
      console.log('connection error', err);
  } else {
      console.log('connection successful');   
  }
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

var numUsers = 0;
var samLoggedIn = false;
var passwordForSam = config.passwordForSam;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {

    // save message to database and send to everyone
    var newMessage = new Message( {
      username: socket.username,
      message: data.message,
      created: data.created
    });

    newMessage.save(function (err, msg) {
      if (err) {
        console.log(err);
      } else {
        var formattedTime = moment(data.created);
        socket.broadcast.emit('new message', {
          username: socket.username,
          message: data.message,
          created: formattedTime.tz('America/Los_Angeles').format()
        });
        if (!samLoggedIn) {
          sms.sendSamAlert(socket.username, data);
        } 
      }
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    //login as sam if the password was used
    if (username === passwordForSam) {
      username = 'sam';
      samLoggedIn = true;
    }

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
    if (!samLoggedIn) {
      sms.sendSamAlert(socket.username);
    }
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the client wants older messages 
  socket.on('wantsOlderMessages', function(timeStamp) {
    var eldestTime = timeStamp;
    
    //search database for messages older than the input timestamp
    Message.find({created: {$lt: new Date(eldestTime)}}).sort('-created').exec(function (err, messages) {
      if (err) {
        console.log(err);
      } else {
        socket.emit('getsOlderMessages', messages);
      }
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });

      if (socket.username === 'sam') {
        samLoggedIn = false;
      }
    }
  });
});