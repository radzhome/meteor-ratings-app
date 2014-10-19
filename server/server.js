Meteor.publish("theRatings", function(){
    return Ratings.find(); //({}, { sort: { rating: -1 }});
});

Meteor.publish("theAverageRatings", function(){
    return AverageRatings.find(); //({}, { sort: { time: -1 }});
});

/*Meteor.publish("theSomeCollection", function(){
    return SomeCollection.find();
});*/


Meteor.startup(function () { // code to run on server at startup
        //Ratings.remove({}); // remove all ratings on reload
        return Meteor.methods({

            removeAllRatings: function () {
                console.log("Removing all Ratings.");
                return Ratings.remove({});

            },
            removeAllAverageRatings: function () {
                //console.log("Removing all Average Ratings.");
                return AverageRatings.remove({});

            }
        });
});


/* autopublish insecure meteor remove */
/* then have to publish and subscribe */
/* http://docs.meteor.com/#dataandsecurity */

// project structure http://andrewscala.com/meteor/
