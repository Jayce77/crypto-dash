import { AppContext } from '../App/AppProvider';

const Page = ({name, children}) => (
  <AppContext.Consumer>
    { ({page}) => (
      page === name && <div>{children}</div>
    )}
  </AppContext.Consumer>
);

export default Page;