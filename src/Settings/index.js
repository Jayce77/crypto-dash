import ConfirmButton from './ConfirmButton';
import WelcomeMessage from './WelcomeMessage';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';

const Settings = () => (
  <Page name="settings">
    <WelcomeMessage />
    <CoinGrid topSection />
    <ConfirmButton />
    <CoinGrid />
  </Page>
);

export default Settings;