import SettingsInterface from '../Settings';

export default interface ComponentInterface {
    load(settings: SettingsInterface): any;
}
