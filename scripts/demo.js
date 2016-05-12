var data_filename;
var chart;

function drawChart() {
  runOnDataLoaded(data_filename,
      function(csvstring) {plotSeriesOnChart(csv2richSeries(csvstring), chart);});
};

function selectDatasetButton(buttonObject) {
    data_filename = buttonObject.attr("dataset");
    $("#datasetBtn").html(buttonObject.html() + "<span class=\"caret\"></span>");
};

$(function () { 
  chart = setupChart($('#demo_chart'), 'Reduced OpenStreetMap');

  // Update dataset drop down menu
  $(".dataset-select").click( function(event) {
    selectDatasetButton($(event.target));
  });

  $("#demo-chart-update-btn").click( function(event) {
    drawChart();
  });

  selectDatasetButton($($(".dataset-select[dataset='open_vas_density_1000.csv']")[0]));
  drawChart();

});

