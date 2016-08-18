// import $ from 'jquery';
import createID from './createid';
import TaskList from './taskList';
// import ui from 'jquery-ui'

(function(){
  if(localStorage.length>0){
    for (var i = localStorage.length -1; i >= 0; i--) {
      var key = localStorage.key(i);
      if(key.slice(0,17) == "data-task-list-id"){
        new TaskList(key.slice(18), localStorage.getItem(key));
      }
      else {
        let qwe = localStorage.getItem(key).slice(18,26);
        console.log(qwe);
        let rty = $('[data-task-list-id='+qwe+']').find('.list-group');
        rty.addTask(key, localStorage.getItem(key).slice(27));
      }
    }
  };
}());


$('.btnAddBoard').click(function(){
    if ($('.list-input').val()) {
        new TaskList(createID(), $('.list-input').val());
        $('.list-input').val('');
    } else{
        alert('Введите название доски!')
    }

});
