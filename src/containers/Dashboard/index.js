import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiConfig from '../../api.config';
import DashboardView from '../../components/Dashboard';
import Loader from '../../common/Loader';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);

  const scheduleCampaign = (id, value) => {
    let targetCampaignIndex = campaigns.findIndex(campaign => campaign.campaignId === id);
    campaigns[targetCampaignIndex].createdOn = value;
    const requestPayload = [...campaigns];

    setCampaigns(requestPayload);
  };

  useEffect(() => {
    const {
      getCampaigns: { url: getCampaignsURL }
    } = apiConfig;
    axios
      .get(getCampaignsURL)
      .then(({ data }) => {
        setCampaigns(data);
        setCampaignsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {campaignsLoading && <Loader />}
      <div className="campaign-list">
        {!!campaigns && !!campaigns.length && (
          <DashboardView campaigns={campaigns} scheduleCampaign={scheduleCampaign} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
