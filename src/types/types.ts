export type Product = {
	name: string;
	imgUrl: string;
	size: {
		type: string;
		value: number;
	};
	barcode: number;
	company: string;
	brand: string;
	description: string;
	price: number;
	careType: Array<string> | null;
};
