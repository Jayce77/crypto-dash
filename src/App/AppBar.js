import styled from 'styled-components';

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px 100px 100px;
`;

export default  function() {
  return (
    <Bar>
      <div>CruptoDash</div>
      <div>Dashboard</div>
      <div>Settings</div>
    </Bar>)
}