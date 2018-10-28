const joinMutationDef = "const MutationDef: string = \ntype Mutation {\n${mutations.join({REPLACE_WITH_NEW_LINE})}\n}\n`;";

export default joinMutationDef;