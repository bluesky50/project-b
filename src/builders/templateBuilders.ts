import { TYPE_DYNAMIC, TYPE_VAR, TYPE_PARTIAL} from '../constants/insertTypes';
import { handlebarInsertsRegex } from '../constants/matchingPattern';
// import { pathExists, mkdirp, normalizePath } from "../utils/fileUtils";
import { getAllInsertsRegex, getInsertType, getInsertText, getAllInserts } from '../utils/templateParserUtils';

export function templateBuilder(args: { template: string, templateDictionary: any, outputInfo?: any, appInfo?: { serverInfo: any, dataModel: any }, dataModelInfo?: any }): string {
	// check if current directory is running in src/builders/
	// const outputPathDestination = normalizePath(__dirname + `../../output/${args.appInfo.appName}/src/` + args.outputInfo.outputPath);

	// check if destination path exists
	// if(!pathExists(outputPathDestination)) {
	// 	mkdirp(outputPathDestination);
	// }

	// Check for all inserts
	const templateInserts = getAllInsertsRegex(args.template, handlebarInsertsRegex);

	let resultString = args.template;
	
	// Fill inserts recursively.
	if (templateInserts.length > 0) {
		templateInserts.forEach((insert) => {
			const insertText = getInsertText(insert);
			switch(getInsertType(insert)) {
				case TYPE_VAR:
					// Check against dictionary to fulfill the insert type
					const varInjectString = args.templateDictionary[insertText];
					resultString = resultString.replace(new RegExp(insert, 'g'), varInjectString);
					break;
				case TYPE_PARTIAL:
					const newArgs = {
						template: args.templateDictionary[insertText],
						templateDictionary: args.templateDictionary,
						appInfo: args.appInfo,
						dataModelInfo: args.dataModelInfo
					}
					const partialInjectString: string = templateBuilder(newArgs);
					resultString = resultString.replace(new RegExp(insert, 'g'), partialInjectString);
					break;
				case TYPE_DYNAMIC:
					// pass necessary args down to the function so that it knows what to do about the data.
					const dynamicInjectString = args.templateDictionary[insert](args);
					resultString = resultString.replace(new RegExp(insert, 'g'), dynamicInjectString)
					break;
				default:
					console.log('Note: Unrecognized insert type: ' + insert);
			}
		});
	}
	
	return resultString;
}

export function basicPartialBuilderForVars(template: string, dictionary: any): string {
	let result = template;
	const inserts = getAllInserts(template);
	inserts.forEach((insert) => {
		const insertText = getInsertText(insert);
		result = result.replace(new RegExp(insert, 'g'), dictionary[insertText]);
	});
	return result;
}