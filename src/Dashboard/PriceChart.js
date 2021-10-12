import React from 'react';
import ReactHighcharts from 'react-highcharts';

import highchartConfig from './HighchartsConfig';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {({}) => (
        <Tile>
          <ReactHighcharts config={highchartConfig()} />
        </Tile>
      )}
    </AppContext.Consumer>
  )
}

export default PriceChart;