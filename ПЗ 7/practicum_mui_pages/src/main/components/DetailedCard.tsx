import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface DetailedCardProps {
  car: {
    img: string;
    title: string;
    description: string[];
  };
  featured?: boolean;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1),
  lineHeight: 1.55,
}));

function DetailedCard({ car, featured = false }: DetailedCardProps) {
  return (
    <Card
      sx={{
        border: '2px solid red',
        borderRadius: 2,
        p: 2.5,
        boxShadow: 'none',
        display: featured ? 'grid' : 'block',
        gridTemplateColumns: { xs: '1fr', md: featured ? '2fr 1fr' : '1fr' },
        gap: 2,
        alignItems: 'start',
      }}
    >
      {featured ? (
        <>
          <Box sx={{ order: { xs: 2, md: 1 } }}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}
            >
              {car.title}
            </Typography>

            {car.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2">
                {item}
              </StyledTypography>
            ))}

            <CardActions sx={{ justifyContent: 'center', p: 0, pt: 1 }}>
              <Button size="small">Подробнее»</Button>
            </CardActions>
          </Box>

          <CardMedia
            component="img"
            alt={car.title}
            image={car.img}
            sx={{
              width: '100%',
              height: { xs: 220, md: 200 },
              objectFit: 'cover',
              borderRadius: 2,
              order: { xs: 1, md: 2 },
            }}
          />
        </>
      ) : (
        <>
          <CardMedia
            component="img"
            alt={car.title}
            image={car.img}
            sx={{
              width: '100%',
              height: 150,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 1.8,
            }}
          />

          <CardContent sx={{ p: 0 }}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}
            >
              {car.title}
            </Typography>

            {car.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2">
                {item}
              </StyledTypography>
            ))}
          </CardContent>

          <CardActions sx={{ justifyContent: 'center', p: 0, pt: 1 }}>
            <Button size="small">Подробнее»</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default DetailedCard;