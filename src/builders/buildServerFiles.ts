import dataModel from '../configs/dataModelConfig';
import serverInfo from '../configs/serverBuilderConfig';
import { IArgs } from '../interfaces/IArgs';
import { templateBuilder } from './templateBuilders';

// Class Templates
import { templateServerClass } from '../templates/server/classes/template_server';
import { templateOrmAdapterClass, } from '../templates/server/classes/template_ormAdapter';

// Config Templates
import { templateSecrets } from '../templates/server/configs/template_secrets';
import { templateServerConfig, dictionaryServerConfig } from '../templates/server/configs/template_server_config';

// Data Model Templates 
import { templateMongooseModel, dictionaryMongooseModel } from '../templates/server/data_models/template_mongoose_model';

// GQL Templates
import { templateGqlSchemaMap, dictionaryGqlSchemaMap } from '../templates/server/graphql/schema_map/template_schema_map';
import { templateResolvers } from '../templates/server/graphql/resolvers/template_resolver';
import { templateTypeResolver, dictionaryResolver } from '../templates/server/graphql/types/template_resolver';
import { templateTypeDef, dictionaryTypeDef } from '../templates/server/graphql/types/template_type_def';

// Interface Templates 
import { templateOrmAdapterInterface } from '../templates/server/interfaces/classes/template_ormAdapter';
import { templateServerInterface } from '../templates/server/interfaces/classes/template_server';
import { templateDefinitionInterface } from '../templates/server/interfaces/gql/template_definition';
import { templateGqlResolverContextInterface } from '../templates/server/interfaces/gql/template_resolver_context';
import { templateGqlResolverMapInterface } from '../templates/server/interfaces/gql/template_resolver_map';
import { templateObjectInterface, dictionaryObjectInterface } from '../templates/server/interfaces/objects/template_object_interface';

// Other Templates
import { templateDebugger } from '../templates/server/other/template_debugger';
import { templateErrors } from '../templates/server/other/template_errors';
import { templateInitServerHelpers } from '../templates/server/other/template_init_server_helpers';
import { templateMiddleware } from '../templates/server/other/template_middleware';
import { templateResolverHelpers } from '../templates/server/other/template_resolver_helpers';
import { templateServerHelpers } from '../templates/server/other/template_server_helper';
import { templateTokenHelpers } from '../templates/server/other/template_token_helpers';

const defaultArgs: IArgs = {
	template: '',
	templateDictionary: {},
	appInfo: {
		serverInfo,
		dataModel
	},
	dataModelInfo: {
		objectName: '',
		objectSchema: {}
	}
}

function buildClasses() {
	const classTemplates = [templateServerClass, templateOrmAdapterClass];
	classTemplates.forEach((template) => {
		const args = {
			...defaultArgs,
			template
		};
		templateBuilder(args);
	});
}

function buildConfigs() {

}