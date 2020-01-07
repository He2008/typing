import C from "./config";
import Utils from "./utils";
import { View } from "./view";
import {Analysis} from './analysis'
/**
 * @desc Typing 类
 * @
 */
class Typing {
  el: HTMLElement;
  displayView: View;
  inputView: View;
  index: number[] = [0, 0];
  analysis: Analysis;
  /**
   * 创建Typing实例
   * @param config.text 文章内容
   * @param config.el 挂载的htmlElement
   */
  constructor(config: TypingConfig) {
    this.el = config.el;
    let wrap = document.createElement("div");
    Utils.addClass(wrap, "screen-warp");
    this.displayView = new View(config.text, "display");
    this.inputView = new View(config.text, "input");
    this.analysis = new Analysis();
    wrap.append(this.displayView.html, this.inputView.html);
    this.el.append(this.analysis.html, wrap);
    this.handleKeyEvent();
  }

  /**
   * 监听键盘输入
   */
  handleKeyEvent() {
    window.onkeydown = (event: any) => {
      let code: Number = event.keyCode;
      let key = event.key;
      let lineIndex = () => this.index[1];
      let charIndex = () => this.index[0];
      let inputBlock = () =>
        this.inputView.lineList[lineIndex()].charList[charIndex()];
      let displayBlock = () =>
        this.displayView.lineList[lineIndex()].charList[charIndex()];
      // input text
      if (
        (code > 47 && code < 59) ||
        (code > 64 && code < 91) ||
        (code > 185 && code < 223) ||
        code === 32
      ) {
        let type: wordBlockType = "correct";
        if (key === " ") {
          key = "&nbsp;";
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            window.event.returnValue = false;
          }
        }
        if (key !== displayBlock().char) {
          type = "error";
          this.analysis.errorInput();
        }
        if (displayBlock().type === "end") {
          this.analysis.endInput();
        }
        displayBlock().changeType("transparent");
        inputBlock().changeType(type);
        this.moveIndex("forward");

        // 计数
        this.analysis.addInput();
        // 阻止浏览器默认
      }
      // ENTER
      if (code === 13) {
      }
      // back
      if (code === 8) {
        this.moveIndex("back");
        displayBlock().changeType("default");
        inputBlock().changeType("transparent");
      }
    };
  }
  /**
   * 移动光标
   * @param type 移动方向
   */
  moveIndex(type: string) {
    let lineIndex = this.index[1];
    let charIndex = this.index[0];
    let line = () => {
      return this.displayView.lineList[this.index[1]];
    };
    let char = () => {
      return line().charList[this.index[0]];
    };
    char().toggleActive(false);

    if (type === "forward") {
      if (checkEnd(this.displayView)) return;
      if (charIndex >= line().charList.length - 1) {
        this.index[0] = 0;
        this.index[1]++;
      } else {
        this.index[0]++;
      }
    } else if (type === "back") {
      if (checkStart(this.displayView)) return;
      if (charIndex > 0 && char().type !== "indent") {
        this.index[0]--;
      } else {
        this.index[1]--;
        this.index[0] = line().charList.length - 1;
      }
    }
    char().toggleActive(true);
    if (char().type === "indent") this.moveIndex(type);

    function checkEnd(view: View) {
      return (
        lineIndex === view.lineList.length - 1 &&
        line().charList.length - 1 === charIndex
      );
    }
    function checkStart(view: View) {
      return lineIndex === 0 && charIndex === 0;
    }
  }
}


// 主函数
function __main__() {
  let config: TypingConfig = {
    el: document.getElementById("typing"),
    text: C.content.trim()
  };
  let typing = new Typing(config);
}

window.onload = function() {
  __main__();
};
