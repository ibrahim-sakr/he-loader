
export default class Settings {

    private _settings: { [index: string]: any } = {}

    constructor() { }

    set(name: string, value: any): void {
        if (this.isExist(name)) {
            throw Error(`the setting ${name} exist, you can't override it.`);
        }

        this._settings[name] = value;
    }

    get(name: string): any {
        if (this.isExist(name)) {
            return this._settings[name];
        }
    }

    isExist(name: string): boolean {
        return !!this._settings[name];
    }

}
