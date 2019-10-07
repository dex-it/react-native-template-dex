import {isIos} from "./common";

export class Fonts {
    static regular = isIos ? "SFProText-Regular" : "Roboto-Regular";
}