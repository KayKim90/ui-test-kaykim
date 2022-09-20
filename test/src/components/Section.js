import React from "react";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";

function Section(props) {
  const { icon, title, desc, figure } = props;

  return (
    <SectionWrapper elevation={0}>
      <img src={icon} alt={title} width={70} />
      <TitleTypo>{title}</TitleTypo>
      <small>{desc}</small>
      <FigureTypo>{figure}</FigureTypo>
    </SectionWrapper>
  );
}

const SectionWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  padding: 32px;
`;
const TitleTypo = styled.h4`
  margin-top: 16px !important;
  font-weight: 500;
`;
const FigureTypo = styled.h1`
  color: #da291c;
  margin-bottom: 0;
`;
export default Section;
