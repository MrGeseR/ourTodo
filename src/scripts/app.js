// import $ from 'jquery';
import createID from './createid';
import TaskList from './taskList';
// import ui from 'jquery-ui'

(function(){
  if(localStorage.length>0){
    for(var i = localStorage.length -1; i >= 0; i--) {
      var key = localStorage.key(i);
      if(key.slice(0,17) == "data-task-list-id"){
        var NTL = new TaskList(key.slice(18), localStorage.getItem(key));
        for(var j = 0; j < localStorage.length; j++){
          var key2 = localStorage.key(j);
          if (key.slice(18,26) == localStorage.getItem(key2).slice(18,26)) {
            NTL.addTask(key2.slice(13), localStorage.getItem(key2).slice(27));
          };
        };
      };
    };
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
