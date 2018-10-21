// args for templateBuilder function.

export interface IDataModelInfo {
	objectName: string;
	objectSchema: { [key: string]: string };
}

export interface IDataModel {
	args: any;
	dataObjects: Array<any>;
}

export interface IAppInfo {
	serverInfo: any;
	dataModel: any;
}

export interface IArgs {
	template: string;
	templateDictionary: any;
	appInfo: IAppInfo
	dataModelInfo: IDataModelInfo
}