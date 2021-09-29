import React from "react";
import styled, {css} from "styled-components";
import { SelectableTile } from "../Shared/Tile";

const PriceTile = ({price, index}) => {
  const sym = Object.keys(price)[0];
  const data = price[sym]['USD'];
  return (
    <SelectableTile>
     {sym} {data.PRICE}
    </SelectableTile>
  );
}

export default PriceTile;