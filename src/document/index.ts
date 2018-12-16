import { TextElement } from '../element';

class TextDocument{
    content:TextElement[];

    constructor(){
        this.content = [];
        this.content.push(new TextElement("Sentence1"));
        this.content.push(new TextElement("Sentence2"));
    }

    render():string{
        var str = "";
        this.content.forEach((x)=>{
            str += x.render();
        })
        return str;
    }
}

export { TextDocument };