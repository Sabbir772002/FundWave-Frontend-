import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextInput,
    Title,
    useMantineTheme,
    Text, // Import Text component
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

interface LoanApplicationFormProps {
    onSubmit: (formData: LoanFormData) => void;
}

interface LoanFormData {
    studentName: string;
    email: string;
    address: string;
    studentId: string;
    loanAmount: number;
    purpose: string;
    otherInformation: string;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onSubmit }) => {
    const theme = useMantineTheme();
    const [formData, setFormData] = useState<Partial<LoanFormData>>({});

    const handleChange = (key: keyof LoanFormData, value: string | number) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        // Ensure all required fields are filled
        if (
            formData.studentName &&
            formData.email &&
            formData.address &&
            formData.studentId &&
            formData.loanAmount &&
            formData.purpose
        ) {
            onSubmit(formData as LoanFormData);
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Loan Application</title>
            </Helmet>
            <Box>
                <Container size="sm" my={8}>
                    <Title align="center" mb="xl">
                        Loan Application Form
                    </Title>
                    <Paper shadow="sm" style={{ padding: theme.spacing.md }}>
                        <Stack spacing="md">
                            <TextInput
                                label="Student Name"
                                placeholder="Enter your name"
                                onChange={(event) => handleChange('studentName', event.currentTarget.value)}
                                required
                            />
                            {/* Example usage of Text component */}
                            <Text size="sm" color="gray">
                                Please fill out all fields to proceed with your loan application.
                            </Text>
                            <TextInput
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                onChange={(event) => handleChange('email', event.currentTarget.value)}
                                required
                            />
                            <TextInput
                                label="Address"
                                placeholder="Enter your address"
                                onChange={(event) => handleChange('address', event.currentTarget.value)}
                                required
                            />
                            <TextInput
                                label="Student ID"
                                placeholder="Enter your student ID"
                                onChange={(event) => handleChange('studentId', event.currentTarget.value)}
                                required
                            />
                            <TextInput
                                label="Loan Amount"
                                placeholder="Enter loan amount"
                                type="number"
                                onChange={(event) => handleChange('loanAmount', parseFloat(event.currentTarget.value))}
                                required
                            />
                            <TextInput
                                label="Purpose of Loan"
                                placeholder="Enter purpose of loan"
                                onChange={(event) => handleChange('purpose', event.currentTarget.value)}
                                required
                            />
                            <TextInput
                                label="Other Information"
                                placeholder="Enter any additional information"
                                onChange={(event) => handleChange('otherInformation', event.currentTarget.value)}
                            />
                            <Button
                                variant="light"
                                size="lg"
                                fullWidth
                                onClick={handleSubmit}
                                leftIcon={<IconCheck size={18} />}
                            >
                                Submit Loan Application
                            </Button>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default LoanApplicationForm;
