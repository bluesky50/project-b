export const objectNames = [
	'Announcement',
	'Circle',
	'CircleMeeting',
	'CircleMeetingInput',
	'Notification',
	'Poll',
	'Project',
	'ProjectNote',
	'ProjectPeopleData',
	'ProjectPost',
	'ProjectRefData',
	'Role',
	'SkillDomain',
	'SkillSet',
	'SkillUnit',
	'User',
	'UserFollowsData',
	'UserInterest',
	'UserOrgData',
	'UserPost',
	'UserProfileData',
	'UserSkillsData'
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
