const CoinImage = ({coin, style}) => (
  <img
    src={`http://cryptocompare.com/${coin.ImageUrl}`}
    alt={coin.Symbol}
    style={style || {height: '50px'}} 
  />
);

export default CoinImage;