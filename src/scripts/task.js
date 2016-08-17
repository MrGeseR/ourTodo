// import $ from 'jquery';
import Handlebars from 'handlebars';

export default class Task {
    constructor(id,title,ui) {
        this.id = id;
        this.title = title;
        this.init();
        this.ul=ui;
    }

    bindDelete(){
        this.taskCard.find('.task__delete').click(()=>{
            this.taskCard.remove();
        });
    }

    bindRename() {
        this.taskCard.find('.task__edit').click(()=>{
            let text = $(this.taskCard.find('.task__text'));
            text.hide();
            var editInput = $("<input type='text' id='text' value='"+text.html()+"'>");
            let confirm  = $('<i class="fa fa-check confirm" aria-hidden="true"></i>');
            let reject = $('<i class="fa fa-times reject" aria-hidden="true"></i>');
            $('.task__edit').hide();
            $('.task__delete').hide();

            text.after(editInput,confirm,reject);
            confirm.click(() => {
                let newText = $(editInput).val();
                text.html(newText);
                text.show();
                $('.task__edit').show(); $('.task__delete').show();
                editInput.remove(),confirm.remove(),reject.remove();
                localStorage.setItem('data-task-id/'+this.id, ['data-task-list-id/'+this.ul, newText]);
            });
            reject.click(function() {
                text.show();
                $('.task__edit').show(); $('.task__delete').show();
                editInput.remove(),confirm.remove(),reject.remove();
            });
        });
    }

    init() {
        var template = $('#list-template').html(),
            taskTemplate = Handlebars.compile(template)({
                'id': this.id,
                'title': this.title
            });
        this.taskCard = $($.parseHTML(taskTemplate));
        this.bindDelete();
        this.bindRename();
    }

};