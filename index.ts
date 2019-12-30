type wordBlockType = "default" | "typed" | "error" | "correct";
const testContent = `document.ready = function (callback) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
              if (document.readyState == "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        callback();
               }
        })
    }
    else if (document.lastChild == document.body) {
        callback();
    }
}`;
class WordBlock {
  word: String;
  index: Number;
  type: wordBlockType;
  html: HTMLElement;
  constructor(word: string, type: wordBlockType = "default", index: Number) {
    this.word = word;
    this.type = type;
    this.index = index;
    this.html = document.createElement("span");
    this.html.innerText = word;
    this.changeType(type);
  }
  /**
   * changeType
   */
  public changeType(type: wordBlockType) {
    this.html.appendChild;
    this.html.className = `word ${type}`;
  }
}

class Input{
    el:HTMLElement;
    words:Array<WordBlock> = [];
    index: number = 0;
    constructor(el:HTMLElement){
        this.el = el;
    }
    addWord(char:string,type:wordBlockType,index){
        let word = new WordBlock(char,type,index);
        this.el.appendChild(word.html)
        this.words.push(word)
        this.index++
    }
    deleteWord(){
        if(this.index<=0){
            this.index =0;
            return false
        }
        let word = this.words[this.words.length-1]
        word.html.remove();
        this.words.pop();
        this.index--;
    }
}
/**
 * TODO:
 * 输入Text Format
 * 高亮>
 */
class Typing {
  content: string;
  articleWords:Array<WordBlock>=[];
  screen: HTMLElement;
  input: Input;
  constructor(screen: HTMLElement, content: string) {
    this.content = content;
    this.screen = screen;
    this.init();
  }
  init() {
    this.displayArticle();
    this.listenKeyborad();
    this.input = new Input(document.getElementById('input'))
  }
  displayArticle() {
    for (let i = 0; i < this.content.length; i++) {
      let word = new WordBlock(this.content[i], "default", i);
      this.articleWords.push(word)
      this.screen.appendChild(word.html);
      Window[`test${i}`] = word;
    }
  }
  changeArticleWord(index,type:wordBlockType){
    this.articleWords[index].changeType(type);
  }
  listenKeyborad() {
    window.onkeydown = (event: any)=> {
      let code: Number = event.keyCode;
      let key = event.key;
      let index = this.input.index;

      // console.log(event.keyCode)
      // input text
      if ((code > 64 && code < 91) || (code > 185 && code < 223)||code === 32) {
        console.log(event.key);
        let type:wordBlockType = 'correct'
        if(key !== this.content[index]) type ='error'
        this.changeArticleWord(index,'typed')
        this.input.addWord(event.key,type,index)
      }
      // ENTER
      if (code === 13) {
        console.log("enter");
      }
      // spacebar
    //   if (code === 32) {
    //     console.log("spacebar");
    //   }
    //   back
      if (code === 8) {
        console.log("back",index);
        this.changeArticleWord(index-1,'default')
        this.input.deleteWord()
      }
    };
  }
}

class Editor {
  content: string;
  input: string;
}

function __main__() {
  let article = new Typing(document.getElementById("article"), testContent);
}

window.onload = function() {
  __main__();
};
