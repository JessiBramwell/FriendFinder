// Dependencies
const friendsData = require('../data/friends.js');

// Routing
module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  app.post('/api/friends', function (req, res) {
    var index;

    // compair(friendsData, req.body)


    // friendsData.push(req.body);
    // res.json(friendsData[index]);
    // console.log(friendsData[index]);

    // Collects computed scores for each user
    var friendsScoreArr = [];

    friendsData.forEach((friend) => {
      // Collects the difference between each question
      var compairArr = []
      // Stores the total difference
      var rating = 0;

      for (let i = 0; i < 10; i++) {
        var difference = parseInt(friend.scores[i]) - parseInt(req.body.scores[i]);
        compairArr.push(difference)
      }

      compairArr.forEach((x) => { rating += Math.abs(x) });
      friendsScoreArr.push(rating)
    });

    // Finds the index of the lowest score    
    index = friendsScoreArr.indexOf(Math.min(...friendsScoreArr));
    result = friendsScoreArr[index]

    // Calculate compatibility and add key/value par to user object
    friendsData[index].compatibility = 100 - (result * 2.5);

    // Adds the new user to the data
    friendsData.push(req.body);

    // returns the match at the correct index to the html
    res.json(friendsData[index]);
  });
}

// function compair(arr, user) {
//   var friendsScoreArr = [];

//   arr.forEach((friend) => {
//     var compairArr = []
//     var rating = 0;

//     for (let i = 0; i < 10; i++) {
//       var difference = parseInt(friend.scores[i]) - parseInt(user.scores[i]);
//       compairArr.push(difference)
//     }

//     compairArr.forEach((x) => { rating += Math.abs(x) });
//     friendsScoreArr.push(rating)
//   });

//   index = friendsScoreArr.indexOf(Math.min(...friendsScoreArr));

//   console.log(friendsScoreArr);
//   console.log(index);
//   return index;
// }
