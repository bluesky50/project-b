const partialMongooseSchemaObjectProperty = 
`{{VAR:PROPERTY_NAME}}: {
	type: {{VAR:PROPERTY_TYPE}},
	required: {{VAR:REQUIRED_VALUE}},
	default: null,
	ref: '',
}`;

export default partialMongooseSchemaObjectProperty;