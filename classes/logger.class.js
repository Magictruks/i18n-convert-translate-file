class Logger {
    static openFile() {
        console.log('\x1b[33m', '\nOuverture du fichier...');
    }

    static beginTranslate() {
        console.log('\x1b[33m', '\nPassage des termes à traduire...');
    }

    static endTranslate() {
        console.log('\x1b[33m', '\nFin de la traduction');
    }

    static translateSuccess(element, translate) {
        console.log('\x1b[32m', `Traduction pour ${element.source.$t} : ${translate}`);
    }

    static translateNotFound(element) {
        console.log('\x1b[31m',`Recommencer la traduction pour ${element.source.$t}`);
    }

    static problemInYourOriginTranslateFile(element) {
        console.log('\x1b[31m', `Revoir la traduction pour l'élément ID : ${element.id}`)
    }
}

export { Logger };
