import styled from 'styled-components';
import Page from '../Shared/Page';
import CoinSpotlight from './CoinSpotlight';
import PriceGrid from './PriceGrid';

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`;

const Dashboard = () => (
  <Page name="dashboard">
    <PriceGrid />
    <ChartGrid>
      <CoinSpotlight />
      <div>Chart here</div>
    </ChartGrid>
  </Page>
);

export default Dashboard;