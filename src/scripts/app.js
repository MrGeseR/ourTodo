import $ from 'jquery';
import Handlebars from 'handlebars';



var enterBoard = $('.list-input').keypress(function (e) {
 var key = e.which;
 if(key == 13)
  {
    $('.btnAddBoard').click();
    return false;
  }
});

if ($('.btnAddBoard').click || enterBoard){
  $('.btnAddBoard').click(function (){
    let val = $('.list-input').val();
    let source   = $('#template-article').html();
    let template = Handlebars.compile(source);
    let context = {title: val};
    let ready = template(context);
    $('#content').html(ready);
    $('.list-input').val('');
  });
};

//////////////////////////////////////////////////////////






