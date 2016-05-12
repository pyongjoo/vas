$(function () { 
  var chart = setupChart($('#intro_chart'), 'OpenStreetMap in 1000 Points (VAS)');

  runOnDataLoaded("open_vas_density_geo_1000.csv",
    function(csvstring) {plotSeriesOnChart(csv2series(csvstring, 0.4), chart);});


  var chart2 = setupChart($('#intro_chart2'), 'OpenStreetMap in 1000 Points (uniform random sampling)');

  runOnDataLoaded("open_rs_density_geo_1000.csv",
    function(csvstring) {plotSeriesOnChart(csv2series(csvstring, 0.4), chart2);});

});

