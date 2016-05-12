var data_filename;
var chart;

function setFilterTextarea(text) {
  $("#filter-body").html(text);
}

function setMapTextarea(text) {
  $("#map-body").html(text);
}

function resetFilterTextarea() {
  setFilterTextarea("return true;");
}

function resetMapTextarea() {
  setMapTextarea("return point;");
}

function resetTextareas() {
  resetFilterTextarea();
  resetMapTextarea();
}

function drawChart() {

  var filterFunction = new Function("point", $("#filter-body").val());
  var mapFunction = new Function("point", $("#map-body").val());

  runOnDataLoaded(data_filename,
      function(csvstring) {
        plotSeriesOnChart(
            csv2richSeries(csvstring).filter(filterFunction).map(mapFunction),
            chart);
      });
};

function selectDatasetButton(buttonObject) {
    data_filename = buttonObject.attr("dataset");
    $("#datasetBtn").html(buttonObject.html() + "<span class=\"caret\"></span>");
}

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
  resetTextareas();
  drawChart();

});

