export const templateOrmAdapterInterface =
`interface IOrmAdapter {
	dbUrl: string;
	connect(): void;
	disconnect(): void;
	getModels(): object;
	getModel(model: String): any;
}

export default IOrmAdapter;

`;

export default templateOrmAdapterInterface;
