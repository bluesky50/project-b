const typeDefinition = "`\ntype {{VAR:OBJECT_NAME}} {\n{{DYNAMIC:OBJECT_PROPERTIES}}\n}\n`;";
const queries = "`\n{{VAR:LOWERCASE_OBJECT_NAME}}s: [{{VAR:OBJECT_NAME}}!]!\n{{VAR:LOWERCASE_OBJECT_NAME}}(id: String!): {{VAR:OBJECT_NAME}}!\n`;";
const mutations = "`\ncreate{{VAR:LOWERCASE_OBJECT_NAME}}({{DYNAMIC:OBJECT_PROPERTIES_FOR_GQL_MUTATION}}): {{VAR:OBJECT_NAME}}\n`;";

const templateTypeDef = `
export const typeDefs: string = ${typeDefinition}

export const queries: string = ${queries}

export const mutations: string = ${mutations}
`;

export default templateTypeDef;
