function setupIntroChart(container, titletext) {

  container.highcharts({
    chart: {
      type: 'scatter',
      animation: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: titletext
    },
    xAxis: {
      title: {
        text: 'longitude'
      },
      min: -190,
      max: 190,
      tickInterval: 50
    },
    yAxis: {
      title: {
        text: 'latitude'
      },
      min: -100,
      max: 100,
      tickInterval: 25
    },
    tooltip: {
      animation: true,
      enabled: true
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 1.5
        },
        turboThreshold: 1000000
      }
    },
    series: [{
      type: "scatter",
      data: []
    }]
  });

  return container.highcharts();
}


$(function () { 
  var chart = setupIntroChart($('#intro_chart'), 'OpenStreetMap in 1000 Points (VAS)');

  runOnDataLoaded("open_vas_density_1000.csv",
    function(csvstring) {plotSeriesOnChart(csv2series(csvstring, 0.4), chart);});


  var chart2 = setupIntroChart($('#intro_chart2'), 'OpenStreetMap in 1000 Points (uniform random sampling)');

  runOnDataLoaded("open_rs_density_1000.csv",
    function(csvstring) {plotSeriesOnChart(csv2series(csvstring, 0.4), chart2);});

});

