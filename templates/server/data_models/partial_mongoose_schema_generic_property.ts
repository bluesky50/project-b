const partialMongooseSchemaGenericProperty = 
`{{VAR:PROPERTY_NAME}}: {
	type: {{VAR:PROPERTY_TYPE}},
	required: {{VAR:REQUIRED_VALUE}},
	default: {{VAR:DEFAULT_VALUE}}
}`;

export default partialMongooseSchemaGenericProperty;