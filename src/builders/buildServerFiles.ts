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

// Lib Templates
import { templateDebugger } from '../templates/server/other/template_debugger';
import { templateErrors } from '../templates/server/other/template_errors';
import { templateMiddleware } from '../templates/server/other/template_middleware';

// Util Templates
import { templateInitServerHelpers } from '../templates/server/other/template_init_server_helpers';
import { templateResolverHelpers } from '../templates/server/other/template_resolver_helpers';
import { templateServerHelpers } from '../templates/server/other/template_server_helper';
import { templateTokenHelpers } from '../templates/server/other/template_token_helpers';

import { writeFileWithExistsCheck, mkdirp, pathExists } from '../utils/fileUtils';
/**
 * Template Building Functions for files that do not rely on data model objects.
 * - Classes
 * - Configs
 * - Lib
 * - Utils
 */

const fileOutputPath = './output/src';
const defaultFileExtension = '.ts';

export function buildClasseFiles() {
	const defaultArgs: IArgs = {
		template: '',
		templateDictionary: null, // Dictionary not required for class files
		appInfo: {
			serverInfo,
			dataModel
		},
		dataModelInfo: { // Data model info not required for class files, only used for rendering of specific object templates
			objectName: '',
			objectSchema: {}
		}
	}

	const outputDir = '/classes';
	// const path = normalizePath(__dirname + fileOutputPath + outputDir);
	const path = fileOutputPath + outputDir;
	if (!pathExists(path)) {
		mkdirp(path);
	}

	const classTemplates = [{template:templateServerClass, fileName: 'Server'}, {template:templateOrmAdapterClass, fileName: 'OrmAdapter'}];
	classTemplates.forEach((entry) => {
		const args = {
			...defaultArgs,
			template: entry.template
		};
		writeFileWithExistsCheck(path + `/${entry.fileName}` + defaultFileExtension,templateBuilder(args));
	});
}

export function buildConfigFiles() {
	const defaultArgs: IArgs = {
		template: '',
		templateDictionary: null, // Dictionary not required for class files
		appInfo: {
			serverInfo,
			dataModel
		},
		dataModelInfo: { // Data model info not required for class files, only used for rendering of specific object templates
			objectName: '',
			objectSchema: {}
		}
	}

	const outputDir = '/configs';
	// const path = normalizePath(__dirname + fileOutputPath + outputDir);
	const path = fileOutputPath + outputDir;
	if (!pathExists(path)) {
		mkdirp(path);
	}

	const secretsConfigArgs = {
		...defaultArgs,
		template: templateSecrets
	}

	writeFileWithExistsCheck(path + '/secrets' + defaultFileExtension,templateBuilder(secretsConfigArgs));

	const serverConfigArgs = {
		...defaultArgs,
		template: templateServerConfig,
		templateDictionary: dictionaryServerConfig
	}
	writeFileWithExistsCheck(path + '/serverConfig' + defaultFileExtension, templateBuilder(serverConfigArgs));
}

export function buildLibFiles() {
	const defaultArgs: IArgs = {
		template: '',
		templateDictionary: null, // Dictionary not required for class files
		appInfo: {
			serverInfo,
			dataModel
		},
		dataModelInfo: { // Data model info not required for class files, only used for rendering of specific object templates
			objectName: '',
			objectSchema: {}
		}
	}

	const outputDir = '/lib';
	// const path = normalizePath(__dirname + fileOutputPath + outputDir);
	const path = fileOutputPath + outputDir;
	if (!pathExists(path)) {
		mkdirp(path);
	}

	const libTemplates = [{template: templateDebugger, fileName: 'debugger'}, {template: templateErrors, fileName: 'errors'}, {template: templateMiddleware, fileName: 'middleware'}];
	libTemplates.forEach((entry) => {
		const args = {
			...defaultArgs,
			template: entry.template
		}
		writeFileWithExistsCheck(path + `/${entry.fileName}` + defaultFileExtension, templateBuilder(args));
	});
}

export function buildUtilFiles() {
	const defaultArgs: IArgs = {
		template: '',
		templateDictionary: null, // Dictionary not required for class files
		appInfo: {
			serverInfo,
			dataModel
		},
		dataModelInfo: { // Data model info not required for class files, only used for rendering of specific object templates
			objectName: '',
			objectSchema: {}
		}
	}

	const outputDir = '/utils'
	// const path = normalizePath(__dirname + fileOutputPath + outputDir);
	const path = fileOutputPath + outputDir;
	if (!pathExists(path)) {
		mkdirp(path);
	}

	const utilTemplates = [{template: templateInitServerHelpers, fileName: 'serverInitHelpers'}, {template: templateResolverHelpers, fileName: 'resolverHelpers'}, {template: templateServerHelpers, fileName: 'serverHelpers'}, {template: templateTokenHelpers, fileName: 'tokenHelpers'}];
	utilTemplates.forEach((entry) => {
		const args = {
			...defaultArgs,
			template: entry.template
		};
		writeFileWithExistsCheck(path + `/${entry.fileName}` + defaultFileExtension, templateBuilder(args));
	});
}

