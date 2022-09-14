export const echart1 = {
  title: {
    text: "統計表(長條圖)",
  },
  tooltip: {},
  xAxis: {
    data: [
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期日",
    ],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20, 10],
    },
  ],
};
export const echart2 = {
  title: {
    text: "統計表(圓餅圖)",
    subtext: "Data",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "星期一" },
        { value: 735, name: "星期二" },
        { value: 580, name: "星期三" },
        { value: 484, name: "星期四" },
        { value: 300, name: "星期五" },
        { value: 255, name: "星期六" },
        { value: 699, name: "星期日" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
