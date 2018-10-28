const partialGqlSchemaMapImport = 
`import * as {{PARTIAL:TYPE_DEF_NAME}} from './{{VAR:OBJECT_NAME}}/typeDef';
import {{PARTIAL:TYPE_RESOLVER_NAME}} from './{{VAR:OBJECT_NAME}}/resolvers';`;

export default partialGqlSchemaMapImport;
