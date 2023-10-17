// React Library
import { useState, useEffect } from "react";

// Material UI
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

import { SubscriptionData } from "../../Subscription/SubscriptionData";
import axios from "axios";

export default function PlatformsFilter({ platform }) {
  const [platforms, setPlatforms] = useState([]);
  const [checkedPlatforms, setCheckedPlatforms] = useState([]);

  const handleOnChange = (position) => {
    const updatedCheckedPlatforms = checkedPlatforms.map((platform, index) =>
      index === position ? !platform : platform
    );

    setCheckedPlatforms(updatedCheckedPlatforms);

    platform.setPlatformsState(
      platforms.filter((plat, index) => updatedCheckedPlatforms[index])
    );
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/user/subscribed",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const ArrayTVServices = SubscriptionData.filter(
          (subscribed) => subscribed.category === "Television Streaming"
        );

        const ArrayTVServicesSubscribed = ArrayTVServices.filter((subscribed) =>
          res.data.subscribed.includes(subscribed.platform)
        );

        setPlatforms(
          ArrayTVServicesSubscribed.map((subscribed) => subscribed.platform)
        );
        setCheckedPlatforms(
          new Array(ArrayTVServicesSubscribed.length).fill(false)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        pb: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Subscribed Platform
      </Typography>
      <Grid container columns={12}>
        {platforms.map((p, idx) => (
          <Grid item key={idx} xs={4} lg={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleOnChange(idx)}
                    value={p}
                    name={p}
                    checked={checkedPlatforms[idx]}
                  />
                }
                label={p}
              />
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
