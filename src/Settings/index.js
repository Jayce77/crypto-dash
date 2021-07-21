import ConfirmButton from './ConfirmButton';
import WelcomeMessage from './WelcomeMessage';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';

const Settings = () => (
  <Page name="settings">
    <WelcomeMessage />
    <ConfirmButton />
    <CoinGrid />
  </Page>
);

export default Settings;