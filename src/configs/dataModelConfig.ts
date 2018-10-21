const dataModelConfig = {
	args: {
		database: 'MongoDB',
		ormAdapter: 'mongoose'
	},
	dataObjects: [{
		Post: "Post",
		schema: {
			updatedAt: 'ObjectId',
			title: 'String',
			description: 'String',
			type: 'String',
			category: 'String',
			tags: '[String]',
		}
	}, {
		Comment: "Comment",
		schema: {
			updatedAt: 'ObjectId',
			title: 'String',
			description: 'String',
			type: 'String',
			category: 'String',
			tags: '[String]',
		}
	}, {
		User: "User",
		schema: {
			updatedAt: 'ObjectId',
			title: 'String',
			description: 'String',
			type: 'String',
			category: 'String',
			tags: '[String]',
		}
	}]

}

export default dataModelConfig;
