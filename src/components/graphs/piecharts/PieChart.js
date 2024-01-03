import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLabel } from 'victory-native';


const PieChart = ({data}) => (
  <VictoryChart
    theme={VictoryTheme.material}
  >
    <VictoryAxis 
            tickValues={data.map(item => item.hour)}
            tickFormat={data.map(item => Math.round(item.hour))}      
    />
    <VictoryAxis
               dependentAxis
    />
    {data.map((item, index) => (
      <VictoryStack key={index}>
        <VictoryBar
          barWidth={30} // Set bar width
          data={[{ x: item.hour, y: item.DL }]} // Adjusted x value
          labels={['DL']}
          style={{ data: { fill: "gold" } }}
        />
        <VictoryBar
          barWidth={30} // Set bar width
          data={[{ x: item.hour, y: item.MD }]} // Adjusted x value
          labels={['MD']}
          style={{ data: { fill: "orange" } }}
        />
        <VictoryBar
           barWidth={30} // Set bar width
            data={[{ x: item.hour, y: item.OK }]} // Adjusted x value
            labels={['OK']}
            style={{ data: { fill: "tomato" } }}
        />
      </VictoryStack>
    ))}
  </VictoryChart>
);

export default PieChart;
