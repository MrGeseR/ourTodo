// import $ from 'jquery';
import Handlebars from 'handlebars';
import Task from './task';
import createID from './createid';

export default class TaskList {
    constructor(id,title) {
        this.id = id;
        this.title = title;
        this.init();
        this.sort();
        var self = this;
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
            confirm.click(() => {
                let newText = $(editInput).val();
                text.html(newText);
                let tmpId = this.id;
                localStorage.setItem('data-task-list-id/' + tmpId,newText);
                text.show();
                $('.destroy').show(); $('.rename').show();
                editInput.remove(),confirm.remove(),reject.remove();
                localStorage.setItem('data-task-list-id/'+this.id, newText);
            });
            reject.click(function() {
                text.show();
                $('.destroy').show(); $('.rename').show();
                editInput.remove(),confirm.remove(),reject.remove();
            })
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
        this.bindRename();
        this.ulToStorage();
        this.taskBlock.find('.btnAddItem').click(()=> {
            return this.addTask()
        });
    }


    addTask(ID,VALUE) {
        var ul = this.id;
        let ui = $('[data-task-list-id=' + this.id + ']');

        let Id = ID||createID();
        let Value = VALUE||$(ui.find('.task-input')).val();
        if(Id && Value){
            $(ui.find('.list-group')).append(new Task(Id, Value, ul).taskCard)
        } else {
            alert ('Натыкай что хочешь сделать!!!');
        }
        $(ui.find('.task-input')).val('');
        let liKey = 'data-task-id/'+Id;
        let liValue = ['data-task-list-id/'+this.id, Value];
        localStorage.setItem(liKey, liValue);

    }

    ulToStorage() {
        let key = 'data-task-list-id/'+this.id;
        let value = this.title;
        localStorage.setItem(key, value);
    };

    ulDeleteFromStorage(){
        let key = 'data-task-list-id/'+this.id;
        localStorage.removeItem(key);
    }

};
