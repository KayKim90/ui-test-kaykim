import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userInterval from "../utils/userInterval";
import axios from "axios";
import { Divider, Grid, Box, Paper } from "@mui/material";
import Section from "../components/Section";
import Description from "../components/Description";
import styled from "@emotion/styled";

// TODO
// 1. Get campaign data (impressions, clicks, users, ...)
// 2. Set interval to refresh campaign data for 5 seconds by increasing 1
// 3. (Online marketing) Display impressions, clicks, CTR, users, etc
const TIME_INTERVAL_SETTING = 5000;

function Dashboard(props) {
  const { pulls, campaignName } = props;
  const [newCampaign, setNewCampaign] = useState({});
  const [prevCampaign, setPrevCampaign] = useState({});
  const [paramNum, setParamNum] = useState(0);
  const [currentNum, setCurrentNum] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    getCampaignData();
    getCurrentNumber();
  }, []);

  userInterval(() => {
    getCampaignData();
  }, TIME_INTERVAL_SETTING);

  /**
   * To get online marketing data regarding campaign
   */
  async function getCampaignData() {
    let mostRecentCampaign = newCampaign;
    let newNum = paramNum + 1;

    await axios
      .get(`http://localhost:4000/campaigns/${id}?number=${newNum}`)
      .then((res) => {
        setNewCampaign(res.data);
        setParamNum(newNum);
        setPrevCampaign(mostRecentCampaign);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  /**
   * Calculate current number using both total campaign clicks per session, and counting actual clicks on that campaign to your dashboard
   * EX) User visited [1] Green dashboard, [4] Purple dashboard, and [1] Green dashboard again.
   *     current number for green dashboard = 2/3
   *     pulls = {{1:2}, {4:1}}
   */
  const getCurrentNumber = () => {
    let iteration = pulls[id] || 0;
    let totalPulls = sumValues(pulls);

    let currentNumber =
      totalPulls === 0 ? "-" : (iteration / totalPulls).toFixed(2);

    setCurrentNum(currentNumber || 0);
  };

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  const calcCTR = (campaign) => {
    let totalClick = campaign?.clicks || 0;
    let totalImperssion = campaign?.impressions || 0;
    let ctr =
      totalImperssion === 0
        ? "-"
        : ((totalClick / totalImperssion) * 100).toFixed(2);

    return ctr;
  };

  return (
    <>
      <DashboardTitleWrapper>
        <h1>Dashboard</h1>
        <Link to="/">Back to list</Link>
      </DashboardTitleWrapper>

      <Divider />
      <Description>
        &#91; {id} &#93; Campaign {campaignName}
      </Description>
      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Section
              icon={"/icons/impression.png"}
              title="Total Impressions"
              desc="Impressions are when an advertisement or any other form of digital
              media renders on a user's screen"
              figure={newCampaign?.impressions}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Section
              icon={"/icons/tap.png"}
              title="Total Clicks"
              desc="How often someone clicked a link, Any traffic their page gets from that search is counted as an SEO click."
              figure={newCampaign?.clicks}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Section
              icon={"/icons/click-through-rate.png"}
              title="Click Through Rate"
              desc=" The ratio of users who click on a specific link to the number of total users who view a page."
              figure={calcCTR(newCampaign)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Section
              icon={"/icons/group.png"}
              title="Total Users"
              desc="The total number of users for the requested time period. Number of users belonging to the cohort."
              figure={newCampaign?.users}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box my={2}>
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h4>Current Number (iteration/pull #)</h4>
            <Description>
              It was interpreted as a concept of the page per session. It was
              calculated by dividing the number of times a user visited the
              campaign page during one session by the number of clicked
              campaigns. (The number of clicks on the specific dashboard / Total
              dashboard page clicks)
            </Description>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FigureTypo>{currentNum}</FigureTypo>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box my={2}>
        <h4>Most Recent Maketing Data</h4>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <span>Impressions</span>

            <FigureTypo>{prevCampaign?.impressions || "-"}</FigureTypo>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <span>Clicks</span>
            <FigureTypo>{prevCampaign?.clicks || "-"}</FigureTypo>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <span>CTR</span>
            <FigureTypo>{calcCTR(prevCampaign) || "-"}</FigureTypo>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <span>Users</span>
            <FigureTypo>{prevCampaign?.users || "-"}</FigureTypo>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const DashboardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FigureTypo = styled.span`
  color: #da291c;
  font-size: 1.3rem;
  margin-left: 40px;
  margin-top: 16px;
`;
export default Dashboard;
