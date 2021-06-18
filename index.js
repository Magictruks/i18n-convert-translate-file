import { Logger } from "./classes/logger.class.js";
import { Xml } from "./classes/xml.class.js";
import { Translate } from "./classes/translate.class.js";
import { Language } from "./enum/language.enum.js";
import puppeteer from 'puppeteer';

const main = async (pathIn, pathOut, sourceLanguage, targetLanguage) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  Logger.openFile();

  const xmlObject = new Xml(pathIn, pathOut, targetLanguage);

  Logger.beginTranslate();

  const translate = new Translate(sourceLanguage, targetLanguage);

  await translate.onlyUntarget(xmlObject, page);

  Logger.endTranslate();

  xmlObject.writeTranslateFile();

  await page.close();
  await browser.close();

}

(async () => {
  // Synthax path -> Fullpath

  const pathIn = 'D:\\turch\\Documents\\Developpement\\Nodejs\\translate-script\\messages.xlf';
  const pathOut = 'D:\\turch\\Documents\\Developpement\\Nodejs\\translate-script\\messages.de.xlf';

  const sourceLanguage = Language.fr;
  const targetLanguage = Language.de;

  return await main(pathIn, pathOut, sourceLanguage, targetLanguage);
})();
