const partialMongooseSchemaGenericProperty = 
`{{VAR:PROPERTY_NAME}}: {
	type: {{VAR:PROPERTY_TYPE}},
	required: {{VAR:REQUIRED_VALUE}},
	default: ''
}`;

export default partialMongooseSchemaGenericProperty;