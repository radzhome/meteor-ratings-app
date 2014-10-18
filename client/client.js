/**
 * Templates- Template.template_name.template_var_name
 */

var DateFormats = {
       short: "MMMM DD YYYY",
       long: "dddd MM.DD.YYYY HH:mm"
};

UI.registerHelper("formatDate", function(datetime, format) {
  if (moment) {  // Installed moment, meteor add mrt:moment
    var f = DateFormats[format];
    return moment(datetime).format(f);
  }
  else {
    return datetime;
  }
});

Template.greeting.helpers({
    todays_date: function (){
        return Date.now(); //new Date();
        //return d.toISOString();
    }
});

Template.ratings.helpers({

    ratings: function () {

        return Ratings.find({}, { sort: { rating: -1 }});

    },
    averages: function () {

        var count = Ratings.find().count();
        var sum = 0;
        var mid_index = parseInt(count/ 2)
        var mid = 0
        //var time = null
        if (count > 0) {


            Ratings.find({}).forEach(
                function (doc) {

                    sum += parseInt(doc.rating);
                }
            );

            if (count % 2 == 0) { //even

                //console.clear()
                console.log("even number")
                var sum_mids = 0;
                Ratings.find({}, { sort: { rating: 1 }, skip: mid_index - 1, limit: 2}).forEach(
                    function (doc) {
                        sum_mids += parseInt(doc.rating);
                    }
                );
                mid = sum_mids / 2

            }
            else { //odd

                var doc = Ratings.find({}, { sort: { rating: 1 }, skip: mid_index, limit: 1}).fetch()[0];
                //console.clear()
                mid = doc.rating;
                //time = doc.time

            }
            return [parseFloat(sum / count).toFixed(2), count, parseFloat(mid).toFixed(2)]
        }
        else{
            return null
        }
    },
//    median: function () {
//        var count = Ratings.find().count()
//        var mid_index = parseInt(count/ 2)
//        //mid value
//        if (count % 2 == 0) { //even
//            console.clear()
//            console.log("even number")
//            //var two_mids = Ratings.find({}, { sort: { rating: 1 }, skip: mid_index, limit: 2});
//            var sum_mids = 0;
//            Ratings.find({}, { sort: { rating: 1 }, skip: mid_index-1, limit: 2}).forEach(
//               function(doc){
//                   sum_mids += parseInt(doc.rating);
//               }
//            );
//            return sum_mids/2
//        }
//        else{ //odd
//            var result =  Ratings.find({}, { sort: { rating: 1 }, skip: mid_index, limit: 1}).fetch()[0];
//            console.clear()
//            return result.rating;
//        }
//    },
//    counter: function () {
//      return Session.get("counter");
//    }
});

//Template.ratings.avg = function() {
//    //;
////    Ratings.find({}, {transform: function(doc) {
////        var total_points = 0;
////        var rating = doc.rating; //[1] Second in array
////        for(point in people) {
////            total_points += people[point]
////        }
////
////        doc.rating = total_points;
////        return doc.rating;
////    }});
//    var sum = 0;
//    Ratings.find({}).forEach(
//        function (doc) { sum += parseInt(doc.rating); }
//    );
//    return sum / Ratings.find().count()
//}

//Template.ratings.midpt = function () {
//    var mid_index = parseInt(Ratings.find().count() / 2 - 1)
//    //mid value
//    return Ratings.find({}, { sort: { rating: 1 }, skip: mid_index, limit: 1});
//}

Template.ratings.events({
    'click button.delete-all': function () {
        // increment the counter when button is clicked
        //Session.set("counter", Session.get("counter") + 1);
        //Ratings.remove({}) // Will not work, access denied, have to go by id
        Meteor.call('removeAllRatings')
    },
    'click button.save': function () {
        // increment the counter when button is clicked
        //Session.set("counter", Session.get("counter") + 1);
        //Ratings.remove({}) // Will not work, access denied, have to go by id
        Meteor.call('removeAllRatings')
    },
    'click div.rating': function(event){
        console.log('Removed rating id', event.currentTarget.id)
        /*console.log(event.target.id)*/
        Ratings.remove({'_id': event.currentTarget.id })
    }
});


Template.input.events = {
    'keydown input#rating': function (event) {
        if (event.which == 13) { // 13 is the enter key event
            var name = document.getElementById('name');
            var rating = document.getElementById('rating');

            if (rating.value != '' && rating.value <= 10 && rating.value >= 0){
                if (name.value != '') {
                    document.getElementById('name').focus();
                }
                else{
                    name.value = 'Anon'
                }
                Ratings.insert({
                    name: name.value,
                    rating: rating.value,
                    time: Date.now()
                });

                document.getElementById('rating').value = '';
                rating.value = '';
                document.getElementById('name').value = '';
                name.value = '';

            }
        }
    }
}