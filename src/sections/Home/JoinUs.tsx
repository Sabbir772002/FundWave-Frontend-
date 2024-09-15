import {
    Avatar,
    Box,
    BoxProps,
    Button,
    Flex,
    Image,
    Progress,
    Stack,
    Text,
    TextProps,
    ThemeIcon,
    TitleProps
} from "@mantine/core";
import {IconUsers, IconWorld} from "@tabler/icons-react"
import {TitleBadge} from "../../components";
import {useMediaQuery} from "@mantine/hooks";
import { Link } from "react-router-dom";

interface IProps {
    boxProps: BoxProps
    titleProps?: TitleProps,
    subtitleProps?: TextProps
}

const JoinUsSection = ({boxProps, subtitleProps}: IProps) => {
    const matchesMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Box {...boxProps}>
            <Flex gap={{base: 'sm', sm: 'lg'}} direction={{base: 'column-reverse', md: 'row'}}>
                <Stack>
                    <TitleBadge title='Open partnership - Start your journey'/>
                    <Text {...subtitleProps}>Almost is never enough</Text>
                    <Flex gap="xs">
                        <ThemeIcon size="xl" color="secondary" variant="filled">
                            <IconWorld/>
                        </ThemeIcon>
                        <Stack spacing={2}>
                            <Text weight={600}>UIU community</Text>
                            <Text size="sm">Reach our community that can make us strong and useful.</Text>
                        </Stack>
                    </Flex>
                    <Flex gap="xs">
                        <ThemeIcon size="xl" color="secondary" variant="filled">
                            <IconUsers/>
                        </ThemeIcon>
                        <Stack spacing={2}>
                            <Text weight={600}>Crowdfunding</Text>
                            <Text size="sm">Affordable ceiling and are very suitable for novice funders.</Text>
                        </Stack>
                    </Flex>
                    <Avatar.Group spacing="sm">
                        <Avatar
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            radius="xl"/>
                        <Avatar
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            radius="xl"/>
                        <Avatar
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            radius="xl"/>
                        <Avatar
                            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            radius="xl"/>
                        <Avatar radius="xl">+5</Avatar>
                    </Avatar.Group>
                    <Progress value={50}/>
                    <Button component={Link} to="/signup">
                    Join Us</Button>
                    </Stack>
                <Box mx={matchesMobile ? 0 : 'auto'}>
                    <Image
                        src="https://scontent.fdac19-1.fna.fbcdn.net/v/t39.30808-6/457298825_952789776875078_1004883036196412916_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFWxw7IPepcIKdxX5E3rDpFSog-1jEi8K1KiD7WMSLwrb9Nehmwc16VUPY_xDs4zzbVfCz4MiF8zT33p6tsB5Ef&_nc_ohc=JDsilFm_NPIQ7kNvgFRJJaB&_nc_ht=scontent.fdac19-1.fna&oh=00_AYBMoYYZmeF9NO5IVq2piQuajBX8kXeD86ctakt3T0rQOQ&oe=66E90558"
                        width={matchesMobile ? '100%' : 500}
                        height={400}
                        radius="sm"
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default JoinUsSection;
