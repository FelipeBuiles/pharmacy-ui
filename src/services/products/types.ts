export interface Product {
	id: string;
	name: string;
	tax: number;
	barcode: string;
	group: Group[];
}

export interface Group {
	name: string;
	amount: number;
	salePrice: number;
}
