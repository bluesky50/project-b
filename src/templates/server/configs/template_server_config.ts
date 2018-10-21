import { IArgs } from '../../../interfaces/IArgs';

export const templateServerConfig = 
`const serverConfig = {
	appName: '{{DYNAMIC:SERVER_NAME}}',
	port: {{DYNAMIC:SERVER_PORT}},
	host: 'localhost',
	env: 'dev',
	dbUri: '{{DYNAMIC:DB_URI}}',
	gqlEndpoint: '/graphql',
	gqlSubscriptionsEndpoint: '/subscriptions'
}

export default serverConfig;
`;

export const dictionaryServerConfig = {
	'DYNAMIC:SERVER_NAME': getServerName,
	'DYNAMIC:SERVER_PORT': getServerPort,
	'DYNAMIC:DB_URI': getServerDbUri,
}

function getServerName(args: IArgs): string {
	return args.appInfo.serverInfo.name;
}

function getServerPort(args: IArgs): string {
	return args.appInfo.serverInfo.port;
}

function getServerDbUri(args: IArgs): string {
	return args.appInfo.serverInfo.dbUri;
}
