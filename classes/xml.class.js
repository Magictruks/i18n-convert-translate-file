import * as fs from "fs";
import * as xmlParser from "xml2json";
import formatXml from "xml-formatter";

class Xml {
    constructor(pathIn, pathOut, targetLanguage) {
        this.pathIn = pathIn;
        this.pathOut = pathOut;
        this.targetLanguage = targetLanguage;
        this.content = "";
        this.init();
    }

    init() {
        const data = fs.readFileSync(this.pathIn);

        this.content = xmlParser.toJson(data, {reversible: true, object: true});

        this.content.xliff.file['target-language'] = this.targetLanguage.code;
    }

    writeTranslateFile() {
        const finalXml = xmlParser.toXml(JSON.stringify(this.content));

        fs.writeFileSync(this.pathOut, '<?xml version="1.0" encoding="UTF-8" ?>\n')
        fs.appendFileSync(this.pathOut, formatXml(finalXml, {collapseContent: true}));
    }

    get elements() {
        return this.content.xliff.file.body['trans-unit'];
    }

    set target(target) {
        const { index, ...data } = target;
        this.content.xliff.file.body['trans-unit'][index].target = data;
    }
}

export { Xml };
