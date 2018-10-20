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