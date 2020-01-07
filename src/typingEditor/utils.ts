const utils = {
   hasClass,
   addClass,
   remove
}

/**
 *@desc 判断是否有某个Class 
 *@param {HTMLElement} el 元素
 *@param {string} className 类名
 *@return {boolean} 
 */
function hasClass(el:HTMLElement,className:string):boolean{
    return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(el.className);
}
/**
 * @desc 添加Class
 * @param el 元素
 * @param className 类名 
 */
function addClass(el:HTMLElement,className:string){
    if(hasClass(el,className))return false;
    el.className += ' ' + className;
}

function remove(el:HTMLElement,className:string){
    if(hasClass(el,className)){
        let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}
export default utils
window.utils = utils