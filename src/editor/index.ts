import { TextDocument } from '../document';
import { Style } from '../style';

// import * as $ from 'jquery';

class Editor{
    document:TextDocument;
    container:Element;
    cursorStyle:Style;

    constructor(con:Element){
        this.document = new TextDocument(this);
        this.container = con;

        this.paint();
    }

    paint(){
        $(this.container).html('');
        $(this.container).append(this.document.render());
        console.log("Rendered!");
    }
}

export { Editor };