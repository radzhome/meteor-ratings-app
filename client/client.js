/**
 * Templates- Template.template_name.template_var_name
 */

Meteor.subscribe("theRatings");
Meteor.subscribe("theAverageRatings");
//Meteor.subscribe("theSomeCollection");

var DateFormats = {
       short: "MMMM DD YYYY",
       long: "dddd MM.DD.YYYY HH:mm",
       standard: "YYYY-MM-DD" //%Y-%m-%d
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
    }
});

Template.ratings.helpers({
    ratings: function () {
        return Ratings.find({}, { sort: { rating: -1 }});
    }
});

Template.historic_ratings.helpers({
    historic_ratings: function (){
        return AverageRatings.find({}, { sort: { time: -1}});
    },
    generate_script: function(){

        var ratings = AverageRatings.find({}, { sort: { time: -1}});
        var dates = "['x', "
        var f = DateFormats['standard'];

        ratings.forEach(function(doc){
           dates +=  "'" + moment(doc.time).format('YYYY-MM-DD') + "'"
           dates += ","
        });
        dates += "]"
        console.log(dates)
        var script_string = "var chart = c3.generate({ bindto: '#chart'," +
            "data: {x: 'x'," +
            "  columns: [" +
                 "['x', '2014-10-18', ]" + "," +
                 //                 dates + "," +
                 "['data1', 30, ]," +
                 "['data2', 130, ]" +
            " ]" +
            "},axis: { x: { type: 'timeseries',  tick: { format: '%Y-%m-%d'}}}});"



    //                                    setTimeout(function () {
    //                                        chart.load({
    //                                            columns: [
    //                                                ['data3', 400, 500, 450, 700, 600, 500]
    //                                            ]
    //                                        });
    //                                    }, 1000);

        return new Handlebars.SafeString(script_string)
    }
});

Template.input_buttons.helpers({
    averages: function () {
        var count = Ratings.find().count();
        var sum = 0;
        var mid_index = parseInt(count/ 2)
        var mid = 0
        if (count > 0) {
            Ratings.find({}).forEach(
                function (doc) {
                    sum += parseInt(doc.rating);
                }
            );
            if (count % 2 == 0) { //even
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
                mid = doc.rating;
            }
            return [parseFloat(sum / count).toFixed(2), count, parseFloat(mid).toFixed(2)]
        }
        else{
            return null
        }
    }
});

Template.ratings.events({
    'click div.rating': function(event){
        console.log('Removed rating id', event.currentTarget.id)
        Ratings.remove({'_id': event.currentTarget.id })
    }
});

Template.historic_ratings.events({
    'click tr.historic-rating': function(event){
        console.log('Removed rating id', event.currentTarget.id)
        AverageRatings.remove({'_id': event.currentTarget.id })
    }
});

Template.input_buttons.events({
    'click button.delete-all': function () {
        Meteor.call('removeAllRatings')
    },
    'click button.save': function () {
        var average = parseFloat(document.getElementById('day-average').getAttribute('data-val'));
        var median = parseFloat(document.getElementById('day-median').getAttribute('data-val'));
        var count = parseInt(document.getElementById('day-count').getAttribute('data-val'));
        AverageRatings.insert({
            "time": Date.now(),
            "average": average,
            "median": median,
            "count": count
        });
        Meteor.call('removeAllRatings');
        $('.ratings-status').html('<div class="alert alert-success">Data Saved!</div>')
    }
});

Template.historic_ratings.events({
   'click button.delete-all-avg': function(){
       Meteor.call('removeAllAverageRatings')
   }
});

Template.input.events = {
    'keydown input#name': function (event) {
        if (event.which == 13) {
            document.getElementById('rating').focus();
        }
    },
    'keydown input#rating': function (event) {
        if (event.which == 13) { // 13 is the enter key event
            $('.ratings-status').text('')  // reset status
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
                    name: name.value.substring(0, 15).trim(),
                    rating: parseFloat(rating.value),
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

