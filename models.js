/**
* Models - exposed to both client and server
*/
Ratings = new Meteor.Collection('ratings');
AverageRatings = new Meteor.Collection('average_ratings');

/* id, user, date, rating */

/* Insert into defined collection

Ratings.insert({name: "Alex", rating: 8, time: Date.now()});
Ratings.insert({name: "Jerry", rating: 7, time: Date.now()});
Ratings.insert({name: "Rad", rating: 9, time: Date.now()});
Ratings.insert({name: "Max", rating: 10, time: Date.now()});

 */

//var output_log = function(message) {
//    console.log(message);
//}
//Date.prototype.yyyymmdd = function() {
//    var yyyy = this.getFullYear().toString();
//    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
//    var dd  = this.getDate().toString();
//    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
//};