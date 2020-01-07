
import Utils from './utils'
export class Analysis {
    html: HTMLElement;
    time: Time;
    inputNum: number = 0;
    errorNum: number = 0;
    result: any;
    isEnd: boolean = false;
    timer: number;
    constructor() {
      this.time = new Time();
      this.html = document.createElement("div");
      Utils.addClass(this.html, "analysis");
      this.timer = setInterval(() => {
        if (this.isEnd) {
          clearInterval(this.timer);
        }
        this.appendHtml();
      }, 1000);
    }
    addInput() {
      if (this.isEnd) return;
      if (this.inputNum === 0) {
        this.time.setStart();
      }
      this.inputNum++;
      this.handleData();
    }
    errorInput() {
      if (this.isEnd) return;
      this.errorNum++;
    }
    endInput() {
      if (this.isEnd) return;
      this.isEnd = true;
      this.time.setEnd();
    }
    handleData() {
      this.result = {
        totalTime: this.time.total,
        totalInput: this.inputNum,
        error: this.errorNum,
        correctRate:this.inputNum?1-(this.errorNum / this.inputNum):1
      };
    }
    appendHtml() {
      this.time.handleCostTime();
      this.handleData();
      let r = this.result;
      let html = `<span>用时:${r.totalTime.format || "0"}</span><span>总输入:${
        r.totalInput
      }</span><span>错误:${r.error}</span><span>正确率:${Math.ceil(
       r.correctRate  * 100
      )}%</span>`;
      this.html.innerHTML = html;
    }
  }
  
 export class Time {
    start: Date;
    end: Date;
    total: string;
    timer: number;
    constructor() {}
    setStart() {
      this.start = new Date();
    }
    setEnd() {
      this.end = new Date();
      this.handleCostTime();
    }
    handleCostTime() {
      let end = new Date();
      if (this.end) {
        end = this.end;
      }
      this.total = Utils.timeLeft(this.start, end);
    }
  }