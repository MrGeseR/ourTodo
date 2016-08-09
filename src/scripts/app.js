import Handlebars from 'handlebars';
import $ from 'jquery';

const source = $('#entry-template').html();
const template = Handlebars.compile(source);

const context = {
  item: {
    title: "My title",
    url: "http://www.google.com"
  }
};

Handlebars.registerHelper('link', function(text, url){
  url = Handlebars.escapeExpression(url);
  text = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString('<a href=' + url + '>' + text + "</a>");
});
$('.result').html(template(context));

Handlebars.registerHelper('bold', function(options) {
  return '<div class="mybold">' + options.fn(this) + '</div>';
});

$('.mybold').html(template(bold));
