// import $ from 'jquery';
import Handlebars from 'handlebars';
import Task from './task';
import createID from './createid';

export default class TaskList {
    constructor(id,title) {
        this.id = id;
        this.title = title;
        this.init();
        this.addTask();
        this.sort();

    }

    sort(){
        $('.list-group').sortable({
            connectWith: '.sortable',
            placeholder: 'emptySpace'
        });
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

    addTask() {
        let ui = $('[data-task-list-id=' + this.id + ']');
        $(ui.find('.btnAddItem').click(() => {
            if ($(ui.find('.task-input')).val()) {
                $(ui.find('.list-group')).append(new Task(createID(), $(ui.find('.task-input')).val()).taskCard);
                $(ui.find('.task-input')).val('');
            } else {
                alert ('Натыкай что хочешь сделать!!!');
            }
        }));
    }

}
