interface Window{
    utils:any
}
type CharBlockType = "default" | "typed" | "error" | "correct"|"transparent"|"indent"|'end';

interface TypingConfig  {
    text:string;
    el:HTMLElement
}