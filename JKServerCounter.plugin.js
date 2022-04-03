/**
 * @name JKServerCounter
 * @author JikaiSH
 * @version 0.1.0
 * @description See how many server(s) you are in !
 */

/* @cc_on
    @if (@_jscript)
        var name = WScript.ScriptName.split(".")[0];
        var shell = WScript.CreateObject("WScript.Shell");
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        shell.Popup("Do NOT run random scripts from the internet with the Windows Script Host!\n\nYou are supposed to move this file to your BandagedBD/BetterDiscord plugins folder.", 0, name + ": Warning!", 0x1030);
        var pluginsPath = shell.expandEnvironmentStrings("%appdata%\\BetterDiscord\\plugins");
        if (!fso.FolderExists(pluginsPath)) {
            if (shell.Popup("Unable to find the BetterDiscord plugins folder on your computer.\nOpen the download page of BandagedBD/BetterDiscord?", 0, name + ": BetterDiscord installation not found", 0x14) === 6) {
                shell.Exec("explorer \"https://github.com/rauenzi/betterdiscordapp/releases\"");
            }
        } else if (WScript.ScriptFullName === pluginsPath + "\\" + WScript.ScriptName) {
            shell.Popup("This plugin is already in the correct folder.\nNavigate to the \"Plugins\" settings tab in Discord and enable it there.", 0, name, 0x40);
        } else {
            shell.Exec("explorer " + pluginsPath);
        }
        WScript.Quit();
    @else
@*/
class JKServerCounter {
        constructor() {
        this.name = "JKServerCounter"
        this.version = "0.1.0"
        this.STYLES = {
            base: "color:white",
            warn: "color:yellow",
            error: "color:red",
            info: "color:purple"
        }
        const guildHandler = BdApi.findModuleByProps("getGuildCount")
        this.guildCount = guildHandler.getGuildCount
        this._log(`version ${this.version} is loaded.`)
    }
    start() {
        // create the element for see the guild counter
        this.createElement()
        this.display()
        this._log(`version ${this.version} is running.`)
    }
    display() {
        if (!document.getElementById("ServerCount")) {
            this.createElement()
        }
        document.getElementById("ServerCount").innerText = `Server ${this.guildCount()}`
    }
    createElement() {
        this.guildDiv = document.getElementsByClassName("guildSeparator-a4uisj")[0]
        const fontSize = this._getFontDimensions(`Servers ${this.guildCount()}`)
        this.guildDiv.setAttribute("style", `height:30px; width:43px; border-radius: 9px;`)
        this.guildDiv.innerHTML = `<p id="ServerCount" style="padding:0px;margin:0px;color:white;font-size:14px;text-align:center;"></p>`
    }
    stop() {
       this.guildDiv.setAttribute("style", "")
        this.guildDiv.innerHTML = ""
    }
    onSwitch() {
        this.display() // it will refresh the guild count
                       
    }
        /**
     * @param {string} text String of text to measure.
     * @returns {TextMetrics}
     */
        _getFontDimensions(text) {
        // get the font
 const logoDiv = document.getElementsByClassName("listItem-3SmSlK")[0] // discord logo div
        const font = window.getComputedStyle(logoDiv, null).getPropertyValue("font-family") // stolen from https://stackoverflow.com/a/7444724       
        const myCanvas = this.canvas || (this.canvas = document.createElement("canvas"))
        const context = myCanvas.getContext("2d")
        context.font = font
        const metrics = context.measureText(text)
        this.canvas = null
        return metrics
    }
    _test() {
        this._log("Info!", "INFO")
        this._log("Warning!", "WARN")
        this._log("Error!", "ERROR")
    }
    _log(message, type = "") {
        switch (type.toLowerCase()) {
            case "info": {
                console.log(`%c[${this.name}] [INFO]: %c${message}`, this.STYLES.info, this.STYLES.base)
                break;
            }
            case "warn": {
                console.warn(`%c[${this.name}] [INFO]: %c${message}`, this.STYLES.warn, this.STYLES.base)
                break;
            }
            case "err": {}
            case "error": {
                console.error(`%c[${this.name}] [INFO]: %c${message}`, this.STYLES.error, this.STYLES.base)
                break;
            }
            case "": {
                console.log(`%c[${this.name}]: %c${message}`, this.STYLES.info, this.STYLES.base)
                break;
            }
            default: {
                this._log(message, "INFO")
            }
        }
    }
};

module.exports = JKServerCounter
