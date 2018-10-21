const appName = "`server:${serverConfig.appName}`";

export const templateDebugger =
`import serverConfig from '../configs/serverConfig';

const debug = require('debug')(${appName});

export default debug;
`;

export default templateDebugger;