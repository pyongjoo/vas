var data_filename;
var chart;

var filterExampleArr = [
  "return true;",
  "return point.country.toLowerCase() == 'australia'",
  "return point.country.toLowerCase() == 'united states'",
  "var country = point.country.toLowerCase(); return country.includes('korea') || country.includes('china') || country.includes('japan');",
  "return true;"
];

var mapExampleArr = [
  "return point;",
  "return point;",
  "return point;",
  "return point;",
  "point.color = colorPicker[mod(point.country.hashCode(),colorPicker.length)]; return point;",
];

var colorPicker = [
  "#83AA30","#1499D3","#4D6684","#3D3D3D","#E74700","#F17D80","#737495","#68A8AD","#C4D4AF","#6C8672",
  "#B0A472","#F5DF65","#2B9464","#59C8DF","#59C8DF","#753A48","#954F47","#C05949","#9AADBD"
];

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function setFilterTextarea(text) {
  $("#filter-body").val(text);
}

function setMapTextarea(text) {
  $("#map-body").val(text);
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

function drawNewChart() {
  var filterFunction = new Function("point", $("#filter-body").val());
  var mapFunction = new Function("point", $("#map-body").val());
  var title = 'Reduced OpenStreetMap';

  generateRichPlotlyChart('demo_chart', data_filename, title, filterFunction, mapFunction);
};

function updateChart() {
  var filterFunction = new Function("point", $("#filter-body").val());
  var mapFunction = new Function("point", $("#map-body").val());

  updatePlotlyChart('demo_chart', data_filename, filterFunction, mapFunction);
};

function selectDatasetButton(buttonObject) {
    data_filename = buttonObject.attr("dataset");
    $("#datasetBtn").html(buttonObject.html() + "<span class=\"caret\"></span>");
}

$(function () { 
  //chart = setupChart($('#demo_chart'), 'Reduced OpenStreetMap');

  // Update dataset drop down menu
  $(".dataset-select").click( function(event) {
    selectDatasetButton($(event.target));
  });

  $("#demo-chart-update-btn").click( function(event) {
    updateChart();
  });

  // Hook example events.
  $(".demo-chart-examples").click( function(event) {
    var ex_no = parseInt($(event.target).attr('id').replace( /^\D+/g, ''));
    setFilterTextarea(filterExampleArr[ex_no]);
    setMapTextarea(mapExampleArr[ex_no]);
  });

  selectDatasetButton($($(".dataset-select[dataset='open_vas_density_geo_1000.csv']")[0]));
  resetTextareas();
  drawNewChart();
});



