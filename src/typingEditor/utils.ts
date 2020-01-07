const utils = {
  hasClass,
  addClass,
  remove,
  timeLeft
};

/**
 *@desc 判断是否有某个Class
 *@param {HTMLElement} el 元素
 *@param {string} className 类名
 *@return {boolean}
 */
function hasClass(el: HTMLElement, className: string): boolean {
  return new RegExp("(\\s|^)" + className + "(\\s|$)").test(el.className);
}
/**
 * @desc 添加Class
 * @param el 元素
 * @param className 类名
 */
function addClass(el: HTMLElement, className: string) {
  if (hasClass(el, className)) return false;
  el.className += " " + className;
}

function remove(el: HTMLElement, className: string) {
  if (hasClass(el, className)) {
    let reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}
/**
 * @desc startTime - endTime 剩余时间
 * @param   startTime
 * @param   endTime
 * @return Object {d,h,m,s} 天时分秒
 */
function timeLeft(startTime: Date, endTime: Date): any {
  if (!startTime || !endTime) {
    return false;
  }
  let t = endTime.getTime() - startTime.getTime();
  let d = 0,
    h = 0,
    m = 0,
    s = 0,
    format = '0';
  if (t > 0) {
    d = t / 3600 / 24 / 1000;
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
    format = `${m}分${s}秒`
  }
  return {d,h,m,s,format}
}

export default utils;
window.utils = utils;
