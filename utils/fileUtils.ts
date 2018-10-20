import fs from 'fs';
import path from 'path';

import { containsInserts } from './templateParserUtils';

// fileName is the entire path
export function writeFile(fileName: string, fileString: string): void {
	try {
		fs.writeFileSync(fileName, fileString); // "UTF-8, {'flags', wx'}"
	} catch (error) {
		console.log(error.message);
	}
}

export function writeFileWithChecks(filePathAndName: string, fileString: string): void {
	if (!fileExists(filePathAndName)) {

	}
}

export function fileExists(pathString: string): boolean {
	return fs.existsSync(pathString);
}

export function mkdirp(filePath: string): void {
	const dirname = path.dirname(filePath);

	if(!fileExists(filePath)) {
		mkdirp(dirname);
	}

	fs.mkdirSync(filePath);
}

export function pathExists(pathString: string): boolean {
	try {
		return fs.lstatSync(pathString).isDirectory();
	} catch (error) {
		// console.log(error.message);
		return false;
	}
}

export function makePath(pathString: string): void {
	if (!pathExists(pathString)) {
		fs.mkdirSync(pathString);
	}
}

export function norm(pathString: string): any {
	return path.normalize(pathString);
}

