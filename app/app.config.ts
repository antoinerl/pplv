import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    wpURL: string;
    wsURL: string;
}

export const AppConfig: IAppConfig = {
    wpURL: "https://www.prionspourlavie.fr",
    wsURL: "https://ws.prionspourlavie.fr"
};
