import { Box, Container } from '@mui/material';
import structures from '../data';
import CarCard from './CarCard';
import DetailedCard from './DetailedCard';

function Content() {
  const leftSidebar = [structures[0], structures[1], structures[2], structures[3]];
  const centerCards = [structures[4], structures[5], structures[6]];
  const rightSidebar = [structures[4], structures[5], structures[6], structures[0]];

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: '90%',
        pt: 2.5,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 3fr 1fr' },
          gap: 2.5,
          alignItems: 'start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.8,
          }}
        >
          {leftSidebar.map((item, index) => (
            <CarCard key={`${item.title}-${index}`} car={item} />
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          <DetailedCard car={centerCards[0]} />
          <DetailedCard car={centerCards[1]} />

          <Box sx={{ gridColumn: '1 / -1' }}>
            <DetailedCard car={centerCards[2]} featured />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.8,
          }}
        >
          {rightSidebar.map((item, index) => (
            <CarCard key={`${item.title}-${index}`} car={item} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Content;