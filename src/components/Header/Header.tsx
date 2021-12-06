import {
	Box,
	Flex,
	Container,
	Button,
	Image,
	Text,
	Select,
	Link,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from '@chakra-ui/react';

import { useContext, useEffect, useRef, useState } from 'react';
import CartContext from '@/Store/CartStore/cartContext';

const Header = ({ cartOnOpen }: { cartOnOpen: () => void }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { totalQuantity } = useContext(CartContext);

	const navbar = useRef<HTMLDivElement | null>(null);
	const anchorRef = useRef<HTMLDivElement | null>(null);

	const [isVisible, setIsVisible] = useState<boolean>(false);
	// options

	const handleScroll: IntersectionObserverCallback = (entries) => {
		const spotIsVisible = entries[0].boundingClientRect.y < 0;
		if (navbar.current) {
			if (spotIsVisible) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		}
	};

	useEffect(() => {
		const scroll: (ref: HTMLDivElement | null) => void = (ref) => {
			const options = {
				root: null, // null means that root element = browser viewport.
				rootMargin: '0px', // margin around the browser viewport.
				threshhold: 0, // see below what 0 means.
			};
			const observer = new IntersectionObserver(handleScroll, options);
			if (ref) {
				observer.observe(ref);
			}
		};
		scroll(anchorRef.current);
	}, []);

	const anchor = {
		position: 'absolute',
		width: '1px',
		height: '1px',
		top: '200px',
		left: '0',
		color: 'white',
	} as React.CSSProperties;
	return (
		<>
			<div ref={anchorRef} style={anchor} id="top-of-site-pixel-anchor absolute text-white" />

			<Box
				ref={navbar}
				as="nav"
				zIndex={1}
				pos={isVisible ? 'fixed' : 'absolute'}
				top="0"
				left="0"
				alignItems="center"
				justifyContent="space-between"
				flexWrap="wrap"
				px={"18px"}
				py="12px"
				backgroundColor={'white'}
				display="flex"
				w="full"
				boxShadow="0 2px 3px -3px grey"
			>
				<Image display={{ base: 'none', lg: 'inline-block' }} src="/logo.png" alt="logo" width="auto" height="36px" />
				<Flex
					align="center"
					mr={5}
					justifyContent="center"
					display={{ base: 'none', lg: 'flex' }}
				>

					<Link ml={90} mr={20} display="block" bg="transparent" border="0px" color="black" fontSize="sm">
						Shop
					</Link>
					<Link mr={20} display="block" bg="transparent" border="0px" color="black" fontSize="sm">
						About
					</Link>
					<Link mr={20} display="block" bg="transparent" border="0px" color="black" fontSize="sm">
						Support
					</Link>
					<Link mr={20} display="block" bg="transparent" border="0px" color="black" fontSize="sm">
						Blog
					</Link>
				</Flex>
				<Button
					_hover={{
						bg: 'transparent',
						color: 'black',
					}}
					_focus={{
						bg: 'transparent',
						color: 'black',
					}}
					color="black"
					bg="transparent"
					justifyContent="center"
					alignItems="center"
					display={{ base: 'flex', lg: 'none' }}
					onClick={onOpen}
					px={0}
				>
					<svg fill="black" width="25px" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</Button>
				<Box flexShrink={0} display={{ base: 'flex' }} alignItems="center" justifyContent="center">
					<Link
						display="block"
						bg="transparent"
						border="0px"
						color="black"
						mx={5}
						w="24px"
					>
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<title>Search</title>
							<path d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M16.4434 16.4438L20.9997 21.0001" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</Link>
					<Link
						display="block"
						bg="transparent"
						border="0px"
						color="black"
						mx={5}
						w="24px"
					>
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<title>Account</title>
							<path d="M12 15C15.3137 15 18 12.3137 18 8.99997C18 5.68626 15.3137 2.99997 12 2.99997C8.68629 2.99997 6 5.68626 6 8.99997C6 12.3137 8.68629 15 12 15Z" stroke="black" stroke-width="1.49508" stroke-miterlimit="10"></path>
							<path d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493" stroke="black" stroke-width="1.49508" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</Link>
					<Button
						onClick={cartOnOpen}
						_hover={{
							bg: 'transparent',
							color: 'black',
						}}
						display="flex"
						px="0px"
						color="black"
						bg="transparent"
						w="35px"
					>
						<Image flexShrink={0} src="/cart.png" alt="cart" w="25px" h="21px" />
						<Text as="sup" fontSize="14px" fontWeight="normal">
							{totalQuantity}
						</Text>
					</Button>
					<Select
						display="block"
						py="5px"
						border="1px solid #ACAFAD"
						borderColor="brand.300"
						borderRadius={0}
						ml="1.5rem"
						w="84px"
						h="32px"
						fontSize="12px"
					>
						<option>EN</option>
					</Select>
				</Box>
			</Box>

			<Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md">
				<DrawerOverlay>
					<DrawerContent bg="rgb(242, 242, 239)" pt={10}>
						<DrawerCloseButton
							top="50px"
							border="1px solid rgb(198, 204, 199)"
							w="1.5rem"
							h="1.5rem"
							borderRadius="100%"
						>
							<Box
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
						<DrawerHeader display="flex" justifyContent="center" alignItems="center">
							<Link
								mr={10}
								display="block"
								bg="transparent"
								border="0px"
								color="black"
								fontWeight="normal"
								fontSize="11px"
							>
								Shop
							</Link>
							<Link
								ml={10}
								display="block"
								bg="transparent"
								border="0px"
								color="black"
								fontWeight="normal"
								fontSize="11px"
							>
								Help
							</Link>
						</DrawerHeader>
						<DrawerBody pt={10} pl={10}>
							<Link
								mb={7}
								display="block"
								bg="transparent"
								border="0px"
								color="black"
								fontSize="22.4px"
								fontFamily="freight-display-pro,serif"
							>
								Skin
							</Link>
							<Link
								mb={7}
								display="block"
								bg="transparent"
								border="0px"
								color="black"
								fontSize="22.4px"
								fontFamily="freight-display-pro,serif"
							>
								Hair & Body
							</Link>
							<Link
								mb={7}
								display="block"
								bg="transparent"
								border="0px"
								color="black"
								fontSize="22.4px"
								fontFamily="freight-display-pro,serif"
							>
								Sets
							</Link>
							<Link
								mb={7}
								display="block"
								bg="transparent"
								border="0px"
								color="black"
								fontSize="22.4px"
								fontFamily="freight-display-pro,serif"
							>
								Accessories
							</Link>
							<Link
								mb={7}
								display="block"
								bg="transparent"
								border="0px"
								color="black"
								fontSize="22.4px"
								fontFamily="freight-display-pro,serif"
							>
								Shop All
							</Link>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
};

export default Header;
