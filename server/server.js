Meteor.startup(function () {
// code to run on server at startup
        return Meteor.methods({

            removeAllRatings: function () {
                console.log("Removing all Ratings.");
                return Ratings.remove({});

            }
        });
});



/* autopublish insecure meteor remove */
/* then have to publish and subscribe */
/* http://docs.meteor.com/#dataandsecurity */