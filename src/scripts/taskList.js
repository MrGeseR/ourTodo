// import $ from 'jquery';
import Handlebars from 'handlebars';
import Task from './task';
import createID from './createid';

export default class TaskList {
    constructor(id,title) {
        this.id = id;
        this.title = title;
        this.tasks = [];
        this.init();
        this.sort();

    }

    sort(){
        $('.list-group').sortable({
            connectWith: '.sortable',
            placeholder: 'emptySpace',
            revert: true,
            items: 'li',
            scroll: false,
        }).disableSelection();
    }

    bindDelete(){
        this.taskBlock.find('.destroy').click(()=>{
            localStorage.removeItem('data-task-list-id/' +this.id+ '');
            console.log(this.id);
            this.taskBlock.remove();
        });
    }

    bindRename(){
        this.taskBlock.find('.rename').click(()=>{
            let text = $(this.taskBlock.find('.listTitle'));
            text.hide();
            var editInput = $("<input type='text' id='text' value='"+text.html()+"'>");
            let confirm  = $('<i class="fa fa-check confirm" aria-hidden="true"></i>');
            let reject = $('<i class="fa fa-times reject" aria-hidden="true"></i>');
            $('.destroy').hide();
            $('.rename').hide();

            text.after(editInput,confirm,reject);
            confirm.click(function() {
                let newText = $(editInput).val();
                text.html(newText);
                text.show();
                $('.destroy').show(); $('.rename').show();
                editInput.remove(),confirm.remove(),reject.remove();
            });
            reject.click(function() {
                text.show();
                $('.destroy').show(); $('.rename').show();
                editInput.remove(),confirm.remove(),reject.remove();
            })
        })
        this.ulToStorage();
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
        this.addTask();
        this.bindRename();
        this.ulToStorage();

    }

    addTask(ID,VALUE) {
        let ui = $('[data-task-list-id=' + this.id + ']');
        $(ui.find('.btnAddItem').click(() => {
            if(ID && VALUE){
                $(ui.find('.list-group')).append(new Task(ID, VALUE).taskCard)
            } else if ($(ui.find('.task-input')).val()) {
                $(ui.find('.list-group')).append(new Task(createID(), $(ui.find('.task-input')).val()).taskCard);
                $(ui.find('.task-input')).val('');
            } else {
                alert ('Натыкай что хочешь сделать!!!');
            };
        }));

    //     liToStorage(){
    //         let liKey = 'data-task-id/'+this.id;
    //         let liValue = ['data-task-list-id/'+this.id;
    //         localStorage.setItem(key, value);
    //     }();

    }

    ulToStorage() {
        let key = 'data-task-list-id/'+this.id;
        let value = this.title;
        localStorage.setItem(key, value);
    };

};
