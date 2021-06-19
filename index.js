import { Logger } from "./classes/logger.class.js";
import { Xml } from "./classes/xml.class.js";
import { Translate } from "./classes/translate.class.js";
import { Language } from "./enum/language.enum.js";
import puppeteer from 'puppeteer';
import fs from "fs";

const main = async (pathIn, pathOut, sourceLanguage, targetLanguage) => {

  const exist = fs.existsSync(pathIn);

  // Check if file exist
  if (!exist) {
    Logger.fileDoesntExist(pathIn);
    return;
  }

  // Create browser and page context
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  Logger.openFile();

  // Create XML Object
  const xmlObject = new Xml(pathIn, pathOut, targetLanguage);

  Logger.beginTranslate();

  // Create Translate Object
  const translate = new Translate(sourceLanguage, targetLanguage);

  // Here run the option for untarget word (you can switch with all option if you want)
  await translate.onlyUntarget(xmlObject, page);

  Logger.endTranslate();

  // Create your translate file
  xmlObject.writeTranslateFile();

  // Close page and browser context
  await page.close();
  await browser.close();

}

(async () => {
  // You can choose your source language and your target language
  const sourceLanguage = Language.fr;
  const targetLanguage = Language.de;

  // You can choose your own input file path (fullpath only)
  // ex here : C:\translate-script\messages.de.xlf
  const pathIn = 'C:\\translate-script\\messages.xlf';

  // You can choose your own output file path (fullpath only)
  // ex here : C:\translate-script\messages.de.xlf
  const pathOut = `C:\\translate-script\\messages.${targetLanguage.key}.xlf`;

  return await main(pathIn, pathOut, sourceLanguage, targetLanguage);
})();
