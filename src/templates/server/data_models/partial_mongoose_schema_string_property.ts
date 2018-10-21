const partialMongooseSchemaStringProperty = 
`{{VAR:PROPERTY_NAME}}: {
	type: {{VAR:PROPERTY_TYPE}},
	required: {{VAR:REQUIRED_VALUE}},
	default: '',
	maxLength: 24,
	minLength: 1
}`;

export default partialMongooseSchemaStringProperty;