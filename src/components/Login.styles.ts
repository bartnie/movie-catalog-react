import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 320px;
  padding: 20px;
  color: var(--darkGrey);

  input {
    width: 100%;
    height: 30px;
    border-radius: 20px;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid var(--darkGrey);
  }

  .error {
    color: darkred;
  }

`;