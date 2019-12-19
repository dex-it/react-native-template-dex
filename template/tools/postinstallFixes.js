const dir = __dirname;
const path = require("path");
const replaceInFile = require("./replaceInFile");

replaceMetroBlackListForNode();
preventBundleInDebugForIOS();

function replaceMetroBlackListForNode() {
    if (process.version.startsWith("v12.1")) {
        console.log("Replace metro blacklist for node >= 12.11.x");
        const file = path.join(dir, "..", "node_modules", "metro-config", "src", "defaults", "blacklist.js");

        replaceInFile(file,
            "var sharedBlacklist = [\n" +
            "  /node_modules[/\\\\]react[/\\\\]dist[/\\\\].*/,\n" +
            "  /website\\/node_modules\\/.*/,\n" +
            "  /heapCapture\\/bundle\\.js/,\n" +
            "  /.*\\/__tests__\\/.*/\n" +
            "];",
            "var sharedBlacklist = [\n" +
            "  /node_modules[\\/\\\\]react[\\/\\\\]dist[\\/\\\\].*/,\n" +
            "  /website\\/node_modules\\/.*/,\n" +
            "  /heapCapture\\/bundle\\.js/,\n" +
            "  /.*\\/__tests__\\/.*/\n" +
            "];"
        );
    }
    console.log("Process version: ", process.version);
}

function preventBundleInDebugForIOS() {
    console.log("Prevent bundling in debug on iOS");
    const file = path.join(dir, "..", "node_modules", "react-native", "scripts", "react-native-xcode.sh");

    replaceInFile(file, /"\$PLATFORM_NAME" == \*simulator/g, "\"\$PLATFORM_NAME\"")
}