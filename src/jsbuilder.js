export class HtmlElementHolder{
    constructor(options={}){
        if(options!={}){
            if(options.element==undefined)
                this.htmlElement = document.getElementById(options.elementId);
            else
                this.htmlElement = options.element;
        }
    }
    show(){
        this.htmlElement.hidden = false;
    }
    hide(){
        this.htmlElement.hidden = true;
    }
    getHtmlElement(){
        return this.htmlElement;
    }
}
export class Sandbox extends HtmlElementHolder{
    constructor(){
        super({elementId: 'jsb-sandbox'});
    }
}
export class Toolbox extends HtmlElementHolder{
    constructor(){
        super({elementId: 'jsb-toolbox'});
        this.templates = new Map();
        this.sections = new Map();
    }
    setTemplates(templates=[]){
        this.getHtmlElement().innerHTML = '';
        this.templates.clear();
        this.sections.clear();
        templates.forEach(t => {
            if(!this.sections.has(t.type)){
                let section = document.createElement('div');
                section.classList.add('jsb-toolbox-section');
                let title = document.createElement('div');
                title.classList.add('jsb-toolbox-section-title');
                title.innerHTML = t.type;
                section.appendChild(title);
                this.getHtmlElement().appendChild(section);
                this.sections.set(t.type, section);
            }

            let box = new Box(t);
            this.templates.set(t.name, box);
            this.sections.get(t.type).appendChild(box.getHtmlElement());
        });
    }
}
export class Box extends HtmlElementHolder{
    /*
        template = {
            'name': 'small-house',
            'title': 'Small House',
            'type': 'houses',
            'canContain':[
                {
                    'type': 'animal',
                    'amount': 2
                }
            ]
        }
        */
    constructor(template={}){
        console.log(template.name)
        let element = document.createElement('div');
        element.classList.add('jsb-box');
        super({element});
        this.template = template;
        this.name = template.name;
        this.type = template.type;
        this.canContain= new Map();

        if(template.canContain!=undefined){
            this.canContain.set('test', 10);
            template.canContain.forEach(e => {
                this.canContain.set(e.type, e.amount==undefined?0:e.amount);
            });
        }
        console.log(this.canContain);

        // title
        this.titleElement = document.createElement('span');
        this.titleElement.classList.add('jsb-box-title');
        this.titleElement.innerHTML = template.title;
        this.getHtmlElement().appendChild(this.titleElement);
    }
    setTranslate(xPos, yPos, el) {
        this.getHtmlElement().style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}