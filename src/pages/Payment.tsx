import React, { useState } from 'react';
import { Container, Title, Text, Input, Button, Group, Select, Notification, Alert, Loader, Stack } from '@mantine/core';

const Payment = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Perform validation
    if (!amount || !transactionId || !paymentMethod || !name || !email || !phone) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[A-Za-z]{2,4}$/.test(email)) {
      setError('Invalid email address.');
      setLoading(false);
      return;
    }
    if (!/^\d{11}$/.test(phone)) {
      setError('Invalid phone number.');
      setLoading(false);
      return;
    }

    // Here you would integrate with SSL Commerce API
    try {
      const response = await fetch('YOUR_SSL_COMMERCE_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          transactionId,
          paymentMethod,
          name,
          email,
          phone,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title order={1} align="center">Payment</Title>
      <Text align="center" mt="sm">Please fill out the form below to complete your payment.</Text>
      
      <Stack spacing="lg" mt="lg">
        {error && <Alert color="red" title="Error">{error}</Alert>}
        {success && <Notification color="teal" title="Success">Payment completed successfully!</Notification>}
        
        <Input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.currentTarget.value))}
          type="number"
          aria-label="Amount"
        />
        <Input
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.currentTarget.value)}
          aria-label="Transaction ID"
        />
        <Select
          placeholder="Select payment method"
          value={paymentMethod}
          onChange={(value) => setPaymentMethod(value)}
          data={[
            { value: 'bkash', label: 'bKash' },
            { value: 'nagad', label: 'Nagad' },
            { value: 'rocket', label: 'Rocket' },
          ]}
          aria-label="Payment Method"
        />
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          aria-label="Name"
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          aria-label="Email"
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          aria-label="Phone"
        />
        
        <Button onClick={handlePayment} loading={loading}>Submit Payment</Button>
      </Stack>
      
      {loading && (
        <Group position="center" mt="lg">
          <Loader />
        </Group>
      )}
    </Container>
  );
};

export default Payment;
