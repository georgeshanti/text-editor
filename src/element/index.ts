import { Style } from '../style';
import { getCaretCharacterOffsetWithin } from '../utils';
import { Editor } from '../editor';

class DocElement{
    parent:DocElement;
    styling:Style;
    size:number;
    editor:Editor;

    constructor(e:Editor){
        this.editor = e;
        this.nextElement = this.nextElement.bind(this);
        this.shiftElement = this.shiftElement.bind(this);
        this.render = this.render.bind(this);
    }

    nextElement(ele:DocElement, new_ele:DocElement){

    }

    shiftElement(ele:DocElement){

    }

    render():JQuery<HTMLElement>{
        var ele = $("<div></div>");
        return ele;
    }
}

class TextElement extends DocElement{
    content:string;
    jElement:JQuery;
    active:boolean;

    constructor(val:string, par:DocElement){
        super(par.editor);
        this.parent = par;
        this.keyPress = this.keyPress.bind(this);
        if(val==undefined)
            val="";
        this.content=val;
        this.styling = new Style({"display": "inline", "outline": "0px solid transparent"});
        this.jElement = $("<div class='text-element'></div>");
    }

    onclick(){
        console.log(this.content);
    }

    keyPress(e){
        console.log(e);
        if(e.which==13){
            e.preventDefault();
            var document_offset = getCaretCharacterOffsetWithin(this.editor.document.jElement[0]);;
            var element_offset = getCaretCharacterOffsetWithin(this.jElement[0]);
            this.editor.document.cursor_pos = document_offset;
            if(element_offset==0 || element_offset==this.content.length ){
                this.shiftElement(this);
                return;
            }
            var new_text_element = new TextElement(this.jElement.html().toString().slice(element_offset), this.parent);
            new_text_element.active = true;
            this.jElement.html( this.jElement.html().toString().slice(0, element_offset) );
            this.content = this.jElement.html().toString().slice(0, element_offset);
            this.parent.nextElement(this, new_text_element);
            this.jElement.html().toString().slice(0, element_offset);
            return;
        }
    }

    render():JQuery<HTMLElement>{
        this.jElement.attr("tabIndex", 0);
        this.jElement.keypress(this.keyPress);
        this.jElement.html(this.content);
        this.jElement.css(this.styling.style);
        if(this.active){
            this.jElement.focus();
        }

        return this.jElement;
    }
}

class ParagraphElement extends DocElement{
    content:string;
    jElement:JQuery;
    contents:DocElement[];

    constructor(par:DocElement){
        super(par.editor);
        this.parent = par;
        this.styling = new Style({"display": "block", "max-width":"100%"});
        this.jElement = $("<div class='paragraph-element'></div>");
        this.contents=[];
    }

    push(ele:DocElement){
        this.contents.push(ele);
    }

    nextElement(ele:DocElement, new_ele:DocElement){
        var index = this.contents.indexOf(ele);
        var new_para = this.contents.slice(index+1);
        var new_para_element = new ParagraphElement(this.parent);
        new_ele.parent = new_para_element;
        new_para_element.push(new_ele);
        new_para.forEach(x=>{
            x.parent = new_para_element;
            new_para_element.contents.push(x);
        });
        this.contents = this.contents.slice(0,index+1);
        this.parent.nextElement(this, new_para_element);
    }

    render():JQuery<HTMLElement>{
        this.jElement.html('');
        this.jElement.css(this.styling.style);
        this.contents.forEach((x)=>{
            this.jElement.append(x.render());
        })
        return this.jElement;
    }
}

export { DocElement, TextElement, ParagraphElement };