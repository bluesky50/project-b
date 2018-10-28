import { insertBracketsRegex, insertSplitChar, handlebarInsertsRegex } from '../constants/matchingPattern';

export function getAllInsertsRegex(str: string, pattern: RegExp): Array<string> {
	const results =  str.match(pattern);
	return results ? results : [];
}

export function getAllInserts(str: string): Array<string> {
	const results = str.match(handlebarInsertsRegex);
	return results ? results : [];
}

export function getInsertText(insertString: string): string {
	if (insertString) {
		const result = insertString.replace(insertBracketsRegex, '');
		return result;
	}
	return '';
}

export function getInsertType(insertString: string): string {
	const insert = getInsertText(insertString);
	if (insertString) {
		const result = insert.split(insertSplitChar);
		return result[0];
	}
	return '';
}

export function getInsertValue(insertString: string): string {
	const insert = getInsertText(insertString);
	if (insertString) {
		const result = insert.split(insertSplitChar);
		return result[0];
	}
	return '';
}

export function filterInsertsByType(insertsArray: Array<string>, type: string): Array<string> {
	const filteredArray = insertsArray.filter((insert) => {
		if (getInsertType(insert) === type) {
			return true;
		}
		return false;
	});
	return filteredArray;
}

export function getInsertCount(text: string, pattern: RegExp): number {
	if (text && typeof(text) === 'string') {
		const insertsArray = getAllInsertsRegex(text, pattern);
		return insertsArray.length;
	}
	return 0;
}

export function containsInserts(text: string, pattern: RegExp): boolean {
	const insertCount = getInsertCount(text, pattern);
	return insertCount === 0 ? true : false;
}

