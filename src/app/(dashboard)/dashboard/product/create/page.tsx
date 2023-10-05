import { ProductForm } from '@/components/Form/Product';
import { PageContainer } from '@/components/PageContainer/PageContainer';

export default function NewProduct() {
	return (
		<PageContainer title="New Product">
			<ProductForm />
		</PageContainer>
	);
}
