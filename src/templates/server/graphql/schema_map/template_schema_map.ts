import partialGqlSchemaMapImport from './partial_schema_map_import';
import partialPushTypeDefToArray from './partial_push_type_def';
import partialTypeDefName from './partial_type_def_name';
import partialResolverName from './partial_type_resolver_name';

import { templateBuilder } from '../../../../builders/templateBuilders';
import { lowerCaseFirstLetter } from '../../../../utils/stringUtils';
import { IArgs } from '../../../../interfaces/IArgs';

const typeDefsJoin = "const TypeDefs: string = `\n${types.join(REPLACE_WITH_NEW_LINE)}\n`;";
const queriesJoin = "const QueryDef: string = `\ntype Query {\n${queries.join(REPLACE_WITH_NEW_LINE')}\n}\n`;";
const mutationsJoin = "const MutationDef: string = `\ntype Mutation {\n${mutations.join('\n')}\n}\n`;";
const subscriptionsJoin = "const SubscriptionDef: string = `\ntype Subscription {\n${subscriptions.join('\n')}\n}\n`;";

export const templateGqlSchemaMap =  
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

export const dictionaryGqlSchemaMap = {
	'DYNAMIC:SCHEMA_MAP_IMPORTS': getImports,
	'DYNAMIC:PUSH_TYPE_DEFS_TO_ARRAY': getPushStatementForTypeDefs,
	'DYNAMIC:RESOLVERS_FOR_MERGE': getResolversList,
	'PARTIAL:TYPE_DEF_NAME': partialTypeDefName,
	'PARTIAL:TYPE_RESOLVER_NAME': partialResolverName,
};

function getImports(args: IArgs) {
	return dynamicHandler(args, partialGqlSchemaMapImport, '\n');
}

function getPushStatementForTypeDefs(args: IArgs) {
	return dynamicHandler(args, partialPushTypeDefToArray, '\n');
}

function getResolversList(args: IArgs) {
	return dynamicHandler(args, partialResolverName, ', ');
}

function dynamicHandler(args: any, customTemplate: string, joinChar: string) {
	let cache: string[] = [];
	args.appInfo.dataModel.dataObjects.forEach((object: any) => {
		const newDict = {
			'VAR:OBJECT_NAME': object.objectName,
			'VAR:LOWERCASE_OBJECT_NAME': lowerCaseFirstLetter(object.objectName)
		};
		const newArgs = {
			...args,
			template: customTemplate,
			templateDictionary: {
				...args.templateDictionary,
				...newDict
			}
		} 
		const completedImportTemplate = templateBuilder(newArgs);
		cache.push(completedImportTemplate);
	});
	
	return cache.join(joinChar);
}

export default templateGqlSchemaMap;