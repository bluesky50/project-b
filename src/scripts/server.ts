import dataModel from '../../output/nexusDataModel';
import serverInfo from '../configs/serverBuilderConfig';

import * as Builder from '../builders/buildServerFiles';

const args = {
	serverInfo,
	dataModel
}

Builder.buildClasseFiles(args);
Builder.buildConfigFiles(args);
Builder.buildLibFiles(args);
Builder.buildUtilFiles(args);
Builder.buildGqlFiles(args);
Builder.buildInterfaceFiles(args);
Builder.buildDataModelFiles(args);