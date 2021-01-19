import muBan from './myCanvas';
export default (myCanvas, height, weight) => {
  var color = '#007FFF';
  var color_ = '#000000';
  var font = '12px Arial';
  var font2 = '30px Microsoft YaHei';
  var a = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18岁',
  ];
  var l = [
    '200',
    '190',
    '180',
    '170',
    '160',
    '150',
    '140',
    '130',
    '120',
    '110',
    '100',
    '90',
    '80',
    '70',
    '30',
    '20',
    '10',
  ];
  var r = [
    '200',
    '190',
    '180',
    '170',
    '160',
    '150',
    '110',
    '100',
    '90',
    '80',
    '70',
    '60',
    '50',
    '40',
    '30',
    '20',
    '10',
  ];
  var t = '身高(cm)';
  var b = '体重(kg)';
  var title = '中国2~18岁男童身高、体重标准差单位曲线图';
  var arr_h_n3 = [
    [2, 78.3],
    [2.5, 82.4],
    [3, 85.6],
    [3.5, 89.3],
    [4, 92.5],
    [4.5, 95.6],
    [5, 98.7],
    [5.5, 101.6],
    [6, 104.1],
    [6.5, 106.5],
    [7, 109.2],
    [7.5, 111.8],
    [8, 114.1],
    [8.5, 116.2],
    [9, 118.3],
    [9.5, 120.3],
    [10, 122],
    [10.5, 123.8],
    [11, 125.7],
    [11.5, 127.7],
    [12, 130],
    [12.5, 132.6],
    [13, 136.3],
    [13.5, 140.3],
    [14, 144.3],
    [14.5, 147.6],
    [15, 150.1],
    [15.5, 151.9],
    [16, 152.9],
    [16.5, 153.5],
    [17, 154],
    [18, 154.4],
  ];
  var arr_h_n2 = [
    [2, 81.6],
    [2.5, 85.9],
    [3, 89.3],
    [3.5, 93],
    [4, 96.3],
    [4.5, 99.5],
    [5, 102.8],
    [5.5, 105.9],
    [6, 108.6],
    [6.5, 111.1],
    [7, 114],
    [7.5, 116.8],
    [8, 119.3],
    [8.5, 121.6],
    [9, 123.9],
    [9.5, 126],
    [10, 127.9],
    [10.5, 130],
    [11, 132.1],
    [11.5, 134.5],
    [12, 137.2],
    [12.5, 140.2],
    [13, 144],
    [13.5, 147.9],
    [14, 151.5],
    [14.5, 154.5],
    [15, 156.7],
    [15.5, 158.3],
    [16, 159.1],
    [16.5, 159.7],
    [17, 160.1],
    [18, 160.5],
  ];
  var arr_h_n1 = [
    [2, 85.1],
    [2.5, 89.6],
    [3, 93],
    [3.5, 96.7],
    [4, 100.2],
    [4.5, 103.6],
    [5, 107],
    [5.5, 110.2],
    [6, 113.1],
    [6.5, 115.8],
    [7, 119],
    [7.5, 121.9],
    [8, 124.6],
    [8.5, 127.1],
    [9, 129.6],
    [9.5, 131.9],
    [10, 134],
    [10.5, 136.3],
    [11, 138.7],
    [11.5, 141.4],
    [12, 144.6],
    [12.5, 147.9],
    [13, 151.8],
    [13.5, 155.4],
    [14, 158.7],
    [14.5, 161.3],
    [15, 163.3],
    [15.5, 164.7],
    [16, 165.4],
    [16.5, 165.9],
    [17, 166.3],
    [18, 166.6],
  ];
  var arr_h_0 = [
    [2, 88.5],
    [2.5, 93.3],
    [3, 96.8],
    [3.5, 100.6],
    [4, 104.1],
    [4.5, 107.7],
    [5, 111.3],
    [5.5, 114.7],
    [6, 117.7],
    [6.5, 120.7],
    [7, 124],
    [7.5, 127.1],
    [8, 130],
    [8.5, 132.7],
    [9, 135.4],
    [9.5, 137.9],
    [10, 140.2],
    [10.5, 142.6],
    [11, 145.3],
    [11.5, 148.4],
    [12, 151.9],
    [12.5, 155.6],
    [13, 159.5],
    [13.5, 163],
    [14, 165.9],
    [14.5, 168.2],
    [15, 169.8],
    [15.5, 171],
    [16, 171.6],
    [16.5, 172.1],
    [17, 172.3],
    [18, 172.7],
  ];
  var arr_h_1 = [
    [2, 92.1],
    [2.5, 97.1],
    [3, 100.7],
    [3.5, 104.5],
    [4, 108.2],
    [4.5, 111.9],
    [5, 115.7],
    [5.5, 119.2],
    [6, 122.4],
    [6.5, 125.6],
    [7, 129.1],
    [7.5, 132.4],
    [8, 135.5],
    [8.5, 138.4],
    [9, 141.2],
    [9.5, 144],
    [10, 146.4],
    [10.5, 149.1],
    [11, 152.1],
    [11.5, 155.4],
    [12, 159.4],
    [12.5, 163.3],
    [13, 167.3],
    [13.5, 170.5],
    [14, 173.1],
    [14.5, 175],
    [15, 176.3],
    [15.5, 177.3],
    [16, 177.8],
    [16.5, 178.2],
    [17, 178.4],
    [18, 178.7],
  ];
  var arr_h_2 = [
    [2, 95.8],
    [2.5, 101],
    [3, 104.6],
    [3.5, 108.6],
    [4, 112.3],
    [4.5, 116.2],
    [5, 120.1],
    [5.5, 123.8],
    [6, 127.2],
    [6.5, 130.5],
    [7, 134.3],
    [7.5, 137.8],
    [8, 141.1],
    [8.5, 144.2],
    [9, 147.2],
    [9.5, 150.1],
    [10, 152.7],
    [10.5, 155.7],
    [11, 158.9],
    [11.5, 162.6],
    [12, 166.9],
    [12.5, 171.1],
    [13, 175.1],
    [13.5, 178.1],
    [14, 180.2],
    [14.5, 181.8],
    [15, 182.8],
    [15.5, 183.6],
    [16, 184],
    [16.5, 184.3],
    [17, 184.5],
    [18, 184.7],
  ];
  var arr_h_3 = [
    [2, 99.5],
    [2.5, 105],
    [3, 108.7],
    [3.5, 112.7],
    [4, 116.5],
    [4.5, 120.6],
    [5, 124.7],
    [5.5, 128.6],
    [6, 132.1],
    [6.5, 135.6],
    [7, 139.6],
    [7.5, 143.4],
    [8, 146.8],
    [8.5, 150.1],
    [9, 153.3],
    [9.5, 156.4],
    [10, 159.2],
    [10.5, 162.3],
    [11, 165.8],
    [11.5, 169.8],
    [12, 174.5],
    [12.5, 178.9],
    [13, 183],
    [13.5, 185.7],
    [14, 187.4],
    [14.5, 188.5],
    [15, 189.3],
    [15.5, 189.8],
    [16, 190.1],
    [16.5, 190.3],
    [17, 190.5],
    [18, 190.6],
  ];

  var arr_w_n3 = [
    [2, 9.06],
    [2.5, 9.86],
    [3, 10.61],
    [3.5, 11.31],
    [4, 12.01],
    [4.5, 12.74],
    [5, 13.5],
    [5.5, 14.18],
    [6, 14.74],
    [6.5, 15.3],
    [7, 16.01],
    [7.5, 16.7],
    [8, 17.33],
    [8.5, 17.93],
    [9, 18.53],
    [9.5, 19.17],
    [10, 19.81],
    [10.5, 20.55],
    [11, 21.41],
    [11.5, 22.35],
    [12, 23.37],
    [12.5, 24.55],
    [13, 26.21],
    [13.5, 28.16],
    [14, 30.4],
    [14.5, 32.59],
    [15, 34.59],
    [15.5, 36.33],
    [16, 37.67],
    [16.5, 38.77],
    [17, 39.58],
    [18, 40.65],
  ];
  var arr_w_n2 = [
    [2, 10.09],
    [2.5, 10.97],
    [3, 11.79],
    [3.5, 12.57],
    [4, 13.35],
    [4.5, 14.18],
    [5, 15.06],
    [5.5, 15.87],
    [6, 16.56],
    [6.5, 17.27],
    [7, 18.2],
    [7.5, 19.11],
    [8, 19.97],
    [8.5, 20.79],
    [9, 21.62],
    [9.5, 22.5],
    [10, 23.4],
    [10.5, 24.43],
    [11, 25.64],
    [11.5, 26.96],
    [12, 28.41],
    [12.5, 30.01],
    [13, 32.04],
    [13.5, 34.22],
    [14, 36.54],
    [14.5, 38.71],
    [15, 40.63],
    [15.5, 42.26],
    [16, 43.51],
    [16.5, 44.54],
    [17, 45.28],
    [18, 46.27],
  ];
  var arr_w_n1 = [
    [2, 11.24],
    [2.5, 12.22],
    [3, 13.13],
    [3.5, 14],
    [4, 14.88],
    [4.5, 15.84],
    [5, 16.87],
    [5.5, 17.85],
    [6, 18.71],
    [6.5, 19.62],
    [7, 20.83],
    [7.5, 22.06],
    [8, 23.23],
    [8.5, 24.37],
    [9, 25.5],
    [9.5, 26.7],
    [10, 27.93],
    [10.5, 29.33],
    [11, 30.95],
    [11.5, 32.73],
    [12, 34.67],
    [12.5, 36.76],
    [13, 39.22],
    [13.5, 41.67],
    [14, 44.08],
    [14.5, 46.2],
    [15, 48],
    [15.5, 49.49],
    [16, 50.62],
    [16.5, 51.53],
    [17, 52.2],
    [18, 53.08],
  ];
  var arr_w_0 = [
    [2, 12.54],
    [2.5, 13.64],
    [3, 14.65],
    [3.5, 15.63],
    [4, 16.64],
    [4.5, 17.75],
    [5, 18.98],
    [5.5, 20.18],
    [6, 21.26],
    [6.5, 22.45],
    [7, 24.06],
    [7.5, 25.72],
    [8, 27.33],
    [8.5, 28.91],
    [9, 30.46],
    [9.5, 32.09],
    [10, 33.74],
    [10.5, 35.58],
    [11, 37.69],
    [11.5, 39.98],
    [12, 42.49],
    [12.5, 45.13],
    [13, 48.08],
    [13.5, 50.85],
    [14, 53.37],
    [14.5, 55.43],
    [15, 57.08],
    [15.5, 58.39],
    [16, 59.35],
    [16.5, 60.12],
    [17, 60.68],
    [18, 61.4],
  ];
  var arr_w_1 = [
    [2, 14.01],
    [2.5, 15.24],
    [3, 16.39],
    [3.5, 17.5],
    [4, 18.67],
    [4.5, 19.98],
    [5, 21.46],
    [5.5, 22.94],
    [6, 24.32],
    [6.5, 25.89],
    [7, 28.05],
    [7.5, 30.33],
    [8, 32.57],
    [8.5, 34.78],
    [9, 36.92],
    [9.5, 39.12],
    [10, 41.31],
    [10.5, 43.69],
    [11, 46.33],
    [11.5, 49.19],
    [12, 52.31],
    [12.5, 55.54],
    [13, 59.04],
    [13.5, 62.16],
    [14, 64.84],
    [14.5, 66.86],
    [15, 68.35],
    [15.5, 69.44],
    [16, 70.2],
    [16.5, 70.79],
    [17, 71.2],
    [18, 71.73],
  ];
  var arr_w_2 = [
    [2, 15.67],
    [2.5, 17.06],
    [3, 18.37],
    [3.5, 19.55],
    [4, 21.01],
    [4.5, 22.57],
    [5, 24.38],
    [5.5, 26.24],
    [6, 28.03],
    [6.5, 30.13],
    [7, 33.08],
    [7.5, 36.24],
    [8, 39.41],
    [8.5, 42.54],
    [9, 45.52],
    [9.5, 48.51],
    [10, 51.38],
    [10.5, 54.37],
    [11, 57.58],
    [11.5, 60.96],
    [12, 64.68],
    [12.5, 68.51],
    [13, 72.6],
    [13.5, 76.16],
    [14, 79.07],
    [14.5, 81.11],
    [15, 82.45],
    [15.5, 83.32],
    [16, 83.85],
    [16.5, 84.21],
    [17, 84.45],
    [18, 84.72],
  ];
  var arr_w_3 = [
    [2, 17.54],
    [2.5, 19.13],
    [3, 20.64],
    [3.5, 22.13],
    [4, 23.73],
    [4.5, 25.61],
    [5, 27.85],
    [5.5, 30.22],
    [6, 32.57],
    [6.5, 35.41],
    [7, 39.5],
    [7.5, 43.99],
    [8, 48.57],
    [8.5, 53.08],
    [9, 57.3],
    [9.5, 61.37],
    [10, 65.08],
    [10.5, 68.71],
    [11, 72.39],
    [11.5, 76.17],
    [12, 80.35],
    [12.5, 84.72],
    [13, 89.42],
    [13.5, 93.5],
    [14, 96.8],
    [14.5, 99],
    [15, 100.29],
    [15.5, 100.96],
    [16, 101.25],
    [16.5, 101.36],
    [17, 101.39],
    [18, 101.36],
  ];

  var m = new muBan(35, 60, 100, 100);
  var c = document.getElementById(myCanvas);
  var ctx = c.getContext('2d');

  m.box(ctx, color, 0.75, 0.2, 17, 68, 18, 180); //画格子
  m.txt(ctx, color, font, a, a, l, r, t, b, 17, 18); //写字
  m.title(ctx, color, font2, title, 17);

  //身高
  m.line(ctx, 218, color, 1, arr_h_n3, 12, 80, 10, 2, false, true, '-3');
  m.line(ctx, 218, color, 2, arr_h_n2, 12, 80, 10, 2, false, false, '-2');
  m.line(ctx, 218, color, 1, arr_h_n1, 12, 80, 10, 2, false, false, '-1');
  m.line(ctx, 218, color, 2, arr_h_0, 12, 80, 10, 2, false, false, '-0');
  m.line(ctx, 218, color, 1, arr_h_1, 12, 80, 10, 2, false, false, '+1');
  m.line(ctx, 218, color, 2, arr_h_2, 12, 80, 10, 2, false, false, '+2');
  m.line(ctx, 218, color, 1, arr_h_3, 12, 80, 10, 2, false, true, '+3');

  //体重
  m.line(ctx, 218, color, 1, arr_w_n3, 16, 10, 10, 2, false, true, '-3');
  m.line(ctx, 218, color, 2, arr_w_n2, 16, 10, 10, 2, false, false, '-2');
  m.line(ctx, 218, color, 1, arr_w_n1, 16, 10, 10, 2, false, false, '-1');
  m.line(ctx, 218, color, 2, arr_w_0, 16, 10, 10, 2, false, false, '0');
  m.line(ctx, 218, color, 1, arr_w_1, 16, 10, 10, 2, false, false, '+1');
  m.line(ctx, 218, color, 2, arr_w_2, 16, 10, 10, 2, false, false, '+2');
  m.line(ctx, 218, color, 1, arr_w_3, 16, 10, 10, 2, false, true, '+3');

  height && m.line(ctx, 218, color_, 1, height, 12, 80, 10, 2, true, false, null); //身高
  weight && m.line(ctx, 218, color_, 1, weight, 16, 10, 10, 2, true, false, null); //体重
};