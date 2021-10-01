import React from "react";
import styled, {css} from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";

const numberFormat = number => +(number + '').slice(0, 7);

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePercentStyle = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`;

const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    display: grid;
    grid-gap: 16px;
    ${fontSize3};
    grid-template-columns: repeat(3, 1fr);
    justify-items: right;
  `}
`;

const ChangePercent = ({data}) => (
  <JustifyRight>
    <ChangePercentStyle red={data.CHANGEPCT24HOUR < 0}>
      {numberFormat(data.CHANGEPCT24HOUR)}%
    </ChangePercentStyle>
  </JustifyRight>
);

const PriceTilePresentation = ({sym, data}) => (
  <PriceTileStyled>
    <CoinHeaderGridStyled>
      <div>{sym}</div>
      <ChangePercent data={data} />
    </CoinHeaderGridStyled>
    <TickerPrice>
      ${numberFormat(data.PRICE)}
    </TickerPrice>
  </PriceTileStyled>
);

const PriceTileCompactPresentation = ({sym, data}) => (
  <PriceTileStyled compact>
    <JustifyLeft>{sym}</JustifyLeft>
    <ChangePercent data={data} />
    <div>
      ${numberFormat(data.PRICE)}
    </div>
  </PriceTileStyled>
);


const PriceTile = ({price, index}) => {
  const sym = Object.keys(price)[0];
  const data = price[sym]['USD'];
  let TileClass = index < 5 ? PriceTilePresentation : PriceTileCompactPresentation;
  return (
    <TileClass sym={sym} data={data} />
  );
}

export default PriceTile;