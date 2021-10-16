import React from 'react';
import ReactHighcharts from 'react-highcharts';

import highchartConfig from './HighchartsConfig';
import highchartsTheme from './HightchartsTheme';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import ChartSelect from './ChartSelect';

ReactHighcharts.Highcharts.setOptions(highchartsTheme);

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {({historicalPrices, changeChartSelect}) => (
        <Tile>
        <ChartSelect
          defaultValue={'months'}
          onChange={e => changeChartSelect(e.target.value)}
        >
          <option value="days"> Days </option>
          <option value="weeks"> Weeks </option>
          <option value="months"> Months </option>
        </ChartSelect>
          { historicalPrices
            ? <ReactHighcharts config={highchartConfig(historicalPrices)} />
            : <div> Loading Historical Data </div> }
        </Tile>
      )}
    </AppContext.Consumer>
  )
}

export default PriceChart;