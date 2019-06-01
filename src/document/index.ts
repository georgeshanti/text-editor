import { DocElement, TextElement, ParagraphElement } from '../element';
import { Style } from '../style';
import { Editor } from '../editor';

class TextDocument extends DocElement{
    jElement:JQuery;
    styling:Style;
    contents:DocElement[];
    cursor_pos:number;

    constructor(ed:Editor){
        super(ed);
        this.styling = new Style({});
        this.jElement = $("<div class='document' contenteditable='true'></div>");
        this.contents = [];
        this.nextElement = this.nextElement.bind(this);
        this.push = this.push.bind(this);
        this.setCaretPosition = this.setCaretPosition.bind(this);
        let para = new ParagraphElement(this);
        para.push(new TextElement("Sentence1", para));
        para.push(new TextElement("Sentence2", para));
        para.push(new TextElement("Sentence3", para));
        para.push(new TextElement("Sentence4", para));
        para.push(new TextElement("Sentence5", para));
        this.push(para);
    }

    push(ele:DocElement){
        this.contents.push(ele);
    }

    nextElement(ele:DocElement, new_ele:DocElement){
        var index = this.contents.indexOf(ele);
        this.contents.splice(index+1,0,new_ele);
        this.editor.paint();
    }

    setCaretPosition(){
        let range = document.createRange();
        console.log($(this.jElement.children()[0]).children()[0]);
        range.setStart($(this.jElement.children()[0]).children()[0], 1);
        // range.setEnd($(this.jElement.children()[0]).children()[0], 3);
        // this.jElement.focus();
        // var selection = window.getSelection();
        // console.log(this.jElement.children()[0]);
        // this.jElement.children()[0].focus();
        // selection.collapse(this.jElement.children()[0], 1);
    }

    render():JQuery<HTMLElement>{
        var str = "";
        this.contents.forEach((x)=>{
            this.jElement.append(x.render());
        })
        console.log(this.cursor_pos);
        this.setCaretPosition();
        return this.jElement;
    }
}

export { TextDocument };