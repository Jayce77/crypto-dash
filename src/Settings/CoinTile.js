import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

const CoinTile = ({coinKey}) => (
  <AppContext.Consumer>
    {
      ({coinList}) => {
        let coin = coinList[coinKey];
        const TileClass = SelectableTile;
        return (
          <TileClass>
            <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol}/>
            <CoinImage coin={coin} />
          </TileClass>
        )

      }
    }
  </AppContext.Consumer>
);

export default CoinTile;