/*Global variable to store json data.*/

var adult_menu_list = [], kids_menu_list = [], additional_data = [];

/*
 * WA: Objects in Arrays in your json data have redundant key
 * "Menu_item". This key has the name of a menu item. These names are
 * unique in the JSON file. A lot of code below can be made simple
 * by making these names keys of object and have corresponding nutrition
 * values in those objects.
 * 
 * This will let you reference a particular item's nutrition value like:
 * 
 * adult_menu_list["Flour Tortilla (burrito)"]
 * 
 * And you will not have to loop(in add_data_to_table function)
 * over adult_menu_list array and compare
 * name of a value to find if it was indeed the item that you were looking for.
 *
 * Same can be done with kids_menu_list.
 */
 /*parsing json data*/
 $.getJSON('adult_menu.json',function(json) {
   $.each(json,function(i,a_items) {
     adult_menu_list.push(a_items);
   });
 });

 $.getJSON('kids_menu.json',function(json) {
   $.each(json,function(i,k_items) {
     kids_menu_list.push(k_items);
   });
 });
 
 $.getJSON('header_data.json',function(json) {
   $.each(json,function(i,k_items) {
     additional_data.push(k_items);
   });
 });
 
 
 
var nutritionFunctions = {}    //namespace




nutritionFunctions.test_fun = function(ele){
  alert(ele);
}

var tester = $("#adult_menu_one").find("input");
for(var i=0;i<tester.length;i++){
  alert("*"+tester[i]);
  $(tester[i]).on('click', nutritionFunctions.test_fun(tester[i]));
}

// $.each($("#adult_menu_one").find("input"), function(i,ele){$(ele).bind('click', nutritionFunctions.test_fun(ele.name));});
/*Showing Respective menu item*/
$("#adult_menu").bind('click', show_adult_menu);
$("#kids_menu").bind('click', show_kids_menu);
$("input[name='kids_meat']").bind('click', clear_selected_options);


function show_adult_menu() {
  $("#adult_menu_one").find('input').attr("checked", false);
  $(additional_data[3].kids_menu_show[0]).hide();
  $(additional_data[1].adult_menu_show[0]).show();
  change_visible_menu(this.id);
  clear_tab_on_change();
  clear_added_values();
}

function show_kids_menu() {
  $("#kids_menu_one").find('input').attr("checked", false);
  $(additional_data[1].adult_menu_show[0]).hide();
  $(additional_data[3].kids_menu_show[0]).show();
  change_visible_menu(this.id);
  clear_tab_on_change();
  clear_added_values();
}

/*Toggling between display of kids or adult menu items on respective selection.*/
function change_visible_menu(menu_id) {
  if (menu_id == "adult_menu") {
    $(additional_data[1].adult_menu_show[0]).show();
    $(additional_data[3].kids_menu_show[0]).hide();
  } else if (menu_id == "kids_menu") {
    $(additional_data[3].kids_menu_show[0]).show();
    $(additional_data[1].adult_menu_show[0]).hide();
  }
  $.each(additional_data[2].menu_hide, function(i,ele){$(ele).hide();});
}

/*Binding functions to input elements*/
$("#adult_menu_one").delegate("input", "click", show_adult_options);
$("#kids_menu_one").delegate("input", "click", show_kids_options);
$("#adult_menu_one, #kids_menu_one").delegate("input", "click", pre_select_options);
$("#adult_menu_one, #kids_menu_one").delegate("input", "click", clear_added_values);
$("#adult_menu_one, #kids_menu_one").delegate("input", "click", add_nutri_fresh);
$("#what_inside").delegate("input", 'click', check_selected_options);
$("#adult_menu_options, #adult_regular_menu").delegate("input", 'click', add_nutri_adult);
$("#kids_regular_menu, #kids_third_menu, #kids_menu_options").delegate("input", 'click', add_nutri_kids);
/*Displaying list of items in a particular selected menu.*/

