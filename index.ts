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
    if (!word || word === " ") {
      this.word = "&nbsp;";
      this.html.innerHTML = "&nbsp";
    } else if (word === "\r\n" || word === "\n") {
      this.html = document.createElement("br");
      this.word = "<br>";
      console.log("换行");
    } else {
      this.html.innerText = word;
    }
    this.changeType(type);
  }
  /**
   * changeType
   */
  public changeType(type: wordBlockType) {
    this.html.appendChild;
    this.html.className = `word ${type}`;
  }
  toggleActive() {
    let className = this.html.className.split(" ")
    if(className.find((item)=>item === 'active')){

    }
    let isActive = className.findIndex(item=>item === 'active')
  
    if(isActive === -1){
      className.push('active')
    }else{
      className.splice(isActive,1)
    }
    this.html.className = className.join(" ")
  }
}

class Input {
  el: HTMLElement;
  words: Array<WordBlock> = [];
  index: number = 0;
  oldIndex = NaN;
  constructor(el: HTMLElement) {
    this.el = el;
  }

  addWord(char: string, type: wordBlockType, index) {
    let word = new WordBlock(char, type, index);
    this.el.appendChild(word.html);
    this.words.push(word);
    this.changeIndex(this.index + 1, this.index);
  }
  deleteWord() {
    if (this.index <= 0) {
      this.changeIndex(0, NaN);
      return false;
    }
    let word = this.words[this.words.length - 1];
    word.html.remove();
    this.words.pop();
    this.changeIndex(this.index - 1, this.index);
  }
  changeIndex(index: number, oldIndex: number) {
    this.index = index;
    this.oldIndex = oldIndex;
    // this.showIndex();
  }
  showIndex() {
    this.words[this.oldIndex].toggleActive();
    this.words[this.index].toggleActive()
  }
}

/**
 * TODO:
 * 输入Text Format
 * 高亮>
 */
class Typing {
  content: Array<string>;
  articleWords: Array<WordBlock> = [];
  screen: HTMLElement;
  input: Input;
  constructor(screen: HTMLElement, content: string) {
    this.content = content.split("");
    this.screen = screen;
    this.init();
  }
  init() {
    this.displayArticle();
    this.listenKeyborad();
    this.input = new Input(document.getElementById("input"));
  }
  displayArticle() {
    for (let i = 0; i < this.content.length; i++) {
      let word = new WordBlock(this.content[i], "default", i);
      this.articleWords.push(word);
      this.screen.appendChild(word.html);
      Window[`test${i}`] = word;
    }
  }
  changeArticleWord(index, type: wordBlockType) {
    this.articleWords[index].changeType(type);
  }
  listenKeyborad() {
    window.onkeydown = (event: any) => {
      let code: Number = event.keyCode;
      let key = event.key;
      let index = this.input.index;
      // input text
      if (
        (code > 47 && code < 59) ||
        (code > 64 && code < 91) ||
        (code > 185 && code < 223) ||
        code === 32
      ) {
        if (this.articleWords[index].word === "<br>") {
          this.handleBr(index);
          return;
        }
        let type: wordBlockType = "correct";
        if (key !== this.content[index]) type = "error";
        this.changeArticleWord(index, "typed");
        this.input.addWord(event.key, type, index);
      }
      // ENTER
      if (code === 13) {
        console.log("enter");
      }
      if (code === 8) {
        console.log("back", index);
        this.changeArticleWord(index - 1, "default");
        this.input.deleteWord();
      }
    };
  }
  handleBr(index: number) {
    let i = index;
    this.input.addWord("\n", "typed", index);
    i++;
    let articleChar = this.articleWords[i];
    do {
      this.input.addWord(" ", "typed", index);
      articleChar = this.articleWords[++i];
    } while (articleChar.word === "&nbsp;");
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
  // document.getElementById('btn').addEventListener('click',a)
};
function a() {
  let code1 = document.getElementById("code");
  console.log(code1.value);
  let strContent = code1.value;
  document.getElementById("set").innerHTML = strContent;
  let article = new Typing(document.getElementById("article"), strContent);
}
