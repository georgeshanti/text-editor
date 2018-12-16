import { Style } from '../style';
class TextElement{
    content:string;
    styling:Style;

    constructor(val?:string){
        if(val==undefined)
            val="";
        this.content=val;
    }

    render():string{
        return("<div contenteditable='true'>"+this.content+"</div>")
    }
}

export { TextElement };