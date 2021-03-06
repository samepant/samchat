var config = require('./config');
var mongoose = require('mongoose');
var Message = require('./messageModel.js');

//connect to mongoose
mongoose.connect(config.mongoURI, function(err) {
  if(err) {
      console.log('connection error', err);
  } else {
      console.log('connection successful');
      seedDatabase();      
  }
});

var dumbData = [
  {
    username: 'test1',
    message: 'test1 2015 1 1',
    created: new Date(2015, 1, 1),
    isLog: false
  },
  {
    username: 'test2',
    message: 'test2 2015 1 2',
    created: new Date(2015, 1, 2),
    isLog: false
  },
  {
    username: 'test3',
    message: 'test3 2015 1 3',
    created: new Date(2015, 1, 3),
    isLog: false
  },
  {
    username: 'test4',
    message: 'test4 2015 1 4',
    created: new Date(2015, 1, 4),
    isLog: false
  },
  {
    username: 'test5',
    message: 'test5 2015 1 5',
    created: new Date(2015, 1, 5),
    isLog: false
  },
  {
    username: 'test6',
    message: 'test6 2015 1 6',
    created: new Date(2015, 1, 6),
    isLog: false
  },
  {
    username: 'test7',
    message: 'test7 2015 1 7',
    created: new Date(2015, 1, 7),
    isLog: false
  },
  {
    username: 'test8',
    message: 'test8 2015 1 8',
    created: new Date(2015, 1, 8),
    isLog: false
  },
  {
    username: 'test9',
    message: 'test9 2015 1 9',
    created: new Date(2015, 1, 9),
    isLog: false
  },
  {
    username: 'test10',
    message: 'test10 2015 1 10',
    created: new Date(2015, 1, 10),
    isLog: false
  },
  {
    username: 'test11',
    message: 'test11 2015 1 11',
    created: new Date(2015, 1, 11),
    isLog: false
  },
  {
    username: 'test12',
    message: 'test12 2015 1 12',
    created: new Date(2015, 1, 12),
    isLog: false
  },
  {
    username: 'test13',
    message: 'test13 2015 1 13',
    created: new Date(2015, 1, 13),
    isLog: false
  },
  {
    username: 'test14',
    message: 'test14 2015 1 14',
    created: new Date(2015, 1, 14),
    isLog: false
  },
];

function seedDatabase () {
  for (var i = 0; i < dumbData.length; i++) {
    var newMessage = new Message(dumbData[i]);
    newMessage.save(function (err, savedMessage) {
      if (err) {
        console.log(err);
      } else {
        console.log(savedMessage);
      }
    });
  }
}



