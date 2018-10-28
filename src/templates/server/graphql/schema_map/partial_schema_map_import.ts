const partialGqlSchemaMapImport = 
`import {{PARTIAL:TYPE_DEF_NAME}} from './{{VAR:OBJECT_NAME}}/typeDef';
import * as {{PARTIAL:TYPE_RESOLVER_NAME}} from './{{VAR:OBJECT_NAME}}/resolvers';`;

export default partialGqlSchemaMapImport;
