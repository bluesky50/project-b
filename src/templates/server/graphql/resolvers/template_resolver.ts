export const templateResolvers =
`import { isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';
import { UnknownError, ForbiddenError, AuthenticationRequiredError, AlreadyAuthenticatedError } from '../lib/errors';
import { generateRoleCheckResolver } from '../utils/resolverHelpers';
import IResolverContext from '../interfaces/gql/IResolverContext';

export const baseResolver: any = createResolver(
	null,
	(parent: any, args: {}, context: IResolverContext, error: any) => { 
		isInstance(error) ? error : new UnknownError();
	}
);

export const isAuthenticatedResolver  = baseResolver.createResolver((parent: any, args: {}, context: IResolverContext) => {
	if (context.state.user === null) {
		throw new AuthenticationRequiredError();
	}
});

export const isNotAuthenticatedResolver = baseResolver.createResolver((parent: any, args: {}, context: IResolverContext) => {
	if (context.state.user) throw new AlreadyAuthenticatedError();
});

// Add additional role based resolvers using generateRoleCheckResolver.
`;

export default templateResolvers;