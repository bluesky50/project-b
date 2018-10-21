const partialMongooseSchemaObjectArrayProperty = 
`{{VAR:PROPERTY_NAME}}: {
	type: [{
		type: {{VAR:PROPERTY_TYPE}},
		ref: ''
	}],
	required: {{VAR:REQUIRED_VALUE}},
	default: [],
}`;

export default partialMongooseSchemaObjectArrayProperty;