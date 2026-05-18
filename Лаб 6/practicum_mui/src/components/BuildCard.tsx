import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ComponentProps {
    building: {
        img: string, 
        title: string, 
        description: string[],
    };
    cardNum: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: theme.spacing(1),
}));

function BuildCard({ building, cardNum } : ComponentProps) {
    return (
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row'}}}>
        <CardMedia
            component="img"
            alt={ building.title }
            image={ building.img }
            sx={{ order: { md: (cardNum == 0) ? 0 : cardNum, xs: 0}}}
        />
        <Box sx={{ order: { md: (cardNum == 0) ? 0 : 3-cardNum, xs: 0}}}>
          <CardContent>
            <Typography gutterBottom variant="h5" >
              { building.title }
            </Typography>
            { building.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2">
                { item }
              </StyledTypography>
            ))}
          </CardContent>
          <CardActions sx={{ justifyContent: 'center'}} >
            <Button size="small">Подробнее</Button>
          </CardActions>
        </Box>
      </Card>
    )
}

export default BuildCard;