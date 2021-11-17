import React from "react";
import PropTypes from 'prop-types';
// Styles
import { Wrapper, Content } from "./MovieInfoBar.styles";
// Converters
import { calcTime, convertMoney } from '../../helpers';

const MovieInfoBar = ({ runtime, budget, revenue }) => (
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

MovieInfoBar.propTypes = {
  runtime: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number
}

export default MovieInfoBar;