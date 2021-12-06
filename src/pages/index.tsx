import { Cart, ProductItem, ProductLoader, Header } from '@/components';
import { ALL_PRODUCTS } from '@/queries';
import CurrencyContext from '@/Store/CurrencyStore/CurrencyContext';
import { useQuery } from '@apollo/client';
import {
	Box,
	Container,
	Grid,
	Text,
	Button,
	Spacer,
	Tabs,
	TabList,
	Tab,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Icon,
	Stack,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Breadcrumbs } from '@/components';
import Head from 'next/head';
import { useContext, useState, useEffect, useCallback } from 'react';
import { TProduct } from '../types/index';

export default function Home () {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currency } = useContext(CurrencyContext);
	const [categoryIndex, setCategoryIndex] = useState<number>(0)
	const [sortBy, setSortBy] = useState<string>("")
	const { loading, error, data } = useQuery<{ products: TProduct[] }>(ALL_PRODUCTS, {
		variables: { currency },
	});

	const [productData, setProductData] = useState<{ products: TProduct[] }>({ products: [] });

	useEffect(() => {
		if (data && data.products) {
			setProductData(data);
		}
	}, [data]);
	const variant = useBreakpointValue({ base: true, md: false });

	const handleCategoryIndexChange = useCallback((index) => {
		setCategoryIndex(index);
		//Filter as required
	}, [])

	const handleSortByChange = useCallback((sort) => () => {
		setSortBy(sort);
		let sortedProducts: TProduct[] = [...productData.products]

		sortedProducts.sort((a, b) => {
			return sort === "Lowest Price" ? (a.price - b.price) : (sort === "Highest Price" ? (b.price - a.price) : (b.id - a.id))
		})
		setProductData({ products: sortedProducts })
	}, [productData])

	return (
		<>
			<Header cartOnOpen={onOpen} />
			<Box py="64px" bg="brand.200">
				<Head>
					<title>Products | Lumin Skincare</title>
					<link rel="icon" href="/favicon.png" />
				</Head>

				<Container
					maxW="10xl"
					px={5}
					py={5}
				>
					<Breadcrumbs />
				</Container>

				<Container
					maxW="10xl"
					px={5}
					py={5}
				>

					<Stack
						bg="url(https://cdn.shopify.com/s/files/1/2960/5204/files/HERO_1264x352_0dfec503-d85d-4a9b-a0aa-d0b92cae2727.jpg?v=1637235066) center center / cover no-repeat;"
						h={300}
						mb="2rem"
					>
						<Flex
							direction="column"
							bg="rgba(0,0,0,0.7)"
							alignItems="center"
							justifyContent="center"
							w="100%"
							h="100%"
						>
							<Text color="white" fontSize="3rem" mb="1rem" fontFamily="freight-display, serif;">
								New to Skincare?
							</Text>

							<Text color="white" mb="1rem">
								Unlock your personalized skincare routine today.
							</Text>

							<Text bg="white" px="1.5rem" py="1rem">
								Start Shopping
							</Text>

						</Flex>

					</Stack>
					<Flex display={{ base: 'none', lg: 'flex' }} mb="2rem">
						<Tabs index={categoryIndex} onChange={handleCategoryIndexChange} variant='unstyled'>
							<TabList>
								<Tab _selected={{ fontWeight: '600', borderBottom: '3px solid black' }}>All</Tab>
								<Tab isDisabled _selected={{ fontWeight: '600', borderBottom: '3px solid black' }}>Best Sellers 🎉</Tab>
								<Tab isDisabled _selected={{ fontWeight: '600', borderBottom: '3px solid black' }}>Face</Tab>
								<Tab isDisabled _selected={{ fontWeight: '600', borderBottom: '3px solid black' }}>Hair & Body</Tab>
								<Tab isDisabled _selected={{ fontWeight: '600', borderBottom: '3px solid black' }}>Sets</Tab>
								<Tab isDisabled _selected={{ fontWeight: '600', borderBottom: '3px solid black' }}>Accessories</Tab>
							</TabList>
						</Tabs>
						<Spacer />
						<Flex>
							<Menu isOpen={false}>
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon />}
									leftIcon={<Icon viewBox='0 0 17 16' >
										<path d="M4.5 8H12.5" stroke="black" stroke-width="0.967953" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M2 5H15" stroke="black" stroke-width="0.967953" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M7 11H10" stroke="black" stroke-width="0.967953" stroke-linecap="round" stroke-linejoin="round"></path>
									</Icon>}
									border="1px solid #ACAFAD"
									borderColor="brand.300"
									borderRadius={3}
									w={{ base: 'block' }}
									h="50px"
									fontSize="1rem"
									fontWeight="normal"
									bg="white"
									margin="3px"
									mx="1rem"
								>
									Filters
								</MenuButton>
								<MenuList isDisabled>

								</MenuList>
							</Menu>

							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon />}
									border="1px solid #ACAFAD"
									borderColor="brand.300"
									borderRadius={3}
									w={{ base: 'block' }}
									h="50px"
									fontSize="1rem"
									fontWeight="normal"
									bg="white"
									margin="3px"
								>
									<Flex>
										<Text>
											Sort by:
										</Text>
										<Text onClick={handleSortByChange("")} fontWeight="600">
											{sortBy}
										</Text>
										{sortBy && sortBy.length > 0 && <SmallCloseIcon onClick={handleSortByChange("")} />}
									</Flex>
								</MenuButton>
								<MenuList>
									<MenuItem onClick={handleSortByChange("Lowest Price")}>Lowest Price</MenuItem>
									<MenuItem onClick={handleSortByChange("Highest Price")}>Highest Price</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</Flex>
					<Box bg="brand.400" py={16}>
						<Container maxW="8xl" px={5}>
							<Grid
								templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
								gridColumnGap={{ base: 3, md: 6, lg: 9 }}
								gridRowGap="28"
							>
								{(loading || error) && productData.products.length < 1 ? (
									<>
										<ProductLoader />
										<ProductLoader />
										<ProductLoader />
										{variant && <ProductLoader />}
									</>
								) : (
									<>
										{productData &&
											productData.products.map((product) => (
												<ProductItem product={product} key={product.id} onOpen={onOpen} />
											))}
									</>
								)}
							</Grid>
						</Container>
					</Box>
					{/* <Box mb={{ base: '1.5rem', lg: '0px' }}>
            <Text
              as="h1"
              fontSize={{ base: '24px', md: '32px', lg: '48px' }}
              fontFamily="freight-display-pro,serif"
            >
              All Products
            </Text>
            <Text mt={{ base: '0.5rem', md: '0.75rem' }} fontSize={{ base: '13px', md: '16px' }}>
              A 360° look at Lumin
            </Text>
          </Box>
          <Select
            border="1px solid #ACAFAD"
            borderColor="brand.300"
            borderRadius={0}
            w={{ base: 'block', lg: '400px' }}
            h="50px"
            fontSize="1rem"
            bg="white"
          >
            <option>Filter By</option>
          </Select> */}
				</Container>

			</Box>
			<Cart data={productData} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
		</>
	);
}
