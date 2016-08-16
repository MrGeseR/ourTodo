// import $ from 'jquery';
import createID from './createid';
import TaskList from './taskList';
// import ui from 'jquery-ui'

(function(){
  if(localStorage.length>0){
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if(key.slice(0,17) == "data-task-list-id"){
        new TaskList(key.slice(18), localStorage.getItem(key));
        console.log(key.slice(18));
      }
      else 
        console.log("goodbye");
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