export function buildDataModelFiles() {
	const defaultArgs: IArgs = {
		template: templateMongooseModel,
		templateDictionary: dictionaryMongooseModel,
		appInfo: {
			serverInfo,
			dataModel
		},
		dataModelInfo: { // Data model info not required for class files, only used for rendering of specific object templates
			objectName: '',
			objectSchema: {}
		}
	}
	
	const outputDir = "/models";
	// const path = normalizePath(__dirname + fileOutputPath + outputDir);
	const path = fileOutputPath + outputDir;
	if (!pathExists(path)) {
		mkdirp(path);
	}

	dataModel.dataObjects.forEach((object) => {
		const args = {
			...defaultArgs,
			dataModelInfo: {
				objectName: object.name,
				objectSchema: object.schema
			}
		}
		writeFileWithExistsCheck(path + `/${object.name}` + defaultFileExtension, templateBuilder(args));
	});
}

export function buildGqlFiles() {
	const defaultArgs: IArgs = {
		template: '',
		templateDictionary: null,
		appInfo: {
			serverInfo,
			dataModel
		},
		dataModelInfo: { // Data model info not required for class files, only used for rendering of specific object templates
			objectName: '',
			objectSchema: {}
		}
	}

	const outputDir = "/gql";
	// const path = normalizePath(__dirname + fileOutputPath + outputDir);
	const path = fileOutputPath + outputDir;
	if (!pathExists(path)) {
		mkdirp(path);
	}

	const gqlSchemaMapArgs = {
		...defaultArgs,
		template: templateGqlSchemaMap,
		templateDictionary: dictionaryGqlSchemaMap
	}
	writeFileWithExistsCheck(path + "/schema" + defaultFileExtension,templateBuilder(gqlSchemaMapArgs));

	const gqlResolverArgs = {
		...defaultArgs,
		template: templateResolvers,
	}
	writeFileWithExistsCheck(path + '/resolvers' + defaultFileExtension,templateBuilder(gqlResolverArgs));

	dataModel.dataObjects.forEach((object) => {
	
		const typeResolverArgs = {
			...defaultArgs,
			template: templateTypeResolver,
			templateDictionary: dictionaryResolver,
			dataModelInfo: {
				objectName: object.name,
				objectSchema: object.schema
			}
		}
		
		// const objectPath = normalizePath(__dirname + path + `${object.name}`);
		const objectPath = path + `/${object.name}`;
		if (!pathExists(objectPath)) {
			mkdirp(objectPath);
		}

		writeFileWithExistsCheck(objectPath + '/typeDef' + defaultFileExtension, templateBuilder(typeResolverArgs));

		const typeDefArgs = {
			...defaultArgs,
			template: templateTypeDef,
			templateDictionary: dictionaryTypeDef,
			dataModelInfo: {
				objectName: object.name,
				objectSchema: object.schema
			}
		}
		writeFileWithExistsCheck(objectPath + '/resolvers' + defaultFileExtension, templateBuilder(typeDefArgs));
	});
}

export function buildInterfaceFiles() {
	const defaultArgs: IArgs = {
		template: '',
		templateDictionary: null,
		appInfo: {
			serverInfo,
			dataModel
		},
		dataModelInfo: { // Data model info not required for class files, only used for rendering of specific object templates
			objectName: '',
			objectSchema: {}
		}
	}
	
	const outputDir = '/interfaces';
	// const path = normalizePath(__dirname + fileOutputPath + outputDir);
	const path = fileOutputPath + outputDir;
	if (!pathExists(path)) {
		mkdirp(path);
	}

	const classTemplates = [{template: templateOrmAdapterInterface, fileName: 'IOrmAdapter'}, {template: templateServerInterface, fileName: 'IServer'}]
	classTemplates.forEach((entry) => {
		const args = {
			...defaultArgs,
			template: entry.template
		}
		const classFilesPath = path + "/class";
		if (!pathExists(classFilesPath)) {
			mkdirp(classFilesPath);
		}
		writeFileWithExistsCheck(classFilesPath + `/${entry.fileName}` + defaultFileExtension, templateBuilder(args));
	})

	const gqlTemplates = [{template: templateDefinitionInterface, fileName: 'IDefinition'}, {template: templateGqlResolverContextInterface, fileName: 'IResolverContext'}, {template: templateGqlResolverMapInterface, fileName: 'IResolverMap'}]
	gqlTemplates.forEach((entry) => {
		const args = {
			...defaultArgs,
			template: entry.template
		}
		const gqlFilesPath = path + "/gql";
		if (!pathExists(gqlFilesPath)) {
			mkdirp(gqlFilesPath);
		}
		writeFileWithExistsCheck(gqlFilesPath + `/${entry.fileName}` + defaultFileExtension, templateBuilder(args));
	})

	dataModel.dataObjects.forEach((object) => {
		const args = {
			...defaultArgs,
			template: templateObjectInterface,
			templateDictionary: dictionaryObjectInterface,
			dataModelInfo: {
				objectName: object.name,
				objectSchema: object.schema
			}
		}
		// const objectPath = normalizePath(__dirname + path + '/models');
		const objectPath = path + '/models';
		if (!pathExists(objectPath)) {
			mkdirp(objectPath);
		}

		writeFileWithExistsCheck(objectPath + `/I${object.name}` + defaultFileExtension, templateBuilder(args));
	})
}