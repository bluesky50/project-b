import { IArgs } from "../../../../interfaces/IArgs";
import { templateBuilder } from '../../../../builders/templateBuilders';
import { lowerCaseFirstLetter } from '../../../../utils/stringUtils';

const typeDefinition = "`\ntype {{DYNAMIC:OBJECT_NAME}} {\n{{DYNAMIC:OBJECT_PROPERTIES}}\n}\n`;";
const queries = "`\n{{DYNAMIC:LOWERCASE_OBJECT_NAME}}s: [{{DYNAMIC:OBJECT_NAME}}!]!\n{{DYNAMIC:LOWERCASE_OBJECT_NAME}}(id: String!): {{DYNAMIC:OBJECT_NAME}}!\n`;";
const mutations = "`\ncreate{{DYNAMIC:LOWERCASE_OBJECT_NAME}}({{DYNAMIC:OBJECT_PROPERTIES_FOR_GQL_MUTATION}}): {{DYNAMIC:OBJECT_NAME}}\n`;";

export const templateTypeDef = `
export const typeDefs: string = ${typeDefinition}

export const queries: string = ${queries}

export const mutations: string = ${mutations}
`;

export const dictionaryTypeDef = {
	'DYNAMIC:OBJECT_NAME': getObjectName,
	'DYNAMIC:LOWERCASE_OBJECT_NAME': getLowerCaseObjectName,
	'DYNAMIC:OBJECT_PROPERTIES': getObjectProperties,
	'DYNAMIC:OBJECT_PROPERTIES_FOR_GQL_MUTATION': getObjectPropertiesForMutation,
	'PARTIAL:GQL_OBJECT_PROPERTY_ENTRY': '{{VAR:PROPERTY_NAME}}: {{VAR:PROPERTY_TYPE}}',
	'PARTIAL:GQL_MUTATION_OBJECT_PROPERTY': '{{VAR:PROPERTY_NAME}}: {{VAR:PROPERTY_TYPE}}'
}

function getObjectName(args: IArgs) {
	return args.dataModelInfo.objectName;
}

function getLowerCaseObjectName(args: IArgs) {
	return lowerCaseFirstLetter(args.dataModelInfo.objectName);
}

function getObjectProperties(args: IArgs) {
	return dynamicHandler(args, dictionaryTypeDef['PARTIAL:GQL_OBJECT_PROPERTY_ENTRY'], '\n');
}

function getObjectPropertiesForMutation(args: IArgs) {
	return dynamicHandler(args, dictionaryTypeDef['PARTIAL:GQL_MUTATION_OBJECT_PROPERTY'], ', ');
}

function modifyPropertyType(type: string): string {
	if (type.indexOf('ObjectId') !== -1) {
		return type.replace(new RegExp('ObjectId', 'g'), 'String');
	}
	return type;
}

function dynamicHandler(args: IArgs, customTemplate: string, joinChar: string) {
	
	let cache: string[] = [];
	for (const [key, value] of Object.entries(args.dataModelInfo.objectSchema)) {
		
		const newDict = {
			'VAR:PROPERTY_NAME': key,
			'VAR:PROPERTY_TYPE': modifyPropertyType(value)
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
	}

	return cache.join(joinChar);
}


export default templateTypeDef;
