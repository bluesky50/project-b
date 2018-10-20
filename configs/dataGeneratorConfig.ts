import { writeFileWithChecks } from '../utils/fileUtils';

export const objectNames = [
	'Post',
	'Comment',
	'User'
];

// Options: Number, String, ObjectId, [ObjectId]

export const defaultObjectProperties = `{
	updatedAt: 'ObjectId',
	title: 'String',
	description: 'String',
	type: 'String',
	category: 'String',
	tags: '[String]',
}`;
