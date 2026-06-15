import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import structures from '../../data';
import { Link } from 'react-router-dom';

const imageSx = {
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover',
  borderRadius: '8px',
};

function Gallery() {
  let first = structures[0];
  let second = structures[4];
  let third = structures[2];
  let fourth = structures[3];

  return (
    <Container
      maxWidth="lg"
      sx={{
        width: { xs: '100%', md: '90%' },
        px: { xs: 1, md: 0 },
        pt: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: '10px',
          mb: 2.5,
        }}
      >
        <Box
          sx={{
            gridColumn: { xs: 'auto', md: '1' },
            gridRow: { xs: 'auto', md: '1' },
            aspectRatio: { xs: '16 / 10', md: 'auto' },
            minHeight: { xs: '220px', md: 'auto' },
          }}
        >
          <Link to={ "/building/" + 0 }>
            <Box component="img" src={first.img} alt={first.title} sx={imageSx} />
          </Link>
          </Box>

        <Box
          sx={{
            gridColumn: { xs: 'auto', md: '2' },
            gridRow: { xs: 'auto', md: '1 / span 2' },
            aspectRatio: { xs: '16 / 10', md: 'auto' },
            minHeight: { xs: '220px', md: 'auto' },
          }}
        >
          <Link to={ "/building/" + 4 }>
            <Box component="img" src={second.img} alt={second.title} sx={imageSx} />
          </Link>
        </Box>

        <Box
          sx={{
            gridColumn: { xs: 'auto', md: '1' },
            gridRow: { xs: 'auto', md: '2' },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: '10px',
          }}
        >
          <Box sx={{ aspectRatio: '16 / 10', minHeight: { xs: '220px', sm: 'auto' } }}>
            <Link to={ "/building/" + 2 }>
              <Box component="img" src={third.img} alt={third.title} sx={imageSx} />
            </Link>
          </Box>

          <Box sx={{ aspectRatio: '16 / 10', minHeight: { xs: '220px', sm: 'auto' } }}>
            <Link to={ "/building/" + 3 }>
              <Box component="img" src={fourth.img} alt={fourth.title} sx={imageSx} />
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Gallery;