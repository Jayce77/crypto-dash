import React from 'react';
import ReactHighcharts from 'react-highcharts';

import highchartConfig from './HighchartsConfig';
import highchartsTheme from './HightchartsTheme';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';

ReactHighcharts.Highcharts.setOptions(highchartsTheme);

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