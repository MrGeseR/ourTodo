import $ from 'jquery';
import Handlebars from 'handlebars';

export default class TaskList {
    constructor(id,title) {
        this.id = id;
        this.title = title;
        this.init();
    }

    bindDelete(){
        this.taskBlock.find('.destroy').click(()=>{
            this.taskBlock.remove();
        });
    }
    init(){
        var template = $('#template-article').html(),
            taskBlockTemplate = Handlebars.compile(template)({
                'id' : this.id,
                'title' : this.title
            });
        this.taskBlock = $($.parseHTML(taskBlockTemplate));

        $('#content').append(this.taskBlock);
        this.bindDelete();
    }
}
