import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Container>
            <hr/>
            <Typography sx={{ color: '#5d8aa8' }}>
                <p>2026</p>
                <p>Группа: Б9123-09.03.04(6)</p>
                <p>Студент: Рякин Я.С.</p>
            </Typography>
        </Container>
    );
}

export default Footer;