import React, { useEffect } from 'react';
import { charts, clearCanvas } from '@/utils/canvas';
const ChartsStand = ({ graphData, gender }) => {
  useEffect(() => {
    console.log('graphData', graphData);
    let genderInt = gender === '男' ? 1 : 2;
    let height = null;
    let weight = null;
    let head = null;
    let age = 1;
    if (graphData) {
      head = graphData.mouthHead;
      if (
        graphData.mouthHeight &&
        graphData.mouthHeight.length > 0 &&
        graphData.mouthWeight &&
        graphData.mouthWeight.length > 0
      ) {
        age = 1;
        height = graphData.mouthHeight;
        weight = graphData.mouthWeight;
      }
      if (
        graphData.ageHeight &&
        graphData.ageHeight.length > 0 &&
        graphData.ageWeight &&
        graphData.ageWeight.length > 0
      ) {
        age = 2;
        height = graphData.ageHeight;
        weight = graphData.ageWeight;
      }
    }
    clearCanvas('myCanvas3');
    clearCanvas('myCanvas4');
    // 性别 年龄 曲线类型
    charts('myCanvas3', genderInt, age, 2, { height, weight }); // 身高体重标准差单位图
  }, [graphData]);
  return (
    <div>
      <canvas id="myCanvas3" width="900" height="1200" style={{ width: '100%' }}></canvas>
      <canvas id="myCanvas4" width="900" height="1200" style={{ width: '100%' }}></canvas>
    </div>
  );
};

export default ChartsStand;
