'use strict';
import * as vscode from 'vscode';
import { grep } from './grep';



/**
 * ReferenceProvider for assembly language.
 */
export class ReferenceProvider implements vscode.ReferenceProvider {
    /**
     * Called from vscode if the used selects "Find all references".
     * @param document The current document.
     * @param position The position of the word for which the references should be found.
     * @param options 
     * @param token 
     */
    public provideReferences(document: vscode.TextDocument, position: vscode.Position, options: { includeDeclaration: boolean }, token: vscode.CancellationToken): Thenable<vscode.Location[]> {
           return this.search(document, position);
    }

    
    /**
     * Does a search for a word. I.e. finds all references of the word.
     * @param document The document that contains the word.
     * @param position The word position.
     */
    public search(document, position): Thenable<vscode.Location[]>
    {
        return new Promise<vscode.Location[]>((resolve, reject) => {
            const searchWord = document.getText(document.getWordRangeAtPosition(position));
            const searchRegex = new RegExp('^[^;]*\\b' + searchWord + '\\b');

            grep({ regex: searchRegex })
            .then(locations => {
                return resolve(locations);
            });
        });
    }

}