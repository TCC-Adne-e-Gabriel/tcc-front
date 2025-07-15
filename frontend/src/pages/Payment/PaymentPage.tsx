import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { createPayment, confirmPayment } from '../../services/paymentService';
import { CreatePaymentRequest, PaymentResponse } from '../../types';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';

const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!orderId) return;
      try {
        const payload: CreatePaymentRequest = {
          payment_method: 'pix',
          order_id: orderId,
          total_amount: 0,
        };
        const p = await createPayment(payload);
        setPayment(p);
      } catch (err: any) {
        console.error('Payment init failed:', err);
        setApiError(`Payment initialization failed, please try again: ${err.message}`);
      }
    })();
  }, [orderId]);

  const handleConfirm = async () => {
    if (!payment) return;
    setLoading(true);
    try {
      await confirmPayment(payment.id);
      navigate('/orders');
    } catch (err: any) {
      console.error('Confirm payment failed:', err);
      setApiError(`Confirm failed, please try again: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!payment) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container sx={{ textAlign: 'center', justifyItems: 'center', py: 4 }}>
      <Typography variant="h4" gutterBottom>Pay Order</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>(Pay with QRCode)</Typography>
        <Box sx={{ height: 500, width: 500, bgcolor: '#ffffff', mb: 4, mt: 4 }} />
      </Box>
      <Button variant="contained" onClick={handleConfirm} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'I have completed my payment'}
      </Button>
      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default PaymentPage;
