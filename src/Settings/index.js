import ConfirmButton from './ConfirmButton';
import WelcomeMessage from './WelcomeMessage';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';
import Search from './Search';

const Settings = () => (
  <Page name="settings">
    <WelcomeMessage />
    <CoinGrid topSection />
    <ConfirmButton />
    <Search />
    <CoinGrid />
  </Page>
);

export default Settings;