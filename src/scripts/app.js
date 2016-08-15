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

$('.btnAddItem').on('click', function(){
    // if ($(this.parent().child().val())) {
    console.log($(this.parent()));

});


