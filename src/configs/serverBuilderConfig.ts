const serverBuilderConfig = {
	name: "nexus",
	dbUri: "mongodb://localhost/",
	port: "5000",
	type: 'gql', // 'gql' or 'rest',
	args: {
		useDataModelForBuildStructure: true,
		buildRoutes: true,
		buildControllers: true,
		buildModels: true,
		buildEndpointTests: true,
		buildEndpointDocumentation: true,
	},
	other: {
		routeTypes: ['GET', 'PUT', 'POST', 'DELETE']
	}
};

export default serverBuilderConfig;