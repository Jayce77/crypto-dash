import { AppContext } from "../App/AppProvider"

const Welcome = ({firstVisit}) => (
  <AppContext.Consumer>
    { ({firstVisit}) => (
      firstVisit && <div>Welcome to Crypto Dash, please select your favorite coins to begin</div>
    )}
  </AppContext.Consumer>

  
);

export default Welcome