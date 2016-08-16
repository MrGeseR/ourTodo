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
        this.bindRename();

    }

    sort(){
        $('.list-group').sortable({
            connectWith: '.sortable',
            placeholder: 'emptySpace',
            revert: true,
            items: 'li',
            scroll: false,
            update: function(event, ui) {
                var changedList = this.id;
                var order = $(this).sortable('toArray');
                var positions = order.join(';');

                console.log({
                    id: changedList,
                    positions: positions
                });
            }
        }).disableSelection();
    }

    bindDelete(){
        this.taskBlock.find('.destroy').click(()=>{
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
            console.log(this.result);
        }));
    }

}
