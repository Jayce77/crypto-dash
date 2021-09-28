import {AppContext} from '../App/AppProvider';

const Content = (props) => (
  <AppContext.Consumer>
    {({coinList, prices, firstVisit}) => (
      <div>
        {coinList && (prices || firstVisit) ?  props.children : 'Loading Coins' }
      </div>
    )}
  </AppContext.Consumer>
);

export default Content;