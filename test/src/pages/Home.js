import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Divider, Box } from "@mui/material";
import Description from "../components/Description";
import CustomCard from "../components/CustomCard";
// TODO
// 1. Get all campaign lists
// 2. Link dashboard page for the specific campaign which user clicked
// 3. Add function to check how many times user visited to campaign dashboad to calculate current number

function Home(props) {
  const { pulls, setPulls, setClickedCampaign } = props;
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getAllCampaignsList();
  }, []);

  /**
   * To get all campaign list
   */
  async function getAllCampaignsList() {
    await axios
      .get("http://localhost:4000/campaigns")
      .then((res) => {
        setCampaigns(res.data.campaigns);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  /**
   * To Count whenever user clicks specific campagin to calcuate current number in dashboard (Pulls = Counter),
   * set state in parent component
   * The campagin counter data need to be stored as hash type
   * { {campaign id: counter}, campaign id: counter}, ...}
   */
  function updateCampaignCounterAndName(campaign) {
    let id = campaign?.id;
    let name = campaign?.name;
    setClickedCampaign(name);
    if (id in pulls) {
      setPulls((state) => ({
        ...state,
        [id]: pulls[id] + 1,
      }));
    } else {
      pulls[id] = 1;
    }
  }

  return (
    <>
      <h1>All Campaign List</h1>
      <Divider />
      <Description>
        Online Assesment | MVP web application by Kay Kim
      </Description>
      <Box my={4}>
        <Grid container spacing={3}>
          {campaigns.map((elCampaign) => (
            <Grid item sm={6} md={4} key={elCampaign.id}>
              <CustomCard
                pageLink={`campaigns/${elCampaign.id}`}
                campaign={elCampaign}
                onClickCard={updateCampaignCounterAndName}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
