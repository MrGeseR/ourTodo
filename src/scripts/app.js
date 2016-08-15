import $ from 'jquery';
import createID from './createid';
import TaskList from './taskList';
import ui from 'jquery-ui'




$('.btnAddBoard').click(function(){
    if ($('.list-input').val()) {
        new TaskList(createID(), $('.list-input').val());
        $('.list-input').val('');
    } else{
        alert('Введите название доски!')
    }

});

ui(function() {
    $('.list-group').sortable({
        connectWith: ".sortable",
        placeholder: 'emptySpace'
    });
} )


