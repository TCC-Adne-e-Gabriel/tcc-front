import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { createPayment, confirmPayment } from '../../services/paymentService';
import { CreatePaymentRequest, PaymentResponse } from '../../types';

const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!orderId) return;
      const payload: CreatePaymentRequest = {
        payment_method: 'pix',
        order_id: orderId,
        total_amount: 0,
      };
      const p = await createPayment(payload);
      setPayment(p);
    })();
  }, [orderId]);

  const handleConfirm = async () => {
    if (!payment) return;
    setLoading(true);
    await confirmPayment(payment.id);
    navigate('/orders');
  };

  if (!payment) return <CircularProgress />;

  return (
    <Container sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4" gutterBottom>Pay order</Typography>
      <Box sx={{ mb: 2 }}>
        inserir imagem de pagamento aqui
      </Box>
      <Button variant="contained" onClick={handleConfirm} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'I have completed my payment'}
      </Button>
    </Container>
  );
};

export default PaymentPage;