import { TextDocument } from './document';
import { Editor } from './editor';
import { Style } from './style';

window.onload=()=>{
    var editorDiv = document.getElementById("editor");
    var editor:Editor = new Editor(editorDiv);
}