import {HttpLogWriter, ILogEntry, ILogWriter, LogEntryType, Logger} from "dex-logger";
import {appSettingsProvider} from "./settings";

class ConsoleWriter implements ILogWriter {
    write(item: ILogEntry): void {
        if (item.Type == LogEntryType.Warning || item.Type == LogEntryType.Exception
            || item.Type == LogEntryType.Critical) {
            console.warn(item.Msg, item.Info);
        }
    }
}

const writers: ILogWriter[] = [];
const predicate = appSettingsProvider.settings.environment == "Production"
    ? (entry: ILogEntry): boolean => entry.Type == LogEntryType.Critical || entry.Type == LogEntryType.Exception
        || entry.Type == LogEntryType.Warning
    : (): boolean => true;

if (appSettingsProvider.settings.loggerUrl.startsWith("http")) {
    const httpLogWriter = new HttpLogWriter(appSettingsProvider.settings.loggerUrl, fetch, (error: any): void =>
        console.log(error), predicate);
    writers.push(httpLogWriter);
    writers.push(new ConsoleWriter());
}

export const dexLogger = new Logger(writers, [`${appSettingsProvider.settings.appName}.Mobile`]);
