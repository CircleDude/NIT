import Navbar from "../components/Navbar";
import structures from "../data";
import { useParams, Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import * as React from 'react';

function Building() {
  const { id } = useParams();
  const building = structures[Number(id)];
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
      <Navbar active="1" />

      <Typography sx={{ mt: 2 }}>
        <Box component="span" sx={{ color: "primary.main" }}>
            ГЛАВНАЯ
        </Box>
        {" > "}
        {building.title}
      </Typography>

      <Typography
        sx={{
          mt: 4,
          textAlign: "center",
          fontSize: 28,
          color: "text.secondary",
        }}
      >
        {building.title}
      </Typography>

      <Box
        component="img"
        src={building.img}
        alt={building.title}
        sx={{
          display: "block",
          mx: "auto",
          mt: 2,
          width: { xs: "100%", sm: 420 },
          maxWidth: 420,
          height: "auto",
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
        />
      </Box>

      <Box
        sx={{
          mt: 3,
          mb: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          textAlign: "justify",
        }}
      >
        {building.description.map((item, i) => (
          <Typography key={i}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default Building;