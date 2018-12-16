import { TextDocument } from './document';
import { Editor } from './editor';
import { Style } from './style';

window.onload=()=>{
    var doc:TextDocument = new TextDocument();
    var editorDiv = document.getElementById("editor");
    var editor:Editor = new Editor(doc, editorDiv);
}