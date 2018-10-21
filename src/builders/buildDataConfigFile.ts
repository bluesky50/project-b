import { writeDataConfigTemplate } from '../utils/writeDataConfigFile';
import { objectNames, defaultObjectProperties } from '../configs/dataObjectsSource';

const fileOutputPath = './output/dataModelConfig.ts';

writeDataConfigTemplate(fileOutputPath, objectNames, defaultObjectProperties);