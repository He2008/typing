
import Utils from './utils'
export class CharBlock {
    char: string;
    type: CharBlockType;
    isActive: boolean = false;
    html: HTMLElement;
    constructor(char: string, type: CharBlockType = "default") {
      this.char = char;
      this.type = type;
      this.html = document.createElement("span");
      this.initCharHtml();
      this.changeType(type);
    }
    initCharHtml() {
      let char = this.char;
      this.html.innerHTML = char;
    }
    changeType(type: CharBlockType) {
        if(this.type === 'end') return
      this.html.className = `char ${type} ${this.isActive ? "isActive" : ""}`;
    }
    toggleActive(isActive: boolean) {
      this.isActive = isActive;
      if (this.isActive) {
        Utils.addClass(this.html, "isActive");
      } else {
        Utils.remove(this.html, "isActive");
      }
    }
  }
  
  export  class Line {
    html: HTMLElement;
    lineNo: number;
    charList: CharBlock[] = [];
    constructor(lineText: string[], type) {
      this.initLine(lineText, type);
    }
    initLine(text: string[], type: String) {
      this.html = document.createElement("p");
      Utils.addClass(this.html, "line");
      text.forEach(char => {
        let blockType: CharBlockType =
          type === "input" ? "transparent" : "default";
        if (char === "indent") {
          blockType = "indent";
          char = "&nbsp";
        }else if(char ==='end'){
          blockType = "end";
          char = "&nbsp";
        }
        let charBlock = new CharBlock(char, blockType);
        this.charList.push(charBlock);
        this.html.append(charBlock.html);
      });
    }
  }
  
  export   class View {
    html: HTMLElement;
    text: string;
    lineList: Line[] = [];
  
    constructor(text: string, type: string) {
      this.text = text;
      this.html = document.createElement("div");
      Utils.addClass(this.html, type);
      this.handleText(type);
    }
    handleText(type) {
      let text = this.text;
      let line = [];
      let char: string;
      let indent = true;
      for (let i = 0; i < text.length; i++) {
        char = text[i];
        if (!char || char === " ") {
          char = indent ? "indent" : "&nbsp;";
        } else if (char === "\r\n" || char === "\n") {
          let lineClass = new Line(line, type);
          this.lineList.push(lineClass);
          this.html.append(lineClass.html);
          line = [];
          indent = true;
          continue;
        } else {
          indent = false;
        }
        line.push(char);
      }
      line.push('end')
      let lineClass = new Line(line, type);
      this.lineList.push(lineClass);
      this.html.append(lineClass.html);
    }
  }
  