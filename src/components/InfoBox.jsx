import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const InfoBox = ({ title, cases, total }) => {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          <Typography className="infoBox_title" color="textSecondary">
            {title}
          </Typography>
          <h3 className="infoBox_cases">{cases ? cases + " Today" : ""}</h3>
          <Typography className="infoBox_total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
