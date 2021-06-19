class Logger {
    static openFile() {
        console.log('\x1b[33m', '\nOuverture du fichier...');
        this.#_resetColor();
    }

    static beginTranslate() {
        console.log('\x1b[33m', '\nPassage des termes à traduire...');
        this.#_resetColor();
    }

    static endTranslate() {
        console.log('\x1b[33m', '\nFin de la traduction');
        this.#_resetColor();
    }

    static translateSuccess(element, translate) {
        console.log('\x1b[32m', `Traduction pour ${element.source.$t} : ${translate}`);
        this.#_resetColor();
    }

    static translateNotFound(element) {
        console.log('\x1b[31m',`Recommencer la traduction pour ${element.source.$t}`);
        this.#_resetColor();
    }

    static problemInYourOriginTranslateFile(element) {
        console.log('\x1b[31m', `Revoir la traduction pour l'élément ID : ${element.id}`);
        this.#_resetColor();
    }

    static fileDoesntExist(path) {
        console.log('\x1b[31m', `\nLe fichier ${path} n'existe pas`);
        this.#_resetColor();
    }

    static scrappingError(e) {
        console.log('\x1b[31m', `\nUne erreur est survenu lors du scrapping`);
        console.log('\x1b[31m', `\n${e}`);
        this.#_resetColor();
    }

    static #_resetColor() {
        console.log('\x1b[0m');
    }
}

export { Logger };
