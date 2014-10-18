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

Meteor.publish("theRatings", function(){
    Ratings.find(); //({}, { sort: { rating: -1 }});
});

Meteor.publish("theAverageRatings", function(){
    AverageRatings.find(); //({}, { sort: { time: -1 }});
});

/* autopublish insecure meteor remove */
/* then have to publish and subscribe */
/* http://docs.meteor.com/#dataandsecurity */

// project structure http://andrewscala.com/meteor/
