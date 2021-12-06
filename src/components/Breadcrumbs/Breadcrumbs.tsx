import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Icon,
} from '@chakra-ui/react'

const Breadcrumbs = () => {
	return (
		<Breadcrumb separator={<Icon h="6px" viewBox="0 0 6 6"><path d="M3 0L3.81027 2.18973L6 3L3.81027 3.81027L3 6L2.18973 3.81027L0 3L2.18973 2.18973L3 0Z" fill="black"></path></Icon>}>
			<BreadcrumbItem isCurrentPage>
				<BreadcrumbLink href='#'>Home</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem>
				<BreadcrumbLink href='#'>All products</BreadcrumbLink>
			</BreadcrumbItem>
		</Breadcrumb>
	);
}

export default Breadcrumbs;
