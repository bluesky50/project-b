import { createDataObjectsConfigString } from './dataGenerator';
import { writeFileWithExistsCheck } from './fileUtils';

export function writeDataConfigTemplate(fileOutputPath: string, objectNames: any, defaultObjectProperties: any) {
	const dataModelConfigTemplate =
`const dataModelConfig = {
	dataModel: {
		args: {
			database: 'MongoDB',
			ormAdapter: 'mongoose'
		},
		dataObjects: [${createDataObjectsConfigString(objectNames, defaultObjectProperties)}]
	}
}

export default dataModelConfig;
`;

	writeFileWithExistsCheck(fileOutputPath, dataModelConfigTemplate);
}