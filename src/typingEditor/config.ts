const java = 
`
public class StringCompareEmp{
    public static void main(String args[]){
       String str = "Hello World";
       String anotherString = "hello world";
       Object objStr = str;
  
       System.out.println( str.compareTo(anotherString) );
       System.out.println( str.compareToIgnoreCase(anotherString) );
       System.out.println( str.compareTo(objStr.toString()));
    }
 }
`
const js = 
`
document.ready = function (callback) {
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
}
`
const line = `this is a line!`


export default{
content:java,
java,
js

}
