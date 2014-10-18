/**
* Templates
*/
/* Template.template_name.template_var_name */
Template.ratings.ratings = function () {
  return Ratings.find({}, { sort: { time: -1 }});
}

Template.ratings.avg = function() {
    //;
//    Ratings.find({}, {transform: function(doc) {
//        var total_points = 0;
//        var rating = doc.rating; //[1] Second in array
//        for(point in people) {
//            total_points += people[point]
//        }
//
//        doc.rating = total_points;
//        return doc.rating;
//    }});
    var sum = 0;
    Ratings.find({}).forEach(
        function (doc) { sum += parseInt(doc.rating); }
    );
    return sum / Ratings.find().count()
}

Template.ratings.midpt = function() {
    var mid_index = parseInt(Ratings.find().count()/2 -1)
    //mid value
    return Ratings.find({}, { sort: { rating: 1 }, skip: mid_index, limit: 1});
}

Template.input.events = {
  'keydown input#rating' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      var name = document.getElementById('name');
      var rating = document.getElementById('rating');

      if (rating.value != '') {
        Ratings.insert({
          name: name.value,
          rating: rating.value,
          time: Date.now()
        });
        if (name.value != ''){
          document.getElementById('name').focus();
        }

        document.getElementById('rating').value = '';
        rating.value = '';
        document.getElementById('name').value = '';
        name.value = '';

      }
    }
  }
}