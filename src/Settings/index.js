import ConfirmButton from './ConfirmButton';
import WelcomeMessage from './WelcomeMessage';
import Page from '../Shared/Page';

const Settings = () => (
  <Page name="settings">
    <WelcomeMessage />
    <ConfirmButton />
  </Page>
);

export default Settings;