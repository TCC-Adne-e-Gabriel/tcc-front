import React from "react";
import { Typography, Box, Button, TextField, Container, Card, CardContent } from "@mui/material";
import Link from 'next/link';

const LoginPage = () => {
  return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: 'center' }}gutterBottom>Login</Typography>
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Entrar
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/signin">
                <Button color="inherit">Não possui uma conta? Cadastrar-se</Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
  );
};

export default LoginPage;