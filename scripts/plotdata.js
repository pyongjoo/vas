
function alt2color(alt, alpha = 0.6) {
  // low value: 0, mDarkTeal = rgb(35, 55, 59)
  // 25% value: 100, rgb(51, 102, 204)
  // 50% value: 300, rgb(204, 51, 255)
  // 75% value: 1000, rgb(255, 0, 102)
  // high value: 1800, mLightBrown = rgb(235, 129, 27)

  //var c0 = [35,  55,    59];
  //var c1 = [85,  73.5,  51];
  //var c2 = [135, 92,    43];
  //var c3 = [185, 110.5, 35];
  //var c4 = [235, 129,   27];
  var c0 = [35,  55,    59];
  var c1 = [85,  73.5,  51];
  var c2 = [135, 92,    43];
  var c3 = [185, 110.5, 35];
  var c4 = [235, 129,   27];

  var r = 0;
  var g = 0;
  var b = 0;

  if (alt < 0) {
    r = c0[0];
    g = c0[1];
    b = c0[2];
  }
  else if (alt < 100) {
    r = Math.floor(c0[0] + alt/100*(c1[0]-c0[0]));
    g = Math.floor(c0[1] + alt/100*(c1[1]-c0[1]));
    b = Math.floor(c0[2] + alt/100*(c1[2]-c0[2]));
  }
  else if (alt < 300) {
    r = Math.floor(c1[0] + (alt-100)/200*(c2[0]-c1[0]));
    g = Math.floor(c1[1] + (alt-100)/200*(c2[1]-c1[1]));
    b = Math.floor(c1[2] + (alt-100)/200*(c2[2]-c1[2]));
  }
  else if (alt < 1000) {
    r = Math.floor(c2[0] + (alt-300)/700*(c3[0]-c2[0]));
    g = Math.floor(c2[1] + (alt-300)/700*(c3[1]-c2[1]));
    b = Math.floor(c2[2] + (alt-300)/700*(c3[2]-c2[2]));
  }
  else if (alt < 1800) {
    r = Math.floor(c3[0] + (alt-1000)/800*(c4[0]-c3[0]));
    g = Math.floor(c3[1] + (alt-1000)/800*(c4[1]-c3[1]));
    b = Math.floor(c3[2] + (alt-1000)/800*(c4[2]-c3[2]));
  }
  else {
    r = c4[0];
    g = c4[1];
    b = c4[2];
  }

  //return "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return "rgba(" + r.toString() + "," + g.toString() + "," + b.toString() + "," + alpha.toString();
}


function count2size(count) {
  return 1.0 + Math.sqrt(count)/10.0;
}


function address2Country(address) {
  adr_tokens = address.replace(/"/g, '').split(',');
  return adr_tokens[adr_tokens.length-1].trim();
}


function runOnDataLoaded(filename, callback) {
  $.ajax({
    type: "GET",
    url: $("#baseurl").html() + "/data/" + filename,
    dataType: "text",
    success: callback
  });
}


function setupChart(container, titletext) {

  container.highcharts({
    chart: {
      type: 'scatter',
      animation: false,
      panning: true,
      panKey: 'shift',
      zoomType: 'xy'
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
      animation: false,
      enabled: true,
      pointFormat: 'x: <b>{point.x}</b><br/> y: <b>{point.y}</b><br/> density: <b>{point.count}</b><br/> country: <b>{point.country}</b><br/>'
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

  var chart = container.highcharts();

  //chart.renderer.image(
  //    $("#baseurl").html() + "/images/BlankMap-FlatWorld6.svg",
  //    105, 70, 485, 250).add();

  return chart;
};


function csv2series(csvstring, alpha = 1.0) {
  //var allTextLines = csvstring.split(/\r\n|\n/);
  var data = Papa.parse(csvstring).data;

  var series = [];

  for (i = 0; i < data.length; i++) {
    //tokens = allTextLines[i].split(",");
    //tokens = Papa.parse(allTextLines[i]).data[0];
    if (data[i].length != 5) continue;

    series.push({
      x: parseFloat(data[i][1]),
      y: parseFloat(data[i][0]),
      color: alt2color(parseFloat(data[i][2]), alpha),
      count: data[i][3],
      country: address2Country(data[i][4])
    });
  }

  return series;
}


function csv2richSeries(csvstring, alpha = 0.6) {
  //var allTextLines = csvstring.split(/\r\n|\n/);
  var data = Papa.parse(csvstring).data;

  var series = [];

  for (i = 0; i < data.length; i++) {
    //tokens = allTextLines[i].split(",");
    //tokens = Papa.parse(allTextLines[i]);
    if (data[i].length != 5) continue;

    series.push({
      x: parseFloat(data[i][1]),
      y: parseFloat(data[i][0]),
      color: alt2color(parseFloat(data[i][2]), alpha),
      marker: {
        radius: count2size(parseFloat(data[i][3]))
      },
      count: data[i][3],
      country: address2Country(data[i][4])
    });
  }

  return series;
}


function plotSeriesOnChart(series, chart) {

  chart.series[0].setData([]);    // clean first

  var t0 = performance.now();
  chart.series[0].setData(series);
  var t1 = performance.now();
  var elapsed = Math.round((t1-t0)/10.0)/100.0;

  $("#viz-time").html(elapsed.toString());
};