function show_adult_options() {
  $(additional_data[2].menu_hide[0]).hide();
  $(additional_data[2].menu_hide[1]).hide();
  $(additional_data[2].menu_hide[3]).show();
  $(additional_data[2].menu_hide[4]).show();
  var adult = $("#adult_menu_one").find("input:checked");
   if (adult.val() == "BURRITO") {
     clear_selections();
     $.each(additional_data[4].BURRITO[0].show_data, function(i,ele){$(ele).show();});
     $.each(additional_data[4].BURRITO[1].hide_data, function(i,ele){$(ele).hide();});
   } else if (adult.val() == "BURRITO BOWL") {
       clear_selections();
       $.each(additional_data[5].BURRITO_BOWL[0].show_data, function(i,ele){$(ele).show();});
       $.each(additional_data[5].BURRITO_BOWL[1].hide_data, function(i,ele){$(ele).hide();});
   } else if (adult.val() == "TACOS") {
       clear_selections();
       $.each(additional_data[6].TACOS[0].show_data, function(i,ele){$(ele).show();});
       $.each(additional_data[6].TACOS[1].hide_data, function(i,ele){$(ele).hide();});
   } else if (adult.val() == "SALAD") {
      clear_selections();
      $.each(additional_data[7].SALAD[0].show_data, function(i,ele){$(ele).show();});
      $.each(additional_data[7].SALAD[1].hide_data, function(i,ele){$(ele).hide();});
   }
} 
  
function show_kids_options() {
  var kid = $("#kids_menu_one").find("input:checked");
  $(additional_data[2].menu_hide[0]).show();
  $(additional_data[2].menu_hide[1]).show();
  $(additional_data[2].menu_hide[3]).hide();
  $(additional_data[2].menu_hide[4]).hide();
  if (kid.val() == "SMALL QUESADILLA MEAL") {
    clear_selections_kid_block();
    $.each(additional_data[8].SMALL_QUESADILLA_MEAL[0].show_data, function(i,ele){$(ele).show();});
    $.each(additional_data[8].SMALL_QUESADILLA_MEAL[1].hide_data, function(i,ele){$(ele).hide();});
  } else if (kid.val() == "SINGLE TACO MEAL") {
     clear_selections_kid_block();
     clear_selections();
     $.each(additional_data[9].SINGLE_TACO_MEAL[0].show_data, function(i,ele){$(ele).show();});
     $.each(additional_data[9].SINGLE_TACO_MEAL[1].hide_data, function(i,ele){$(ele).hide();});
  } else if (kid.val() == "TWO TACO KIT") {
     clear_selections_kid_block();
     clear_selections();
     $.each(additional_data[10].TWO_TACO_KIT[0].show_data, function(i,ele){$(ele).show();});
     $.each(additional_data[10].TWO_TACO_KIT[1].hide_data, function(i,ele){$(ele).hide();});
  } 
}

/*clearing pre selected items in case of change of choice of item.*/
function clear_selected_options(){
  $.each($("#what_inside").find("input"), function(i,ele){ele.checked = false; remove_item(ele.id);});
  addition_of_nutrition();
}

/*Checking condition of item selection of 2(in case of meat) or 3 (in case of veggie) for kids menu.*/

function check_selected_options() {
  var radio_selected = $("input[name='kids_meat']");
  var count = $("#what_inside").find("input:checked").length;
  for(var i=0; i<radio_selected.length; i++) {
    if(radio_selected[i].checked == true && radio_selected[i].id == "item_FajitaVegetables") {
		  if(count > 3) {
			  alert("Please select a maximum of 3 fillings!");
			  this.checked = false;
		    return;
			}
    } else if(radio_selected[i].checked == true && radio_selected[i].id != "item_FajitaVegetables") {
			if(count > 2) {
			  alert("Please select a maximum of 2 fillings!");
			  this.checked = false;
		    return;
			}
		}
  }
}

/*clearing various selections on change.*/
function clear_selections() {
  $.each($("input[type='checkbox']"), function(i,ele){ele.checked = false;});
  $.each($("input[name='tacos_3']"), function(i,ele){ele.checked = false;});
}

function clear_selections_kid_block() {
  $.each($("input[name='kids_meat'], input[name='side_one'], input[name='side_two'], input[name='tacos_1'], input[name='tacos_2'], input[name='side_rice']"), function(i,ele){ele.checked = false;});
}


/*marking pre selected options as checked.*/
function pre_select_options() {
  $.each(additional_data[11].selected_options, function(i,ele){$(ele)[0].checked = true;});
  if($("input[name='kids_menu_item']")[0].checked){
   $("input[name='kids_meat']")[0].checked = true; 
  } else {
   $("input[name='kids_meat']")[1].checked = true;  
  }
}

/*adding items for adult menu*/
function add_nutri_adult() {
  var name_of_item = /.+_(.+)/g.exec(this.id);
    if(this.checked && this.type == 'checkbox'){
      var row_id = "item_"+name_of_item[1];
      /* WA: REFACTOR */
      add_data_to_table(name_of_item[1], row_id, "adult");
    } else if(this.checked && this.type == 'radio'){
      var row_id ="radio_item";
      add_data_to_table(name_of_item[1], row_id, "adult");
    }else {
      remove_item(this.id);
    }
}

