import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { useRecoilValue } from 'recoil';
import { showsState } from '../atoms/ShowInfoAtom';



export const DemoPie = () => {
  const data = []
    const myShows = useRecoilValue(showsState)
    console.log(myShows)
    if ((myShows.length)>0){
    console.log(myShows[0].genres)
  const counts = {}
  for (let i = 0; i<myShows.length;i++){
    for (let q = 0; q<myShows[i].genres.length;q++){
      counts[myShows[i].genres[q].name] = counts[myShows[i].genres[q].name] ? counts[myShows[i].genres[q].name] + 1 : 1;
    }
  }
  console.log(counts)
  
  for (let k in counts) {
    data.push({
      type: k,
      value: counts[k]
    })
  }
}



  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};