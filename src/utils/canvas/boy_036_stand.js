import muBan from './myCanvas';
export default (myCanvas, height, weight) => {
	var color = '#007FFF';
	var color_ = "#000000"; 
  var font = '12px Arial';
  var font2 = '30px Microsoft YaHei';
  var a = [
    '0',
    '2',
    '4',
    '6',
    '8',
    '10',
    '12',
    '14',
    '16',
    '18',
    '20',
    '22',
    '24',
    '26',
    '28',
    '30',
    '32',
    '34',
    '36月',
  ];
  var l = [
    '',
    '105',
    '100',
    '95',
    '90',
    '85',
    '80',
    '75',
    '70',
    '65',
    '60',
    '55',
    '50',
    '45',
    '6',
    '4',
    '2',
  ];
  var r = [
    '',
    '105',
    '100',
    '95',
    '90',
    '85',
    '22',
    '20',
    '18',
    '16',
    '14',
    '12',
    '10',
    '8',
    '6',
    '4',
    '2',
  ];
  var t = '身高(cm)';
  var b = '体重(kg)';
  var title = '中国0~3岁男童身高、体重标准差单位曲线图';
  var arr_h_n3 = [
    [0, 45.2],
    [2, 52.2],
    [4, 57.9],
    [6, 61.4],
    [9, 65.2],
    [12, 68.6],
    [15, 71.2],
    [18, 73.6],
    [21, 76],
    [24, 78.3],
    [30, 82.4],
    [36, 85.6],
  ];
  var arr_h_n2 = [
    [0, 46.9],
    [2, 54.3],
    [4, 60.1],
    [6, 63.7],
    [9, 67.6],
    [12, 71.2],
    [15, 74],
    [18, 76.6],
    [21, 79.1],
    [24, 81.6],
    [30, 85.9],
    [36, 89.3],
  ];
  var arr_h_n1 = [
    [0, 48.6],
    [2, 56.5],
    [4, 62.3],
    [6, 66],
    [9, 70.1],
    [12, 73.8],
    [15, 76.9],
    [18, 79.6],
    [21, 82.3],
    [24, 85.1],
    [30, 89.6],
    [36, 93],
  ];
  var arr_h_0 = [
    [0, 50.4],
    [2, 58.7],
    [4, 64.6],
    [6, 68.4],
    [9, 72.6],
    [12, 76.5],
    [15, 79.8],
    [18, 82.7],
    [21, 85.6],
    [24, 88.5],
    [30, 93.3],
    [36, 96.8],
  ];
  var arr_h_1 = [
    [0, 52.2],
    [2, 61],
    [4, 66.9],
    [6, 70.8],
    [9, 75.2],
    [12, 79.3],
    [15, 82.8],
    [18, 85.8],
    [21, 89],
    [24, 92.1],
    [30, 97.1],
    [36, 100.7],
  ];
  var arr_h_2 = [
    [0, 54],
    [2, 63.3],
    [4, 69.3],
    [6, 73.3],
    [9, 77.8],
    [12, 82.1],
    [15, 85.8],
    [18, 89.1],
    [21, 92.4],
    [24, 95.8],
    [30, 101],
    [36, 104.6],
  ];
  var arr_h_3 = [
    [0, 55.8],
    [2, 65.7],
    [4, 71.7],
    [6, 75.8],
    [9, 80.5],
    [12, 85],
    [15, 88.9],
    [18, 92.4],
    [21, 95.9],
    [24, 99.5],
    [30, 105],
    [36, 108.7],
  ];

  var arr_w_n3 = [
    [0, 2.26],
    [2, 3.94],
    [4, 5.25],
    [6, 5.97],
    [9, 6.67],
    [12, 7.21],
    [15, 7.68],
    [18, 8.13],
    [21, 8.61],
    [24, 9.06],
    [30, 9.86],
    [36, 10.61],
  ];
  var arr_w_n2 = [
    [0, 2.58],
    [2, 4.47],
    [4, 5.91],
    [6, 6.7],
    [9, 7.46],
    [12, 8.06],
    [15, 8.57],
    [18, 9.07],
    [21, 9.59],
    [24, 10.09],
    [30, 10.97],
    [36, 11.79],
  ];
  var arr_w_n1 = [
    [0, 2.93],
    [2, 5.05],
    [4, 6.64],
    [6, 7.51],
    [9, 8.35],
    [12, 9],
    [15, 9.57],
    [18, 10.12],
    [21, 10.69],
    [24, 11.24],
    [30, 12.22],
    [36, 13.13],
  ];
  var arr_w_0 = [
    [0, 3.32],
    [2, 5.68],
    [4, 7.45],
    [6, 8.41],
    [9, 9.33],
    [12, 10.05],
    [15, 10.68],
    [18, 11.29],
    [21, 11.93],
    [24, 12.54],
    [30, 13.64],
    [36, 14.65],
  ];
  var arr_w_1 = [
    [0, 3.73],
    [2, 6.38],
    [4, 8.34],
    [6, 9.41],
    [9, 10.42],
    [12, 11.23],
    [15, 11.93],
    [18, 12.61],
    [21, 13.33],
    [24, 14.01],
    [30, 15.24],
    [36, 16.39],
  ];
  var arr_w_2 = [
    [0, 4.18],
    [2, 7.14],
    [4, 9.32],
    [6, 10.5],
    [9, 11.64],
    [12, 12.54],
    [15, 13.32],
    [18, 14.09],
    [21, 14.9],
    [24, 15.67],
    [30, 17.06],
    [36, 18.37],
  ];
  var arr_w_3 = [
    [0, 4.66],
    [2, 7.97],
    [4, 10.39],
    [6, 11.72],
    [9, 12.99],
    [12, 14],
    [15, 14.88],
    [18, 15.75],
    [21, 16.66],
    [24, 17.54],
    [30, 19.13],
    [36, 20.64],
  ];

  var m = new muBan(35, 60, 100, 100);
  var c = document.getElementById(myCanvas);
  var ctx = c.getContext('2d');

  m.box(ctx, color, 0.75, 0.2, 19, 38, 18, 180); //画格子
  m.txt(ctx, color, font, a, a, l, r, t, b, 19, 18); //写字
  m.title(ctx, color, font2, title, 19);

  //身高
  m.line(ctx, 36, color, 1, arr_h_n3, 13, 45, 5, 2, false, true, '-3');
  m.line(ctx, 36, color, 2, arr_h_n2, 13, 45, 5, 2, false, false, '-2');
  m.line(ctx, 36, color, 1, arr_h_n1, 13, 45, 5, 2, false, false, '-1');
  m.line(ctx, 36, color, 2, arr_h_0, 13, 45, 5, 2, false, false, '-0');
  m.line(ctx, 36, color, 1, arr_h_1, 13, 45, 5, 2, false, false, '+1');
  m.line(ctx, 36, color, 2, arr_h_2, 13, 45, 5, 2, false, false, '+2');
  m.line(ctx, 36, color, 1, arr_h_3, 13, 45, 5, 2, false, true, '+3');

  //体重
  m.line(ctx, 36, color, 1, arr_w_n3, 16, 2, 2, 2, false, true, '-3');
  m.line(ctx, 36, color, 2, arr_w_n2, 16, 2, 2, 2, false, false, '-2');
  m.line(ctx, 36, color, 1, arr_w_n1, 16, 2, 2, 2, false, false, '-1');
  m.line(ctx, 36, color, 2, arr_w_0, 16, 2, 2, 2, false, false, '0');
  m.line(ctx, 36, color, 1, arr_w_1, 16, 2, 2, 2, false, false, '+1');
  m.line(ctx, 36, color, 2, arr_w_2, 16, 2, 2, 2, false, false, '+2');
	m.line(ctx, 36, color, 1, arr_w_3, 16, 2, 2, 2, false, true, '+3');
	
	height && m.line(ctx,36,color_,1,height,13,45,5,2,true,false,null);	//身高
	weight && m.line(ctx,36,color_,1,weight,16,2,2,2,true,false,null);		//体重

};
