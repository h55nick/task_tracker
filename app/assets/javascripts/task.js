$(function() {
    $( "#datepicker" ).datepicker();
    $( "#create_task").click(createtask);
    $( "#cancel_edit").click(cancel_edit);
    $( "#edit_task").click(edittask);
    $("#clear_completed").click(clear_done);
    $('body').on('click','.editbtn', bringtop);
    $('body').on('click','.checkbox', checkboxclicked);

  });
function clear_done(){
  var token = $('input[name=authenticity_token]').val();
   $.ajax({
      dataType: 'json',
      type: "post",
      url: "/tasks/clearcompleted/all",
      data: {authenticity_token:token}
    }).done(remake_table);
   return false;
}


function checkboxclicked(){
  var taskid = $(($(this.parentElement).children())[6]).text();/*USE EQ NEXT TIME!!!*/
  var token = $('input[name=authenticity_token]').val();
  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/tasks/"+taskid,
      data: {authenticity_token:token, 'checked':true}
    }).done(remake_table);
return false;
}

function get_all(){
 var token = $('input[name=authenticity_token]').val();
  $.ajax({
      dataType: 'json',
      type: "get",
      url: "/tasks/ordered/all",
      data: {authenticity_token:token, 'checked':true}
    }).done(remake_table);
}

function remake_table(task_list){
  cancel_edit();
  $('tbody').children().remove('.task');
  process_task(task_list);
}

function process_task(task_list)
{
  _.each(task_list, display_task);
}

function display_task(newtask){
      add_marker(newtask.latitude, newtask.longitude, newtask.title);
      tdcheck = $('<td>').addClass('tcenter checkbox');
      tr = $('<tr>').addClass('task');
      if(newtask.is_complete){
        tdcheck.append($("<img>").attr("src",'/assets/smallcheck.jpg'));
        tr.addClass("done");
     }
    td1 = $('<td>').text(newtask.title);
    td2 = $('<td>').text(newtask.description);
    td3 = $('<td>').text(newtask.duedate);
    td4 = $('<td>').text(newtask.address);
    tdemp = $('<td>').css("background",newtask.priority.color);
    td5 = $('<td>').text(newtask.id).hide();
    td6 = $('<td>').addClass('center button small editbtn').text('Edit');

    tr.append([tdcheck]).append(td1,td2,td3,td4,tdemp,td5,td6);


    $('table').append(tr);
}




/*CLICK FUNCTIONALITY*/
function bringtop(e){
  var taskid = $(($(this.parentElement).children())[6]).text();
  var date = $(($(this.parentElement).children())[3]).text();
  var description= $(($(this.parentElement).children())[2]).text();
  var title = $(($(this.parentElement).children())[1]).text();
/*PUT DEFAULT */
  $('#title').val(title);
  $('#description').val(description);
  $('#datepicker').val(date);
  $('#address').val($(($(this.parentElement).children())[4]).text());
  $("#task_id").val(taskid);
  $('#create_task').hide();
  $('#edit_task').removeClass('hide');
  $('#cancel_edit').removeClass('hide');

  e.preventDefault();
  return false;
}

function cancel_edit(){
  $('#create_task').show();
  $('#edit_task').addClass('hide');
  $('#cancel_edit').addClass('hide');
    $('#title').val("");
  $('#description').val("");
  $('#datepicker').val("");
  $('#address').val("");
  $("#priority_id").val("");
}





function edittask(){
  var token = $('input[name=authenticity_token]').val();
 var taskid = $('#task_id').val();
  var title = $('#title').val();
  var description = $('#description').val();
  var datepicker = $('#datepicker').val();
  var address = $('#address').val();
  var priority_id = $("#priority_id").val();
  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/tasks/"+taskid,
      data: {_method:'put',authenticity_token:token,'task[title]':title,'task[description]':description,'task[duedate]':datepicker,'task[address]':address,'task[priority_id]':priority_id }
    }).done(remake_table);
return false;

}






/* AJAX SHIIITTTT*/

function createtask(){
  var token = $('input[name=authenticity_token]').val();
  var title = $('#title').val();
  var description = $('#description').val();
  var datepicker = $('#datepicker').val();
  var address = $('#address').val();
  var priority_id = $("#priority_id").val();
  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/tasks",
      data: {authenticity_token:token,'task[title]':title,'task[description]':description,'task[duedate]':datepicker,'task[address]':address,'task[priority_id]':priority_id }
    }).done(remake_table);
return false;
}



/* AJAX RESPONSE*/
