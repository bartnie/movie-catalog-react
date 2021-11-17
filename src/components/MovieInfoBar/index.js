import React from "react";
// Styles
import { Wrapper, Content } from "./MovieInfoBar.styles";
// Converters
import { calcTime, convertMoney } from '../../helpers';

const MovieInfoBar = ({ runtime, budget, revenue }) => (
  <Wrapper>
    <Content>
      <div class="column">
        <p>Running time: {calcTime(runtime)}</p>
      </div>
      <div class="column">
        <p>Budget: {convertMoney(budget)}</p>
      </div>
      <div class="column">
        <p>Revenue: {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>
);

export default MovieInfoBar;