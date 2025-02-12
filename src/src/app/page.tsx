import { Button, Typography, Container } from '@mui/material';


export default function Home() {
  return (
    <Container sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" color="primary">
        Olá, Next.js com Material UI!
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
        Botão Personalizado
      </Button>
    </Container>
  );
}
