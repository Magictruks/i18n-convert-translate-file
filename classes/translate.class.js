import { Logger } from "./logger.class.js";

class Translate {

    constructor(sourceLanguage, targetLanguage) {
        this.sourceLanguage = sourceLanguage;
        this.targetLanguage = targetLanguage;
    }

    async all(xmlObj, page) {

        for (let i = 0; i < 2; i++) {
            const element = xmlObj.elements[i];

            if (element.source.$t) {
                await this.#_process(xmlObj, element, i, page);
            } else {
                Logger.problemInYourOriginTranslateFile(element);
            }
        }
    }

    async onlyUntarget(xmlObj, page) {

        for (let i = 0; i < 3; i++) {
            const element = xmlObj.elements[i];

            if (!element.target && element.source.$t) {
                await this.#_process(xmlObj, element, i, page);
            } else {
                !element.target ? Logger.problemInYourOriginTranslateFile(element) : null;
            }
        }
    }

    async #_searchTrad(page, trad) {

        await page.goto(`https://www.deepl.com/translator#${this.sourceLanguage.key}/${this.targetLanguage.key}/${trad}`);

        await page.waitForTimeout(2000);

        const res = await page.$$eval('.lmt__inner_textarea_container', span => span.map(s => s.textContent));

        return res[1].replace(/\n/g, '').replace(/\r/g, '').split(' ').filter(x => x !== '').join(' ');

    }

    async #_process(xmlObj, element, index, page) {
        try {
            const deTrad = await this.#_searchTrad(page, element.source.$t);

            if (deTrad !== '') {
                xmlObj.target = { state : 'translated', '$t' : deTrad, index: index};
                Logger.translateSuccess(element, deTrad);
            } else {
                Logger.translateNotFound(element);
            }

        } catch (e) {
            console.log('\x1b[31m',e);
        }
    }
}

export { Translate }
