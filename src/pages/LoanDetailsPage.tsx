import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import {
    Accordion,
    ActionIcon,
    Anchor,
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Flex,
    Grid,
    Group,
    Image,
    Modal,
    NumberInput,
    Paper,
    PaperProps,
    Progress,
    Select,
    Stack,
    Text,
    TextProps,
    Title,
    TitleProps,
    UnstyledButton
} from "@mantine/core";
import { IconFlag, IconHeart, IconHeartFilled, IconSeparator, IconShare } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery, useToggle } from "@mantine/hooks";
import { BackButton, NotFound, UserCard } from "../components";
import LenderCard from "../components/LenderCard";
import { Helmet } from "react-helmet";
import * as dayjs from "dayjs";
import * as LocalizedFormat from "dayjs/plugin/localizedFormat";
import { notifications } from "@mantine/notifications";

const LoanDetailsPage = (): JSX.Element => {
    dayjs.extend(LocalizedFormat);
    const { id } = useParams<{ id: string }>();
    const [Loans, setLoans] = useState<any>();
    const [opened, { open, close }] = useDisclosure(false);
    const [donateOpened, { open: donateOpen, close: donateClose }] = useDisclosure(false);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [following, setFollowing] = useToggle();
    const matchesMobile = useMediaQuery('(max-width: 768px)');
    const [final, setFinal] = useState(false);

    // Modal for Bid for Lend
    const [bidModalOpened, { open: openBidModal, close: closeBidModal }] = useDisclosure(false);
    const [bidType, setBidType] = useState<string | null>(null);
    const [maxTime, setMaxTime] = useState<Date | null>(null);
    const [interest, setInterest] = useState<number | "">(0);

    const paperProps: PaperProps = {
        p: "md",
        shadow: "sm",
    };

    const titleProps: TitleProps = {
        size: 32,
        weight: 700,
        transform: 'capitalize',
        sx: { lineHeight: '40px' }
    };

    const subTitleProps: TextProps = {
        size: 20,
        weight: 600,
        sx: { lineHeight: '28px' }
    };

    const iconSize = 18;

    const fetchLoanData = async () => {
        if (id) {
            try {
                const response = await fetch(`http://localhost:3000/api/loans/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLoans(data);
            } catch (error) {
                console.error('Error fetching loan data:', error);
            }
        }
    };

    // Fetch data when the component mounts or id changes
    useEffect(() => {
        fetchLoanData();
    }, [id]);

    const handleBidSubmit = async () => {
        if (id && bidType && maxTime && interest && username) {
            console.log("Submitting bid...");
            console.log("id:", id);
            console.log("bidType:", bidType);
            console.log("maxTime:", maxTime);
            console.log("interest:", interest);
            console.log("username:", username);

            try {
                const response = await fetch(`http://localhost:3000/api/bids`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        loanId: id,
                        username,
                        bidType,
                        maxTime,
                        interest
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to submit bid");
                }

                notifications.show({
                    title: "Bid submitted",
                    message: "Your bid for lending has been submitted successfully.",
                    withBorder: true,
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.green[6],
                            borderColor: theme.colors.green[6],
                            '&::before': { backgroundColor: theme.white },
                        },
                        title: { color: theme.white },
                        description: { color: theme.white },
                        closeButton: {
                            color: theme.white,
                            '&:hover': { backgroundColor: theme.colors.green[7] },
                        },
                    }),
                });

                closeBidModal();
            } catch (error) {
                console.error("Error submitting bid:", error);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>{Loans?.title}</title>
            </Helmet>
            <Box>
                {Loans ? (
                    <Container size="lg">
                        <BackButton mb="md" />
                        <Grid>
                            <Grid.Col lg={8}>
                                <Stack>
                                    <Card padding="md" shadow="sm">
                                        <Card.Section>
                                            <Image src={Loans?.mainImage} height={480} />
                                        </Card.Section>
                                        <Stack mt="md">
                                            <Title>{Loans?.title}</Title>
                                            {!matchesMobile ? (
                                                <Flex gap="xs" align="center">
                                                    <Text size="sm">Fundraise campaign created by</Text>
                                                    <UnstyledButton component={Anchor}>
                                                        <Flex gap="xs" align="center">
                                                            <Avatar src={Loans?.createdByImage} radius="xl" size="sm" />
                                                            <Text size="sm">{Loans?.username}</Text>
                                                        </Flex>
                                                    </UnstyledButton>
                                                    <IconSeparator size={18} />
                                                    <Text component={Anchor} size="sm">{Loans?.country}</Text>
                                                    <IconSeparator size={18} />
                                                    <Text component={Anchor} size="sm">{Loans?.category}</Text>
                                                </Flex>
                                            ) : (
                                                <Stack>
                                                    <Flex gap="md">
                                                        <Text size="sm">This lending requested by</Text>
                                                        <UnstyledButton component={Anchor}>
                                                            <Flex gap="xs" align="center">
                                                                <Avatar src={Loans?.createdByImage} radius="xl" size="sm" />
                                                                <Text size="sm">{Loans?.username}</Text>
                                                            </Flex>
                                                        </UnstyledButton>
                                                    </Flex>
                                                    <Group>
                                                        <Text size="sm">Location - <Anchor>{Loans?.country}</Anchor></Text>
                                                        <Text size="sm">Category - <Anchor>{Loans?.category}</Anchor></Text>
                                                    </Group>
                                                </Stack>
                                            )}
                                            <Text {...subTitleProps}>Why I Need This</Text>
                                            <Text size="sm" dangerouslySetInnerHTML={{ __html: Loans?.story || '' }} />
                                        </Stack>
                                    </Card>
                                    <Paper {...paperProps}>
                                        <Text {...subTitleProps} mb="sm">Lender</Text>
                                        <UserCard username={Loans?.username} />
                                    </Paper>
                                    <Paper {...paperProps}>
                                        <Text>Created on {dayjs(Loans?.createdAt).format('LL')}</Text>
                                    </Paper>
                                    {!matchesMobile && (
                                        <Button
                                            leftIcon={<IconFlag size={iconSize} />}
                                            variant="subtle"
                                            color="secondary"
                                        >
                                            Report campaign
                                        </Button>
                                    )}
                                </Stack>
                            </Grid.Col>
                            <Grid.Col lg={4}>
                                <Stack>
                                    {!matchesMobile && (
                                        <Paper {...paperProps}>
                                            <Stack spacing="sm">
                                                {username === Loans?.username ? (
                                                    <Button variant="outline" size="xl">Update Loans</Button>
                                                ) : !final ? (
                                                    <Button size="xl" onClick={openBidModal}>BID for Lend</Button>
                                                ) : (
                                                    <Button disabled size="xl">Final</Button>
                                                )}
                                                {final ? (
                                                    <Button size="xl">Transaction Page</Button>
                                                ) : null}
                                                <Button
                                                    leftIcon={<IconShare size={iconSize} />}
                                                    variant="outline"
                                                    onClick={open}
                                                    color="blue"
                                                >
                                                    Share with friends
                                                </Button>
                                                <Button
                                                    leftIcon={following ? <IconHeartFilled size={iconSize} /> : <IconHeart size={iconSize} />}
                                                    variant={following ? 'filled' : 'subtle'}
                                                    color="secondary"
                                                    onClick={() => {
                                                        setFollowing();
                                                        notifications.show({
                                                            title: 'Notification',
                                                            message: `${following ? 'Following' : 'Unfollowed'} this campaign`,
                                                            withBorder: true,
                                                        });
                                                    }}
                                                >
                                                    {following ? 'Unfollow' : 'Follow'} this campaign
                                                </Button>
                                            </Stack>
                                        </Paper>
                                    )}
                                    <Paper {...paperProps}>
                                        <Text {...subTitleProps} mb="md">Interested Lender</Text>
                                        <LenderCard username={Loans?.username} />
                                    </Paper>
                                    {matchesMobile && (
                                        <Button
                                            leftIcon={<IconFlag size={iconSize} />}
                                            variant="subtle"
                                            color="secondary"
                                        >
                                            Report campaign
                                        </Button>
                                    )}
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Container>
                ) : (
                    <NotFound />
                )}
            </Box>

            {/* Modal for bidding */}
            <Modal
                opened={bidModalOpened}
                onClose={closeBidModal}
                title="Bid for Lend"
                size="lg"
            >
                <Stack>
                    <Select
                        label="EMI Type"
                        placeholder="Select EMI Type"
                        data={[
                            { value: 'EMI', label: 'EMI' },
                            { value: 'One Time', label: 'One Time' },
                            { value: 'Wish', label: 'Wish' },
                        ]}
                        value={bidType}
                        onChange={setBidType}
                    />
                    <DateInput
                        label="Maximum Time"
                        placeholder="Select Date"
                        value={maxTime}
                        onChange={setMaxTime}
                    />
                    <NumberInput
                        label="Interest (%)"
                        placeholder="Enter Interest"
                        value={interest}
                        onChange={setInterest}
                        precision={2}
                        min={0}
                        max={100}
                    />
                    <Group mt="lg" position="right">
                        <Button onClick={handleBidSubmit}>Submit</Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Modal for sharing */}
            <Modal
                opened={opened}
                onClose={close}
                title="Share Loan with Friends"
                size="lg"
            >
                <Group>
                    {/* Implement your sharing functionality here */}
                </Group>
            </Modal>
        </>
    );
};

export default LoanDetailsPage;
