import $ from 'jquery';
import Handlebars from 'handlebars';



if ($('.btnAddBoard').click || $($('.list-input').))

$('.btnAddBoard').click(function (){
    let val = $('.list-input').val();
    let source   = $('#template-article').html();
    let template = Handlebars.compile(source);
    let context = {title: val};
    let ready = template(context);
    $('#content').html(ready);
});


