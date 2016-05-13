$(function () { 
  //var chart = setupChart($('#intro_chart'), 'OpenStreetMap in 1000 Points (VAS)');

  generatePlotlyChart('intro_chart', 'open_vas_density_geo_1000.csv', 'OpenStreeMap in 1,000 points (VAS)');

  generatePlotlyChart('intro_chart2', 'open_rs_density_geo_1000.csv', 'OpenStreeMap in 1,000 points (VAS)');

});

