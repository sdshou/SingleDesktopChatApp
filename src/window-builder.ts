import { WebPreferences, BrowserWindow } from "electron";

class WindowBuilder {

    private width: number = 800;
    private height: number = 600;
    private webPreferences: WebPreferences = {};
    private html: string | undefined;

    withSize(width: number, height: number) {
        this.width = width;
        this.height = height;
        return this;
    }

    withPreloader(path: string) {
        this.webPreferences['preload'] = path;
        return this;
    }

    withHtmlFile(path: string) {
        this.html = path;
        return this;
    }

    build() {
        let window: BrowserWindow | null = new BrowserWindow({
            width: this.width,
            height: this.height,
            webPreferences: this.webPreferences,
        });

        // and load the index.html of the app.
        if (this.html) {
            window.loadFile(this.html);
        }

        // Open the DevTools.
        // window.webContents.openDevTools()

        // Emitted when the window is closed.
        window.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            window = null;
        });

        return window;
    }
}

export const windowBuilder = new WindowBuilder();
