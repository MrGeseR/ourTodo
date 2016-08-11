import $ from 'jquery';
import Handlebars from 'handlebars';

class Task {
    constructor(id,title) {
        this.id = id;
        this.title = title;
        this.init();
    }

    bindDelete(){
        this.taskBlock.find('button').click(()=>{
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



new Task('222', 'Hello');
new Task('222', 'Hellsaffafaf');



$('.btnAddBoard').click(function(){
    new Task('1234', $('.list-input').val());
});



// import createID from './createid';
//
// var taskListCounter = 0;
//
// var enterBoard = $('.list-input').keypress(function (e) {
//  var key = e.which;
//  if(key == 13)
//   {
//     $('.btnAddBoard').click();
//     return false;
//   }
// });
//
// class Task {
//     // taskBoard = 'test';
//     constructor(id, title) {
//         this.id = id;
//         this.title = title;
//     }
//     // taskBoard = 'test';
//
// }
// Task.template = $('#template-article').html();
//
//
//
// //
// //
// // if ($('.btnAddBoard').click || enterBoard){
// //   $('.btnAddBoard').click(function (){
// //       if ($('.list-input').val()) {
// //           let val = $('.list-input').val();
// //           let source = $('#template-article').html();
// //           let template = Handlebars.compile(source);
// //           let newId = createID();
// //           let context = {title: val, id: newId};
// //           let ready = template(context);
// //           $('#content').html(ready);
// //           $('.list-input').val('');
// //           taskListCounter++;
// //
// //       } else {
// //           alert ("Введите название доски!")
// //       }
// //   });
// // };
// //
//
//
//
//
//
//
