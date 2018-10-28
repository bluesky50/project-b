import fs from 'fs';
import path from 'path';

import { containsInserts } from './templateParserUtils';
import { insertBracketsRegex } from '../constants/matchingPattern';

const writingFileMessage = 'Writing File:';
const writingFileError = 'Error:';
const fileExistsErrorMessage = 'Error: File already exists.';
const insertsErrorMessage = 'Error: Incomplete Template Processing - File contents contains inserts.';

// fileName is the entire path
export function writeFile(fileName: string, fileString: string): void {
	try {
		fs.writeFileSync(fileName, fileString); // "UTF-8, {'flags', wx'}"
	} catch (error) {
		console.log(error.message);
	}
}

export function writeFileWithExistsCheck(filePathAndName: string, fileString: string): void {
	if (!fileExists(filePathAndName)) {
		writeFile(filePathAndName, fileString);
		console.log(writingFileMessage, filePathAndName);
	} else {
		console.log(fileExistsErrorMessage);
		console.log(writingFileError, filePathAndName);
	}
}

export function writeFileWithAllChecks(filePathAndName: string, fileString: string): void {
	if (!fileExists(filePathAndName)) {
		if (!containsInserts(fileString, insertBracketsRegex)) {
			writeFile(filePathAndName, fileString);
			console.log(writingFileMessage, filePathAndName);
		} else {
			console.log(insertsErrorMessage);
			console.log(writingFileError, filePathAndName);
		}
	} else {
		console.log(fileExistsErrorMessage);
		console.log(writingFileError, filePathAndName);
	}
}

export function fileExists(pathString: string): boolean {
	return fs.existsSync(pathString);
}

export function mkdirp(filePath: string): void {
	const dirname = path.dirname(filePath);

	if(!fileExists(dirname)) {
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

export function normalizePath(pathString: string): any {
	return path.normalize(pathString);
}
