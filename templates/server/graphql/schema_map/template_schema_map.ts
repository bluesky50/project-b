const typeDefsJoin = "const TypeDefs: string = `\n${types.join(REPLACE_WITH_NEW_LINE)}\n`;";
const queriesJoin = "const QueryDef: string = `\ntype Query {\n${queries.join(REPLACE_WITH_NEW_LINE')}\n}\n`;";
const mutationsJoin = "const MutationDef: string = `\ntype Mutation {\n${mutations.join('\n')}\n}\n`;";
const subscriptionsJoin = "const SubscriptionDef: string = `\ntype Subscription {\n${subscriptions.join('\n')}\n}\n`;";

const templateGqlSchemaMap =  
`import _ from 'lodash';

import IDefinition from '../interfaces/gql/IDefinition';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';

{{DYNAMIC:SCHEMA_MAP_IMPORTS}}

const types: Array<string> = [];
const queries: Array<string> = [];
const mutations: Array<string> = [];
const subscriptions: Array<string> = [];

const gqlTypeDefinitionsArray: Array<IDefinition> = [];

{{DYNAMIC:PUSH_TYPE_DEFS_TO_ARRAY}}

gqlTypeDefinitionsArray.forEach((d: IDefinition): void => {
	if (d.typeDefs) {
		types.push(d.typeDefs);
	}

	if (d.queries) {
		queries.push(d.queries);
	}

	if (d.mutations) {
		mutations.push(d.mutations);
	}

	if (d.subscriptions) {
		subscriptions.push(d.subscriptions);
	}
});

${typeDefsJoin}

${queriesJoin}

${mutationsJoin}

${subscriptionsJoin}

const gqlDefs: Array<string> = [ QueryDef, MutationDef ];
const typeDefs: Array<string> = types;
const mergedResolvers: IResolvers<any, any> = _.merge({{DYNAMIC:RESOLVERS_FOR_MERGE}});

const gqlSchema = makeExecutableSchema({
	typeDefs: [ ...gqlDefs, ...typeDefs ],
	resolvers: mergedResolvers
});

export default gqlSchema;

`;

export default templateGqlSchemaMap;