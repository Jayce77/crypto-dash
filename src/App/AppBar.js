import styled, {css} from 'styled-components';
import {AppContext} from './AppProvider';

const Logo = styled.div`
  font-size: 1.5em;
`

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px 100px 100px;
`;

const ControlButonElem = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`;

const toProperCase = (lower) => lower.charAt(0).toUpperCase() + lower.substr(1);

const ControlButton = ({name, active}) => (
  <AppContext.Consumer>
    {({page, setPage}) =>(
      <ControlButonElem
        active={page === name}
        onClick={() => setPage(name)}  
      >
      {toProperCase(name)}
    </ControlButonElem>
    )} 
  </AppContext.Consumer>
  
);

const AppBar = () => (
  <Bar>
    <Logo>CryptoDash</Logo>
    <ControlButton active name="dashboard" />
    <ControlButton name="settings" />
  </Bar>
);

export default AppBar;