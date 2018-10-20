const templateMongooseModel = `import mongoose from 'mongoose';
import I{{VAR:OBJECT_NAME}} from '../interaces/models/I{{VAR:OBJECT_NAME}}';

export interface I{{VAR:OBJECT_NAME}}Document extends mongoose.Document, I{{VAR:OBJECT_NAME}} {}

export interface I{{VAR:OBJECT_NAME}}Model extends mongoose.Model<I{{VAR:OBJECT_NAME}}Document> {}

const {{VAR:OBJECT_NAME}}Schema: mongoose.Schema = new mongoose.Schema({
	{{DYNAMIC:MONGOOSE_OBJECT_PROPERTIES}}
}, { versionKey: false });

const {{VAR:OBJECT_NAME}}: I{{VAR:OBJECT_NAME}}Model = mongoose.model<I{{VAR:OBJECT_NAME}}Document, I{{VAR:OBJECT_NAME}}Model>('{{VAR:OBJECT_NAME}}', {{VAR:OBJECT_NAME}}Schema, '{{VAR:OBJECT_NAME}}s');

export default {{VAR:OBJECT_NAME}};

`;

export default templateMongooseModel;