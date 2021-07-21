import {AppContext} from '../App/AppProvider';

const Content = (props) => (
  <AppContext.Consumer>
    {(coinList) => (
      <div>
        {!coinList ? 'Loading Coins' : props.children}
      </div>
    )}
  </AppContext.Consumer>
);

export default Content;