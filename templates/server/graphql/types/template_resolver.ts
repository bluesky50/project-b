const templateTypeResolver =
`import I{{VAR:LOWERCASE_OBJECT_NAME}} from '../../interfaces/models/I{{VAR:LOWERCASE_OBJECT_NAME}}';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const {{VAR:LOWERCASE_OBJECT_NAME}}sResolver = async (parent: any, args: {}, context: IResolverContext): Promise<I{{VAR:LOWERCASE_OBJECT_NAME}}> => {
	return await context.models.{{VAR:LOWERCASE_OBJECT_NAME}}.find();
};

const {{VAR:LOWERCASE_OBJECT_NAME}}Resolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<I{{VAR:LOWERCASE_OBJECT_NAME}}> => {
	return await context.models.{{VAR:LOWERCASE_OBJECT_NAME}}.findById(args.id);
};

const create{{VAR:LOWERCASE_OBJECT_NAME}}Resolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: I{{VAR:LOWERCASE_OBJECT_NAME}}, context: IResolverContext): Promise<I{{VAR:LOWERCASE_OBJECT_NAME}}> => {
		const new{{VAR:LOWERCASE_OBJECT_NAME}} = await new context.models.{{VAR:LOWERCASE_OBJECT_NAME}}({
			{{DYNAMIC:OBJECT_PROPERTIES_FOR_DB_CREATION}}
		}).save();

		if (new{{VAR:LOWERCASE_OBJECT_NAME}}) {
			return new{{VAR:LOWERCASE_OBJECT_NAME}};
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		{{VAR:LOWERCASE_OBJECT_NAME}}s: {{VAR:LOWERCASE_OBJECT_NAME}}sResolver,
		{{VAR:LOWERCASE_OBJECT_NAME}}: {{VAR:LOWERCASE_OBJECT_NAME}}Resolver
	},
	Mutation: {
		create{{VAR:LOWERCASE_OBJECT_NAME}}: create{{VAR:LOWERCASE_OBJECT_NAME}}Resolver
	}
}

export default resolvers;

`;

export default templateTypeResolver;