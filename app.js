renderData();

async function getData() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const date =
    d.getFullYear() +
    "-" +
    month.toString().padStart(2, "00") +
    "-" +
    d.getDate();
  console.log(date);
  const response = await fetch(
    `https://api.covid19api.com/country/mexico?from=2020-02-28T00:00:00Z&to=${date.toString()}T00:00:00Z`
  );
  const data = await response.json();
  return data;
}

async function renderData() {
  const data = await getData();
  const dates = [];
  const Confirmed = [];
  const Deaths = [];
  const Recovered = [];

  data.forEach((item) => {
    console.log("Date: " + item.Date);
    dates.push(item.Date.toString().substr(0, 10));
    console.log("Confirmed: " + item.Confirmed);
    Confirmed.push(item.Confirmed);
    console.log("Deaths: " + item.Deaths);
    Deaths.push(item.Deaths);
    console.log("Recovered: " + item.Recovered);
    Recovered.push(item.Recovered);
  });

  var options = {
    series: [
      {
        name: "Confirmed",
        data: Confirmed,
      },
      {
        name: "Deaths",
        data: Deaths,
      },
      {
        name: "Recovered",
        data: Recovered,
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    title: {
      text: "Mexico Covid19 Cases",
      align: "left",
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: dates,
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + "";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + "";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

async function getSumaryData() {
  const response = await fetch(`https://api.covid19api.com/summary`);
  const data = await response.json();
  console.log(data);
  console.log(data.Global.TotalConfirmed);
  /*  "Global": {
    "NewConfirmed": 174744,
    "TotalConfirmed": 8764876,
    "NewDeaths": 6071,
    "TotalDeaths": 468396,
    "NewRecovered": 90678,
    "TotalRecovered": 4245126*/
  return data;
}
