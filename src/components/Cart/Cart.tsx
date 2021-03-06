import { TDrawer, TProduct, Currency } from '@/types';
import {
	Box,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerFooter,
	Button,
	Flex,
	Spacer,
	Select,
	VStack,
	useBreakpointValue,
} from '@chakra-ui/react';
import CartContext from '@/Store/CartStore/cartContext';
import { cartItem } from '@/Store/CartStore/types';
import { useContext, useMemo } from 'react';

import { CartItem } from '../CartItem';
import CurrencyContext from '../../Store/CurrencyStore/CurrencyContext';

type TCart = Pick<TDrawer, 'onOpen' | 'isOpen' | 'onClose'> & {
	data:
	| {
		products: TProduct[];
	}
	| undefined;
};

const Cart = ({ onOpen, isOpen, onClose, data }: TCart) => {
	const keys = Object.keys(Currency);
	const variant = useBreakpointValue({ base: 'md', lg: 'lg' });
	const { cart } = useContext(CartContext);
	const { currency, changeCurrency } = useContext(CurrencyContext);

	const productData = useMemo(() => data?.products, [data]);
	const cartData = useMemo(() => cart, [cart]);

	const filterCartItemsInProduct = useMemo(() => {
		const filteredArray: cartItem[] = [];
		productData?.forEach((obj) => {
			cartData.forEach((item) => {
				if (item.productId === obj.id) {
					filteredArray.push({ ...item, ...obj });
				}
			});
		});
		return filteredArray;
	}, [productData, cartData]);

	const subTotal = filterCartItemsInProduct.reduce(
		(prev, cur) => prev + Number(cur.quantity ?? 0) * Number(cur.price ?? 0),
		0,
	);

	return (
		<Drawer placement="right" onClose={onClose} isOpen={isOpen} size={variant}>
			<DrawerOverlay
				style={{
					backdropFilter: 'blur(5px)',
				}}
				bg="rgba(205, 209, 206,0.8)"
			>
				<DrawerContent bg="rgb(242, 242, 239)">

					<DrawerHeader textAlign="center">
						<VStack>
							<Text> My Shopping Cart</Text>
							<Flex sx={{ width: '100%' }}>
								<DrawerCloseButton
									top="72px"
									left={6}
									border="1px solid rgb(198, 204, 199)"
									w="1.5rem"
									h="1.5rem"
									borderRadius="100%"
								>
									<Box
										transform="rotateY(-180deg)"
										width="12px"
										height="12px"
										as="svg"
										viewBox="0 0 256 512"
										focusable="false"
										role="presentation"
									>
										<path
											fill="currentColor"
											d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"
										/>
									</Box>
								</DrawerCloseButton>
								<Spacer />
								<Select
									border="0px solid #ACAFAD"
									borderRadius={0}
									w="80px"
									h="28px"
									fontSize="12px"
									bg="transparent"
									mt={2}
									onChange={(e) => changeCurrency(e.target.value as Currency)}
									defaultValue={currency}
								>
									{keys.map((key, cursor) => (
										<option value={key as Currency} key={`currency-${ cursor }`}>
											{key}
										</option>
									))}
								</Select>
							</Flex>
						</VStack>

					</DrawerHeader>
					<DrawerBody>
						{filterCartItemsInProduct && filterCartItemsInProduct.length > 0 ? (
							<>
								{filterCartItemsInProduct.map((filteredData, index) => (
									<CartItem key={filteredData.id} data={filteredData} />
								))}
							</>
						) : (
							<VStack>
								<Text textAlign="center" fontSize='sm'>There are no items in your cart.</Text>
								<Text textAlign="center" fontSize='sm' as="u"> {"Get shopping >>"} </Text>
							</VStack>

						)}

						{/* <CartItem />
						<CartItem />
						<CartItem /> */}
					</DrawerBody>
					{filterCartItemsInProduct && filterCartItemsInProduct.length > 0 && <DrawerFooter
						display="block"
						borderTop="1px solid #d0d0d0"
						py={10}
					>
						<Flex justify="space-between">
							<Text>Subtotal</Text>
							<Box fontSize={{ base: '13px', md: '16px' }}>
								<Text as="span" mr={1}>
									{currency}
								</Text>
								{subTotal}
							</Box>
						</Flex>


						<Button
							onClick={onOpen}
							mt={15}
							h="50px"
							bg="brand.100"
							fontWeight="normal"
							w="full"
							color="rgb(252, 252, 249)"
							borderRadius={0}
							mx="auto"
							textTransform="uppercase"
							_hover={{
								background: 'brand.500',
							}}
							_active={{
								background: 'brand.500',
							}}
							letterSpacing="0.2rem"
							fontSize={{ base: '12px', md: '12px' }}
						>
							Proceed to checkout
						</Button>
					</DrawerFooter>}
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	);
};

export default Cart;
