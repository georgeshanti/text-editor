import { TextDocument } from '../document';
import { Style } from '../style';

// import * as $ from 'jquery';

class Editor{
    document:TextDocument;
    container:Element;
    cursorStyle:Style;

    constructor(doc:TextDocument, con:Element){
        this.document = doc;
        this.container = con;

        this.type = this.type.bind(this);

        $(this.container).keypress(this.type);

        this.paint();
    }

    paint(){
        var html = this.document.render();
        $(this.container).html(html);
        console.log("Render:", html);
    }

    type(e){
        var ele=e.target;
        console.log(ele);
        // if(this.cursorStyle==ele.style)
    }
}

export { Editor };