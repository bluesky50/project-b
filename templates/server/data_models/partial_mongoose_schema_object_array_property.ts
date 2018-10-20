const partialMongooseSchemaObjectArrayProperty = 
`{{VAR:PROPERTY_NAME}}: {
	type: [{
		type: {{VAR:PROPERTY_TYPE}},
		ref: {{VAR:REF_COLLECTION_NAME}}
	}],
	required: {{VAR:REQUIRED_VALUE}},
	default: {{VAR:DEFAULT_VALUE}},
}`;

export default partialMongooseSchemaObjectArrayProperty;