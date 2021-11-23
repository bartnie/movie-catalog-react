import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  background: var(--darkGrey);
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  width: 100%;
  margin: 0 auto;

  .column {    
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--medGrey);
    color: var(--white);
    margin: 0 20px;
    border-radius: 20px;
    flex: 1;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 768px) {
    display: block;

    .column {
      margin: 20px 0;
    }
  }
`;