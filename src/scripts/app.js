import $ from 'jquery';
import createID from './createid';
import TaskList from './taskList';




$('.btnAddBoard').click(function(){
    if ($('.list-input').val()) {
        new TaskList(createID(), $('.list-input').val());
        $('.list-input').val('');
    } else{
        alert('Введите название доски!')
    }
});



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
