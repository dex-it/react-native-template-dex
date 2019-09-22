import {ReduxLoggerOptions} from "redux-logger";

export interface IAppSettings {
    appName: string;
    environment: "Development" | "Test" | "Staging" | "Production";
    serverUrl: string;
    identityUrl: string;
    loggerUrl: string;
    bugReportApiKey: string;
    useBugReporter: boolean;
    version: string;
    build: number;
    fetchTimeout: number;
    uploadTimeout: number;
    showVersion: boolean;
    supportUrl: string;
    termServer: string;
    devOptions: IDevOptions;
}

interface IDevOptions {
    startScreen: string;
    useTestCase: boolean;
    reduxLogger?: ReduxLoggerOptions;
    reduxLoggerWhiteList?: string[];
    purgeStateOnStart: boolean;
    showAllComponentsOnStart: boolean;
    disableReduxLogger: boolean;
}