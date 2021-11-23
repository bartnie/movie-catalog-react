import React from "react";
// Styles
import { Wrapper, Content } from "./MovieInfoBar.styles";
// Converters
import { calcTime, convertMoney } from '../../helpers';
// Types
type Props = {
  runtime: number;
  budget: number;
  revenue: number;
}

const MovieInfoBar: React.FC<Props> = ({ runtime, budget, revenue }) => (
  <Wrapper>
    <Content>
      <div className="column">
        <p>Running time: {calcTime(runtime)}</p>
      </div>
      <div className="column">
        <p>Budget: {convertMoney(budget)}</p>
      </div>
      <div className="column">
        <p>Revenue: {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>
);

export default MovieInfoBar;