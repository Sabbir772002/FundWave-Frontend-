import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Divider,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { Helmet } from "react-helmet";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/auth/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                username,
                password
                }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            // Handle successful signup
            console.log('Signup successful:', data);
            navigate('/login'); 
        } else {
            // Handle signup error
            console.error('Signup failed:', data);
            alert(`Signup failed: ${data.error}`);

        }
    };

    return (
        <>
            <Helmet>
                <title>Signup</title>
            </Helmet>
            <Container size={420} my={40}>
                <Title align="center" sx={() => ({ fontWeight: 900 })}>
                    Welcome!
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Already have an account?{' '}
                    <Anchor size="sm" component="button">
                        Login
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form" onSubmit={handleSubmit}>
                    <Group grow mb="md" mt="md">
                        <Button radius="xl" leftIcon={<IconBrandFacebook size={18} />}>Facebook</Button>
                        <Button radius="xl" leftIcon={<IconBrandGoogle size={18} />}>Google</Button>
                    </Group>
                    <Divider label="Or continue with email" labelPosition="center" my="lg" />
                    <TextInput label="Name" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
                    <TextInput label="Email" placeholder="Your email" required mt="md" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextInput label="Username" placeholder="Your Username" required mt="md" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" checked={rememberMe} onChange={(e) => setRememberMe(e.currentTarget.checked)} />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button type="submit" fullWidth mt="xl">
                        Sign Up
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default SignupPage;
