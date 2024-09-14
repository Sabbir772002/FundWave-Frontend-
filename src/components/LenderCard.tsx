import { useEffect, useState } from 'react';
import { Avatar, Button, Flex, Paper, Stack, Text, Progress } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

interface IProps {
  username: string;
}

const LenderCard = ({ username, ...others }: IProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [review, setReview] = useState(9);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/auth/user/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserInfo();
  }, [username]);

  if (!userInfo) {
    return <Text>Loading...</Text>;
  }

  // Determine the progress bar color based on the review value
  let progressColor = 'red';
  if (review > 8) {
    progressColor = 'darkgreen';
  } else if (review >= 5) {
    progressColor = 'green';
  }

  const handleClick = () => {
    // Increment review value by 1 up to a maximum of 10
    setReview((prev) => (prev < 10 ? prev + 1 : 0));
  };

  return (
    <Paper {...others}>
      <Flex gap="lg" align="center">
        <Avatar src={userInfo.avatar} size={80} radius={80} />
        <Stack spacing="xs" align="flex-start">
          <Text ta="center" fz="lg" weight={500}>
            {userInfo.username}
          </Text>
          <Text ta="left" c="dimmed" fz="sm">
            {userInfo.email}
          </Text>
          <Button variant="light" leftIcon={<IconSend size={18} />} fullWidth>
            Send message
          </Button>
        </Stack>
      </Flex>

      <Text fz="sm" mt="lg" />

      <Flex gap="sm" align="center" wrap="wrap" justify="flex-start">
        <Button variant="light" size="sm" leftIcon={<IconSend size={18} />} radius="md" sx={{ flexGrow: 1, minWidth: '80px' }}>
          EMI
        </Button>

        <Button variant="light" size="sm" leftIcon={<IconSend size={18} />} radius="md" sx={{ flexGrow: 1, minWidth: '80px' }}>
          10% Interest
        </Button>

        <Button variant="light" size="sm" leftIcon={<IconSend size={18} />} radius="md" sx={{ flexGrow: 1, minWidth: '80px' }}>
          6 Months
        </Button>

        <Button variant="light" size="sm" leftIcon={<IconSend size={18} />} radius="md" sx={{ flexGrow: 1, minWidth: '80px' }}>
          1000 Loan
        </Button>

        <Button variant="light" size="sm" leftIcon={<IconSend size={18} />} radius="md" sx={{ flexGrow: 1, minWidth: '80px' }}>
          500 Lend
        </Button>

        <Button variant="light" size="sm" leftIcon={<IconSend size={18} />} radius="md" sx={{ flexGrow: 1, minWidth: '80px' }} onClick={handleClick}>
          Review: {review}/10
        </Button>

        <Progress value={(review / 10) * 100} color={progressColor} radius="md" size="lg" sx={{ marginTop: '10px' }} />
      </Flex>

      <Text fz="sm" mt="lg" />

      <Button
        variant="filled"
        size="lg"
        leftIcon={<IconSend size={18} />}
        radius="md"
        sx={{ flexGrow: 1, minWidth: '200px', border: '1px solid lightgray' }}
        fullWidth
      >
        Confirm Lender
      </Button>
    </Paper>
  );
};

export default LenderCard;
