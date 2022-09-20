import React from "react";
import styled from "@emotion/styled";

function Description({ children }) {
  return <TypoDescription>{children}</TypoDescription>;
}
const TypoDescription = styled.small`
  color: gray;
`;
export default Description;
