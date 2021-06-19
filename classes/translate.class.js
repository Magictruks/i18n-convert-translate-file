import { Logger } from "./logger.class.js";

class Translate {

    constructor(sourceLanguage, targetLanguage) {
        this.sourceLanguage = sourceLanguage;
        this.targetLanguage = targetLanguage;
    }

    // Translate all words and replace the words already translated
    async all(xmlObj, page) {

        for (let i = 0; i < xmlObj.elements.length; i++) {
            const element = xmlObj.elements[i];

            if (element.source.$t) {
                await this.#_process(xmlObj, element, i, page);
            } else {
                Logger.problemInYourOriginTranslateFile(element);
            }
        }
    }

    // Translate only words who has'nt translated
    async onlyUntarget(xmlObj, page) {

        for (let i = 0; i < xmlObj.elements.length; i++) {
            const element = xmlObj.elements[i];

            if (!element.target && element.source.$t) {
                await this.#_process(xmlObj, element, i, page);
            } else {
                !element.target ? Logger.problemInYourOriginTranslateFile(element) : null;
            }
        }
    }

    // Scrapping DeepL Translator
    async #_searchTrad(page, trad) {

        await page.goto(`https://www.deepl.com/translator#${this.sourceLanguage.key}/${this.targetLanguage.key}/${trad}`);

        // You can chage timeout delay has you want
        await page.waitForTimeout(2000);

        const res = await page.$$eval('.lmt__inner_textarea_container', span => span.map(s => s.textContent));

        return res[1].replace(/\n/g, '').replace(/\r/g, '').split(' ').filter(x => x !== '').join(' ');

    }

    // Translation recovery logic
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
            Logger.scrappingError(e);
        }
    }
}

export { Translate };
