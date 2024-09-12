import {Box, BoxProps, Container, Flex, Select, SimpleGrid, Stack, TextInput, Title, TitleProps} from "@mantine/core";
import campaignsData from "../data/Campaigns.json";
import LoanCard from "../components/LoanCard";
import {Helmet} from "react-helmet";
import {useMediaQuery} from "@mantine/hooks";
import  { useState, useEffect } from 'react';

const LoansPage = (): JSX.Element => {
    const matchesMobile = useMediaQuery('(max-width: 768px)');

    const boxProps: BoxProps = {
        mt: matchesMobile ? 4 : 24,
        mb: matchesMobile ? 4 : 48,
        py: matchesMobile ? 16 : 24
    }

    const titleProps: TitleProps = {
        size: 32,
        weight: 700,
        mb: "lg",
        transform: 'capitalize',
        sx: {lineHeight: '40px'}
    }
    const [loansData, setLoansData] = useState([{ id: 0 ,data:[{id: 0, title: "", amountRaised: 0, daysLeft: 0, contributors: 0, mainImage: ""}]}]);

      // Function to fetch loan data
      const fetchLoanData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/loans'); // Adjust the URL if needed

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
         setLoansData(data);
        } catch (error) {
          console.error('Error fetching loan data:', error);
        }
      };
      // Fetch data when the component mounts
      useEffect(() => {
        fetchLoanData();
      }, []); // Empty dependency array means this effect runs once on mount
    
    
    const items = loansData.map(c => (<LoanCard key={c.id} data={c} showActions={true}/>))

    return (
        <>
            <Helmet>
                <title>Discover campaigns to fund</title>
            </Helmet>
            <Box>
                <Container size="lg">
                    <Stack>
                        <Box {...boxProps}>
                            <Title {...titleProps} align="center">Discover Loans to Lend</Title>
                        </Box>
                        <Flex
                            justify="space-between"
                            gap={{base: 'sm', sm: 'lg'}}
                            direction={{base: 'column-reverse', sm: 'row'}}
                        >
                            <TextInput placeholder="search campaigns..." sx={{width: 500}}/>
                            <Flex align="center" gap="sm" justify={{base: 'space-between', sm: 'flex-start'}}>
                                <Select
                                    label=""
                                    placeholder="campaigns in"
                                    defaultValue=""
                                    data={[
                                        {value: '10', label: 'show: 10'},
                                        {value: '25', label: 'show: 25'},
                                        {value: '50', label: 'show: 50'},
                                        {value: '100', label: 'show: 100'},
                                    ]}
                                />
                                <Select
                                    label=""
                                    placeholder="Explore"
                                    defaultValue="featured"
                                    data={[
                                        {value: 'featured', label: 'sort by: featured'},
                                        {value: 'popular', label: 'sort by: popular'},
                                        {value: 'latest', label: 'sorty by: latest'},
                                    ]}
                                />
                            </Flex>
                        </Flex>
                        <SimpleGrid
                            cols={3}
                            spacing="lg"
                            breakpoints={[
                                {maxWidth: 'md', cols: 2, spacing: 'md'},
                                {maxWidth: 'sm', cols: 1, spacing: 0},
                            ]}
                        >
                            {items}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default LoansPage;
