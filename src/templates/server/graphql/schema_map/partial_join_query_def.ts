const joinQueryDef = "const QueryDef: string = \ntype Query {\n${queries.join(REPLACE_WITH_NEW_LINE)}\n}\n`;";

export default joinQueryDef;