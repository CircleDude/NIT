import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface SmallCardProps {
  car: {
    img: string;
    title: string;
    description: string[];
  };
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  lineHeight: 1.4,
  height: '4.2em',
  overflow: 'hidden',
}));

function CarCard({ car }: SmallCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: 'lightgray',
        borderRadius: 2,
        p: 1.8,
        textAlign: 'center',
        boxShadow: 'none',
      }}
    >
      <CardMedia
        component="img"
        alt={car.title}
        image={car.img}
        sx={{
          width: '100%',
          height: 120,
          objectFit: 'cover',
          borderRadius: 1.5,
          mb: 1.2,
        }}
      />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Typography variant="h6" sx={{ mb: 1, fontSize: '1rem' }}>
          {car.title}
        </Typography>

        <StyledTypography variant="body2">
          {car.description[0]}
        </StyledTypography>
      </CardContent>
    </Card>
  );
}

export default CarCard;