import { IArgs } from "../../../../interfaces/IArgs";
import { templateBuilder } from '../../../../builders/templateBuilders';

export const templateTypeResolver =
`import I{{DYNAMIC:LOWERCASE_OBJECT_NAME}} from '../../interfaces/models/I{{DYNAMIC:LOWERCASE_OBJECT_NAME}}';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const {{DYNAMIC:LOWERCASE_OBJECT_NAME}}sResolver = async (parent: any, args: {}, context: IResolverContext): Promise<I{{DYNAMIC:LOWERCASE_OBJECT_NAME}}> => {
	return await context.models.{{DYNAMIC:LOWERCASE_OBJECT_NAME}}.find();
};

const {{DYNAMIC:LOWERCASE_OBJECT_NAME}}Resolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<I{{DYNAMIC:LOWERCASE_OBJECT_NAME}}> => {
	return await context.models.{{DYNAMIC:LOWERCASE_OBJECT_NAME}}.findById(args.id);
};

const create{{DYNAMIC:LOWERCASE_OBJECT_NAME}}Resolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: I{{DYNAMIC:LOWERCASE_OBJECT_NAME}}, context: IResolverContext): Promise<I{{DYNAMIC:LOWERCASE_OBJECT_NAME}}> => {
		const new{{DYNAMIC:LOWERCASE_OBJECT_NAME}} = await new context.models.{{DYNAMIC:LOWERCASE_OBJECT_NAME}}({
			{{DYNAMIC:OBJECT_PROPERTIES_FOR_DB_CREATION}}
		}).save();

		if (new{{DYNAMIC:LOWERCASE_OBJECT_NAME}}) {
			return new{{DYNAMIC:LOWERCASE_OBJECT_NAME}};
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		{{DYNAMIC:LOWERCASE_OBJECT_NAME}}s: {{DYNAMIC:LOWERCASE_OBJECT_NAME}}sResolver,
		{{DYNAMIC:LOWERCASE_OBJECT_NAME}}: {{DYNAMIC:LOWERCASE_OBJECT_NAME}}Resolver
	},
	Mutation: {
		create{{DYNAMIC:LOWERCASE_OBJECT_NAME}}: create{{DYNAMIC:LOWERCASE_OBJECT_NAME}}Resolver
	}
}

export default resolvers;

`;

export const dictionaryResolver = {
	'DYNAMIC:LOWERCASE_OBJECT_NAME': getObjectName,
	'DYNAMIC:OBJECT_PROPERTIES_FOR_DB_CREATION': getObjectProperties,
	'PARTIAL:OBJECT_PROPERTY_ENTRY': '{{VAR:PROPERTY_NAME}}: args.{{VAR:PROPERTY_NAME}}',
}

function getObjectName(args: IArgs) {
	return args.dataModelInfo.objectName;
}

function getObjectProperties(args: IArgs) {
	return dynamicHandler(args, dictionaryResolver['PARTIAL:OBJECT_PROPERTY_ENTRY'], ',\n');
}

function dynamicHandler(args: IArgs, customTemplate: string, joinChar: string) {
	let cache: string[] = [];
	Object.keys(args.dataModelInfo.objectSchema).forEach((key: string) => {
		const newDict = {
			'VAR:PROPERTY_NAME': key,
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

export default templateTypeResolver;