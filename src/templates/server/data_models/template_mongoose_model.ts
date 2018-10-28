import { containsExMark, removeExMark, containsBrackets, removeBrackets } from '../../../utils/stringUtils';
import { getAllInserts, getInsertText, getInsertCount, getAllInsertsRegex } from '../../../utils/templateParserUtils';
import GenericPropTemplate from './partial_mongoose_schema_generic_property';
import StringPropTemplate from './partial_mongoose_schema_string_property';
import ObjectPropTemplate from './partial_mongoose_schema_object_property';
import ArrayPropTemplate from './partial_mongoose_schema_object_array_property';
import { IArgs } from '../../../interfaces/IArgs';
import { insertBracketsRegex } from '../../../constants/matchingPattern';

export const templateMongooseModel = `import mongoose from 'mongoose';
import I{{DYNAMIC:OBJECT_NAME}} from '../interfaces/models/I{{DYNAMIC:OBJECT_NAME}}';

export interface I{{DYNAMIC:OBJECT_NAME}}Document extends mongoose.Document, I{{DYNAMIC:OBJECT_NAME}} {}

export interface I{{DYNAMIC:OBJECT_NAME}}Model extends mongoose.Model<I{{DYNAMIC:OBJECT_NAME}}Document> {}

const {{DYNAMIC:OBJECT_NAME}}Schema: mongoose.Schema = new mongoose.Schema({
	{{DYNAMIC:MONGOOSE_OBJECT_PROPERTIES}}
}, { versionKey: false });

const {{DYNAMIC:OBJECT_NAME}}: I{{DYNAMIC:OBJECT_NAME}}Model = mongoose.model<I{{DYNAMIC:OBJECT_NAME}}Document, I{{DYNAMIC:OBJECT_NAME}}Model>('{{DYNAMIC:OBJECT_NAME}}', {{DYNAMIC:OBJECT_NAME}}Schema, '{{DYNAMIC:OBJECT_NAME}}s');

export default {{DYNAMIC:OBJECT_NAME}};

`;

export const dictionaryMongooseModel = {
	'DYNAMIC:OBJECT_NAME': getObjectName,
	'DYNAMIC:MONGOOSE_OBJECT_PROPERTIES': createMongooseSchemaProperties 
}

function getObjectName(args: IArgs): string {
	return args.dataModelInfo.objectName;
}

function createMongooseSchemaProperties(args: IArgs): string {
	const cache: any[] = [];

	Object.entries(args.dataModelInfo.objectSchema).forEach(([key, value]) => {
		const objectPropertyPartial = getPartialForObjectProperties(key, value, args.dataModelInfo.objectName);
		cache.push(objectPropertyPartial)
	});
	return cache.join(',\n');
}

function getPartialForObjectProperties(key: string, value: string, objectName: string): any {
	const dictionary = getDictionaryForModelTemplate(key, value, objectName);
	// console.log(dictionary);
	const template = getModelTemplate(value);
	// console.log(template);
	const result = basicPartialBuilderForVars(template, dictionary);
	// console.log(result);
	return result;
}


function getPropertyModelType(value: string): string {
	const type = removeBrackets(removeExMark(value));
	if (type === 'ObjectId') {
		return 'mongoose.Schema.Types.ObjectId'
	}
	return type;
}

function getDictionaryForModelTemplate(key: string, value: string, objectName: string) : any {
	const required: boolean = containsExMark(value);
	const property = key;
	const dict = {
		'VAR:REQUIRED_VALUE': required.toString(),
		'VAR:PROPERTY_NAME': property,
		'VAR:PROPERTY_TYPE': getPropertyModelType(value),
		'DYNAMIC:OBJECT_NAME': objectName,
	}
	return dict;
}

function getModelTemplate(value: string): string {
	const type = removeExMark(value)
	if (containsBrackets(value)) {
		// switch(value) {
		// 	case '[String]':
		// 		break;
		// 	case '[Number]':
		// 		break;
		// 	case '[ObjectId]':
		// 		break;
		// 	default:
		// }
		return ArrayPropTemplate;
	} else {

		switch(value) {
			case 'String':
				return StringPropTemplate;
				break;
			case 'Number':
				return GenericPropTemplate;
				break;
			case 'ObjectId':
				return ObjectPropTemplate;
				break;
			default:
		}
	}

	return '';
}

function basicPartialBuilderForVars(template: string, dictionary: any): string {
	let result = template;
	const inserts = getAllInserts(template);
	inserts.forEach((insert) => {
		// console.log(insert);
		const insertText = getInsertText(insert);
		result = result.replace(new RegExp(insert, 'g'), dictionary[insertText]);
	});
	return result;
}

export default templateMongooseModel;