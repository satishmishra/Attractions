var Attractions,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Attractions = (function(_super) {
  __extends(Attractions, _super);

  function Attractions() {
    return Attractions.__super__.constructor.apply(this, arguments);
  }

  Attractions.prototype.selectors = {
    tourismTable: "#tourism-table"
  };

  Attractions.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    $('#loading').html('<img src="http://preloaders.net/preloaders/287/Filling%20broken%20ring.gif"> loading...');
    return $.ajax({
      url: "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=SELECT+DISTINCT+%28str%28%3Fcity%29+as+%3FCity%29+%28str%28%3Flabel%29+as+%3FAttractions%29%0D%0AWHERE+%7B+%0D%0A%3Fentity+skos%3Abroader+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FCategory%3ATourism_by_city%3E+.%0D%0A%3Fplaces+skos%3Abroader+%3Fentity+.%0D%0A%3Fplaces+rdfs%3Alabel+%3Fcity+.%0D%0AFILTER+langMatches%28lang%28%3Fcity%29%2C%22en%22%29+.%0D%0A%3Fattractions+dcterms%3Asubject+%3Fplaces+.%0D%0A%3Fattractions+rdfs%3Alabel+%3Flabel+.%0D%0AFILTER+langMatches%28lang%28%3Flabel%29%2C%22en%22%29.%0D%0AFILTER+%28if+%28isliteral%28%3Fcity+%29%2C++contains%28str%28%3Fcity+%29%2C+%22Visitor%22%29%2C+false%29%29%0D%0A%7D+%0D%0AORDER+BY+ASC%28%3Fcity%29&format=application%2Fsparql-results%2Bjson&timeout=30000&debug=on",
      type: "GET",
      success: (function(_this) {
        return function(data) {
          var tourismHtml;
          $('#loading').empty();
          tourismHtml = _.template($("#tourism-city-template").html(), {
            data: data.results
          });
          $(_this.selectors.tourismTable).html(tourismHtml);
          return console.log(data);
        };
      })(this),
      error: (function(_this) {
        return function() {};
      })(this)
    });
  };

  return Attractions;

})(Backbone.View);