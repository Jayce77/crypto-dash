import { AppContext } from '../App/AppProvider';
import { SelectableTile, DeletableTile, DisabledTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

const CoinTile = ({coinKey, topSection}) => (
  <AppContext.Consumer>
    {
      ({coinList}) => {
        let coin = coinList[coinKey];
        let TileClass = SelectableTile;
        
        if(topSection) {
          TileClass = DeletableTile;
        }
        
        return (
          <TileClass>
            <CoinHeaderGrid topSection={topSection} name={coin.CoinName} symbol={coin.Symbol}/>
            <CoinImage coin={coin} />
          </TileClass>
        )

      }
    }
  </AppContext.Consumer>
);

export default CoinTile;