export const templateOrmAdapterClass = 
`import mongoose from 'mongoose';

import debug from '../lib/debugger';
import IOrmAdapter from '../interfaces/class/IOrmAdapter';

export class OrmAdapter implements IOrmAdapter {
	public dbUrl: string;
	private models: { [key: string]: any };

	constructor(dbUrl = '') {
		this.dbUrl = dbUrl;
		this.models = {

		}
	}

	public connect() {
		mongoose.Promise = global.Promise;
		mongoose.connect(this.dbUrl);
		mongoose.connection.once('open', () => {
			debug('Connected to database.');
		});
	}

	public disconnect() {
		mongoose.connection.close();
	}

	public getModels() {
		return this.models;
	}

	public getModel(name: string) {
		return this.models[name];
	}
}

export default OrmAdapter;
`;

export default templateOrmAdapterClass;