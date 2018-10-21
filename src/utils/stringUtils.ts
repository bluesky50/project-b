export function upperCaseFirstLetter(str: string): string {
	const result = str.charAt(0).toUpperCase() + str.slice(1);
	return result;
}

export function lowerCaseFirstLetter(str: string): string {
	const result = str.charAt(0).toLowerCase() + str.slice(1);
	return result;
}

export function toLowerCamelCase(str: string): string {
	const letters = str.split('');
	const adjustedLetters = letters.map((char, index) => {
		if (index === 0) {
			return char.toLowerCase();
		} else if (index > 0 && char.toUpperCase() === char) {
			return '-' + char.toLowerCase();
		} else {
			return char;
		}
	});
	return adjustedLetters.join('');
}

export function removeExMark(str: string): string {
	let result = '';
	for (let i = 0; i < str.length; i++) {
		const char = str.charAt(i);
		if (char !== '!') {
			result = result + char; 
		}
	}
	return result;
}

export function containsExMark(str: string): boolean {
	if (str.indexOf('!') === -1) {
		return false;
	}
	return true;
}

export function addCharToString(str: string, char: string): string {
	return str + char;
}

export function containsBrackets(str: string): boolean {
	if (str.indexOf('[') === -1 && str.indexOf(']') === -1) {
		return false;
	}
	return true;
}

export function removeBrackets(str: string): string {
	let result = '';
	for (let i = 0; i < str.length; i++) {
		const char = str.charAt(i);
		if (char !== '[' && char !== ']') {
			result = result + char; 
		}
	}
	return result;
}