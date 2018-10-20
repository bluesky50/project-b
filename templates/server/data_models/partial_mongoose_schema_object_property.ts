const partialMongooseSchemaObjectProperty = 
`{{VAR:PROPERTY_NAME}}: {
	type: {{VAR:PROPERTY_TYPE}},
	required: {{VAR:REQUIRED_VALUE}},
	default: {{VAR:DEFAULT_VALUE}},
	ref: '{{VAR:REF_COLLECTION_NAME}}',
}`;

export default partialMongooseSchemaObjectProperty;