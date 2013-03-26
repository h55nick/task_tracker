$(function(){
  $('#edit_priority').click(show_edit);
  $('#new_priority').click(show_new);
  $('#cancel_priority').click(hide_form);
  $('#create_priority').click(create_priority);
  $('#update_priority').click(update_priority);
  $('#priorities').on("click",".up",upclick);
  $('#priorities').on("click",".down",downclick);
  $('#priorities').on('click', '.color', edit_priority);

  add_color_boxes();
  init_minicolors();

});

//
/*-------GLOBAL VARIABLEs -------------*/

//
function upclick(){
  var  id = $(this).nextUntil(".clear").last().text();
  var token = $('input[name=authenticity_token]').val();

  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/priorities/" +id + "/up",
      data: {authenticity_token:token}
    }).done(resort);

}
function downclick(){
   id = $(this).nextUntil(".clear").last().text();
     var token = $('input[name=authenticity_token]').val();

  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/priorities/" +id + "/down",
      data: {authenticity_token:token}
    }).done(resort);

}



function init_minicolors()
{
  var settings = {
    animationSpeed: 100,
    animationEasing: 'swing',
    change: null,
    changeDelay: 0,
    control: 'hue',
    defaultValue: '',
    hide: null,
    hideSpeed: 100,
    inline: false,
    letterCase: 'lowercase',
    opacity: false,
    position: 'default',
    show: null,
    showSpeed: 100,
    swatchPosition: 'left',
    textfield: false,
    theme: 'default'
};

  $('INPUT.minicolors').minicolors(settings);
}

function edit_priority()
{
  show_edit();
  var color = $(this).css('background-color');
  color = rgb2hex(color);
  $('input.minicolors').minicolors('value', color);
  var name = $(this).next();
  name = name.text();
  $('#name').val(name);
  var value = $(this).next().next().text();
  $('#value').val(value);
  var priority_id = $(this).next().next().next().text();
  $('#priority_id').val(priority_id);
}

function create_priority()
{
  var value = $('#value').val();
  var name = $('#name').val();
  var color = $('input.minicolors').minicolors('value');
  var token = $('input[name=authenticity_token]').val();
  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/priorities",
      data: {authenticity_token:token, color:color, name:name, value:value}
    }).done(resort);

  return false;
}

function update_priority()
{
  var value = $('#value').val();
  var name = $('#name').val();
  var color = $('input.minicolors').minicolors('value');
  var token = $('input[name=authenticity_token]').val();
  var priority_id = $('#priority_id').val();
  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/priorities/"+priority_id,
      data: {_method:'put',authenticity_token:token, 'prior[color]':color, 'prior[name]':name, 'prior[value]':value}
    }).done(resort);
  return false;
}

function add_priority_to_array(priority)
{
  priorities = _.reject(priorities, function(p){return p.id == priority.id;});
  priorities.push(priority);
  priorities = _.sortBy(priorities, function(p){ return p.value; }).reverse();
}


function resort(message){

  _.each(message, add_priority_to_array);
  $('ul#priorities').empty();
  _.each(priorities, display_priority);

}

function display_priority(message)
{

  var li = $('<li>');
  var div1 = $('<div>');
  var div2 = $('<div>');
  var div3 = $('<div>');
  var div4 = $('<div>');
  var div5 = $('<div>');

  var img1 =$('<img>').addClass('up priority').attr("src","assets/arrow_up.png");
  var img2 =$('<img>').addClass('down priority').attr("src","assets/arrow_down.png");


  div1.addClass('priority').addClass('color');
  div2.addClass('priority');
  div3.addClass('priority').addClass('hide');
  div4.addClass('priority').addClass('hide');
  div5.addClass('clear');

  div1.css('background-color', message.color);
  div2.text(message.name);
  div3.text(message.value);
  div4.text(message.id);

  li.append([img1,img2,div1, div2, div3, div4, div5]);
  $('#priorities').append(li);

  hide_form();
}

function hide_form()
{
  $('#new_priority').show();
  $('.form').hide();
}


function show_edit(){
  $('#create_priority').hide();
  $('#update_priority').show();
  $('#new_priority').hide();
  $('.form').show();
  $('#name').focus();
}
function show_new()
{
  $('#name').val('');
  $('#value').val('');
  $('input.minicolors').minicolors('value','#fff');
  $('#update_priority').hide();
  $('#new_priority').hide();
  $('#create_priority').show();
  $('.form').show();
  $('#name').focus();
}

function add_color_boxes()
{
  $('.color').each(change_text_to_color);
}

function change_text_to_color(index, element)
{
  var box = $(element);
  var color = box.text();

  box.removeClass('hide');
  box.css('background-color', color);
  box.text('');
}

function rgb2hex(rgb)
{
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}
