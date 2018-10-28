const dataModelConfig = {
	args: {
		database: 'MongoDB',
		ormAdapter: 'mongoose'
	},
	dataObjects: [{
		name: "Post",
		schema: {
			updatedAt: 'ObjectId',
			title: 'String',
			description: 'String',
			type: 'String',
			category: 'String',
			tags: '[String]',
		}
	}, {
		name: "Comment",
		schema: {
			updatedAt: 'ObjectId',
			title: 'String',
			description: 'String',
			type: 'String',
			category: 'String',
			tags: '[String]',
		}
	}, {
		name: "User",
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
