import $ from 'jquery';
import Handlebars from 'handlebars';

export default class Task {
    constructor(id,title) {
        this.id = id;
        this.title = title;
        this.init();
    }

    bindDelete(){
        this.taskCard.find('.task__delete').click(()=>{
            this.taskCard.remove();
        });
    }

    init(){
        var template = $('#list-template').html(),
            taskTemplate = Handlebars.compile(template)({
                'id' : this.id,
                'title' : this.title
            });
        this.taskCard = $($.parseHTML(taskTemplate));
        this.bindDelete();
}