/*adding items for kids menu*/
function add_nutri_kids() {
  var name_of_item = /.+_(.+)/g.exec(this.id);
  var row_id;
  if(this.checked && this.type == 'checkbox'){
    row_id = "what_item_"+name_of_item[1];
    add_data_to_table(name_of_item[1],row_id, "kids");
    /* WA: REFACTOR */
  } else if(this.checked && this.type == 'radio'){
    if((/Chicken/.test(name_of_item[1])) || (/FajitaVegetables/.test(name_of_item[1])) || (/Steak/.test(name_of_item[1])) || (/Barbacoa/.test(name_of_item[1])) || (/Carnitas/.test(name_of_item[1])) || (/Guacamole/.test(name_of_item[1]))){
      row_id = 'kids_meat';
    } else if((/CilantroLimeRiceSide/.test(name_of_item[1])) || (/BrownRiceSide/.test(name_of_item[1]))) {
      row_id = 'side_rice';
    } else if((/BlackBeansSide/.test(name_of_item[1])) || (/PintoBeansSide/.test(name_of_item[1]))) {
      row_id = 'side_beans';
    } else if((/SoftCornTortilla/.test(name_of_item[1])) || (/CrispyCornTortilla/.test(name_of_item[1])) || (/SoftFlourTortilla/.test(name_of_item[1]))) {
      row_id = 'side_taco';
    } else if((/CheeseSmallQuesadilla/.test(name_of_item[1]))) {
      row_id = 'cheese_small';
    } else if((/Chips/.test(name_of_item[1]))) {
      row_id = 'chips';
    }
    add_data_to_table(name_of_item[1], row_id, "kids");
  } else {
    remove_item(this.id);
  }
}

/*clearing nutrition table data*/
function clear_tab_on_change() {
  $.each($("#nutri_table").find("tr[id!='tab']"), function(i,ele){$(ele).remove();});
}

/*clearing calculated values of nutrition table.*/
function clear_added_values() {
  $('#nutri_table tr:last').find("td[id!='total']").html(0);
}

/*adding preselected items to table*/
function add_nutri_fresh(element) {
  $.each($("#nutri_table").find("tr[id!='tab']"), function(i,ele){$(ele).remove();});
  var name_of_item = [], row_id = [], multiplier, selected_data, food_array;
  if(/kids/.test(this.name)){
    food_array = kids_menu_list;
    selected_data = $("#kids_menu_one").find("input:checked");
  } else if(/adult/.test(this.name)) {
    food_array = adult_menu_list;
    selected_data = $("#adult_menu_one").find("input:checked");;
  }
  if (selected_data[0].value == "SMALL QUESADILLA MEAL") {
    name_of_item =["SoftFlourTortilla","CheeseSmallQuesadilla","CilantroLimeRiceSide","BlackBeansSide","Chips"];
    row_id =['flour_taco','cheese_small','side_rice','side_beans','chips'];
    multiplier = 1;
  } else if (selected_data[0].value == "SINGLE TACO MEAL" || selected_data[0].value == "TWO TACO KIT") {
    name_of_item = ["CrispyCornTortilla","Chicken","CilantroLimeRiceSide","Chips"];
    row_id =['side_taco','kids_meat','side_rice','chips'];
    if(selected_data[0].value == "TWO TACO KIT") {
      multiplier = 2;
    } else {
      multiplier = 1;
    }
  } else if (selected_data[0].value == "BURRITO") {
    name_of_item = ["FlourTortillaBurrito"];
    multiplier = 1;
    row_id = ['radio_item'];
  } else if (selected_data[0].value == "TACOS") {
    name_of_item = ["CrispyCornTortilla"];
    row_id = ['radio_item'];
    multiplier = 3;
  } else if (selected_data[0].value == "SALAD") {
    name_of_item = ["RomaineLettuceSalad"];
    row_id = ['radio_item'];
    multiplier = 1;
  }
  for(var j=0; j<food_array.length; j++) {
    for(var k=0; k<name_of_item.length; k++) {
      var new_row = $("<tr id="+row_id[k]+"></tr>");
      if(food_array[j][additional_data[0].array_nutrition[0]] == name_of_item[k] ) {
        new_row.append($("<td id = 'title'></td>").text(food_array[j][additional_data[0].array_nutrition[0]]));
        for(var k=1;k<16;k++){
          new_row.append($("<td></td>").text(food_array[j][additional_data[0].array_nutrition[k]]*multiplier));
        }
        $('#nutri_table tr:last').before(new_row);
        addition_of_nutrition();
        break;
      }
    }
  }
}

