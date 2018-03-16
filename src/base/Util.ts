class Util{
    static addClass(obj: HTMLElement, cls: string){
        if (!this.hasClass(obj, cls)) {
            obj.className === "" ? obj.className = `${cls}` : obj.className += ` ${cls}`
        }
    }
    static hasClass(obj: HTMLElement, cls: string){
        return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
    }
    static removeClass(obj: HTMLElement, cls: string){
        if (this.hasClass(obj, cls)) {
            const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)")
            obj.className = obj.className.replace(reg, " ")
        }
    }
};
export default Util;