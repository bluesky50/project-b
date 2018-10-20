import { writeFileWithChecks } from './fileUtils';

// interface Set<T> {
// 	add(value: T): Set<T>;
// 	clear(): void;
// 	delete(value: T): boolean;
// 	entries(): IterableIterator<[T, T]>;
// 	forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
// 	has(value: T): boolean;
// 	keys(): IterableIterator<T>;
// 	size: number;
// 	values(): IterableIterator<T>;
// 	[Symbol.iterator](): IterableIterator<T>;
	// [Symbol.toStringTag]: string;
// }

// interface SetConstructor {
// 	new <T>(): Set<T>;
// 	new <T>(iterable: Iterable<T>): Set<T>;
// 	prototype: Set<any>;
// }

export function createDataConfigString(objectNames: string[], defaultObjectProperties: any = {}): string {
	if (!objectNames || !Array.isArray(objectNames) || objectNames.length === 0) {
		console.log('Invalid objectNames array');
		return '';
	}

	const uniqueObjectNames: string[] = [];
	objectNames.forEach((name) => {
		if (uniqueObjectNames.indexOf(name )=== -1) {
			uniqueObjectNames.push(name);
		}
	});

	return uniqueObjectNames.map((name: string): string => {
		return `{
			${name}: "${name}",
			schema: ${defaultObjectProperties}
		}`;
	}).join(',\n');
}