/*adding data to nutrition table*/
function add_data_to_table(name_of_item,row_id, data) {
  var food_array;
  if(/kids/.test(data)){
    if($("input[name='kids_menu_item']")[2].checked == true && (name_of_item == 'SoftCornTortilla' || name_of_item == 'CrispyCornTortilla' || name_of_item == 'SoftFlourTortilla')) {
      multiplier = 2;
    } else { multiplier = 1; }
    food_array = kids_menu_list;
  } else {
    food_array = adult_menu_list;
    if (name_of_item == "CrispyCornTortilla" || name_of_item == "FlourTortillaTaco" || name_of_item == "SoftCornTortilla"){
      multiplier = 3;
    } else {
      multiplier = 1;
    }
  }
      /* WA: REFACTOR */
  for(var j=0; j<food_array.length; j++) {
    var new_row = $("<tr id="+row_id+" onClick = 'remove_row(this)'></tr>");
    if(food_array[j][additional_data[0].array_nutrition[0]] == name_of_item ) {
      new_cell1 = $("<td id = 'title'></td>")
      new_cell1.text(food_array[j][additional_data[0].array_nutrition[0]]);
      if(/adult/.test(data) && (name_of_item == "Chicken" || name_of_item == "Steak" || name_of_item == "Carnitas" || name_of_item == "Barbacoa")){
        form_div = $("<div class=\"form_div\"><label>Servings</label><input type = \"text\" class = \"serve\" id=\"serve_"+name_of_item+"\" value = \"1\"><span class = \"add\" onClick = \"add_servings(event, this.id);\" id=\"add_"+name_of_item+"\">+</span><span class = \"del\" onClick = \"del_servings(event, this.id);\" id=\"del_"+name_of_item+"\">-</span>")
        new_cell1.append(form_div);
      }
      new_row.append(new_cell1);
      for(var k=1;k<16;k++){
        new_row.append($("<td></td>").text(food_array[j][additional_data[0].array_nutrition[k]]*multiplier));
      }
      if($("#nutri_table").find("tr[id="+row_id+"]").length > 0){
        $("#nutri_table").find("tr[id="+row_id+"]").replaceWith(new_row);
      } else {
        $('#nutri_table tr:last').before(new_row);
      }
      addition_of_nutrition();
      break;
    }
  }
}

/*Removing unchecked or changed item from nutrition table.*/
function remove_item(element_id) {
  $("#nutri_table").find("tr[id ^="+element_id+"]").remove();
  addition_of_nutrition();
}

/*Addition of nutrition value.*/
function addition_of_nutrition() {
      /* WA: REFACTOR */
  for(var i=2; i<17; i++) {
    var sum = 0;
    $("#nutri_table").find("tr[id!='tab']").children("td:nth-child("+i+")").each(function(){
    sum += parseFloat($(this).html());
    });
    $('#nutri_table tr:last').children("td:nth-child("+i+")").html(sum);
  }
}

//function to add servings.
function add_servings(event, item_id) {
  event.stopPropagation();
  var id_code = item_id.split(/\_/g);    //stores chicken,steak etc.
  if($("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val() == 1){
    $("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val(2);
    $.each($("#nutri_table").find("tr[id ='item_"+id_code[1]+"']").find("td[id!='title']"), function(i,ele){$(ele).html(parseFloat($(ele).html())*2);});
    addition_of_nutrition();
  }
}

//function to delete servings.
function del_servings(event, item_id) {
 event.stopPropagation();
 var id_code = item_id.split(/\_/g);    //stores chicken,steak etc.
 if($("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val() == 2){
   $("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val(1);
   $.each($("#nutri_table").find("tr[id ='item_"+id_code[1]+"']").find("td[id!='title']"), function(i,ele){$(ele).html(parseFloat($(ele).html())*0.5);});
   addition_of_nutrition();
 } 
}

// function to delete row on clicking each row.
function remove_row(th) {
  $("input[id=\'"+th.id+"\']")[0].checked = false;
  $(th).remove();
  addition_of_nutrition();
}

$("#item_No_Item").click(function() {
  $("#nutri_table").find("tr[id ='kids_meat']").remove();
  addition_of_nutrition();
});