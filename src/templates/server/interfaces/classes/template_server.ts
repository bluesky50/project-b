export const templateServerInterface =
`interface IServer {
	app: any;
	ormAdapter: any;
	httpServer: any;
	run(): void;
	close(): void;
}

export default IServer;

`;

export default templateServerInterface;