import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Chip } from "@mui/material";

function CustomCard(props) {
  const { pageLink, campaign, onClickCard } = props;
  let defaultImg = campaign?.id % 2 === 0 ? "/a.jpg" : "/b.jpg";

  return (
    <Card variant="outlined">
      <StyledLink to={pageLink} onClick={() => onClickCard(campaign)}>
        <CardMedia
          component="img"
          height="170"
          image={defaultImg}
          alt={campaign.name}
        />
        <CardContent>
          <Chip label={campaign.id} variant="outlined" color="error" />
          <CardTitle>{campaign.name} campaign</CardTitle>
        </CardContent>
      </StyledLink>
    </Card>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const CardTitle = styled.span`
  margin-left: 8px;
  font-weight: 500;
`;
export default CustomCard;
