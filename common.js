/**
* Models - exposed to both client and server
*/
Ratings = new Meteor.Collection('ratings');
AverageRatings = new Meteor.Collection('average_ratings');
//SomeCollection = new Meteor.Collection('some_collection');

Ratings.allow({
    'insert': function (userId, doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    },
    'remove': function (userID, doc){
        return true;
    }
});

AverageRatings.allow({
    'insert': function (userId, doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    },
    'remove': function (userID, doc){
        return true;
    }
});


/* id, user, date, rating */

/* Insert into defined collection

Ratings.insert({"name": "Alex", rating: 8, time: Date.now()});
Ratings.insert({name: "Jerry", rating: 7, time: Date.now()});
Ratings.insert({name: "Rad", rating: 9, time: Date.now()});
Ratings.insert({name: "Max", rating: 10, time: Date.now()});


AverageRatings.insert({ "time": Date.now(), "average": 8.5, "median": 7.4, "count": 15 });

SomeCollection.insert({title: "Get Something for free now!", draft: false});
SomeCollection.insert({title: "Get Something for free now$$!", draft: true});
 */
