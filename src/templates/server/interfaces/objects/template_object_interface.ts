import { IArgs } from '../../../../interfaces/IArgs';
import partialObjectInterfaceProperties from './partial_object_interface_property';
import { containsBrackets, removeBrackets, removeExMark } from '../../../../utils/stringUtils';
import { templateBuilder } from '../../../../builders/templateBuilders';

export const templateObjectInterface = 
`interface I{{DYNAMIC:OBJECT_NAME}} {
	{{DYNAMIC:INTERFACE_OBJECT_PROPERTIES}}
}

export default I{{DYNAMIC:OBJECT_NAME}};

`;

export const dictionaryObjectInterface = {
	'DYNAMIC:OBJECT_NAME': getObjectName,
	'DYNAMIC:INTERFACE_OBJECT_PROPERTIES': getObjectProperties,
	'PARTIAL:OBJECT_PROPERTY_ENTRY': partialObjectInterfaceProperties
}

function getObjectName(args: IArgs) {
	return args.dataModelInfo.objectName;
}

function getObjectProperties(args: IArgs) {
	return dynamicHandler(args, dictionaryObjectInterface['PARTIAL:OBJECT_PROPERTY_ENTRY'], '\n');
}

function modifyPropertyType(type: string): string {
	let result = type;
	if (result) {
		if (type.indexOf('ObjectId') !== -1) {
			result = result.replace(new RegExp('ObjectId', 'g'), 'String');
		}
	
		if (containsBrackets(result)) {
			return `Array<${removeExMark(removeBrackets(result)).toLowerCase()}>`;
		}
		return removeExMark(removeBrackets(result)).toLowerCase();
	} 
	return 'any';
}

function determinRequiredMark(type: string): string {
	if (type.charAt(-1) === '!') {
		return '';
	}
	return '?';
}

function dynamicHandler(args: IArgs, customTemplate: string, joinChar: string) {
	let cache: string[] = [];
	Object.entries(args.dataModelInfo.objectSchema).forEach(([key, value]) => {
		const newDict = {
			'VAR:PROPERTY_NAME': key,
			'VAR:PROPERTY_TYPE': modifyPropertyType(value),
			'VAR:REQUIRED_MARK': determinRequiredMark(value)
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

export default templateObjectInterface;