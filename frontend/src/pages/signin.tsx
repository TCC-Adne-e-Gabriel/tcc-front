import React from "react";
import { Typography, Box, Button, TextField, Container, Card, CardContent } from "@mui/material";
import Link from 'next/link';

const SignInPage = () => {
  return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center' }}gutterBottom>Cadastro</Typography>
            <TextField
              fullWidth
              label="Nome de usuário"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirmar Senha"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Cadastrar-se
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/login">
                <Button color="inherit">Já possui uma conta? Entrar</Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
  );
};

export default SignInPage;