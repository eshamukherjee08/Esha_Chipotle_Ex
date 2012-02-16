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
 *
 * Before putting name of the menu item in your object as a key, you might want to
 * process it. It might contain some non standard characters.
 *
 * This will always be a one time process done on client side. So this is always
 * a big plus.
 */

/*
 * WA: Making Ajax request _while_ your page is loading is a bad practice.
 * Put these request in jQuery(document).ready block.
 *
 */
 
 //EM: Not able to understand.
/*
 * WA: Almost always, do not put your markup in your data. We don't gain much from it.
 * Everytime your page loads, a request to your server, which is already
 * under heavy load, is made.
 *
 * If we are bulletproofing our application against future changes, we
 * should do it with other parts of our markup/html also.
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
  /*
   * WA: Please loop over array_nutrition instead of looping over
   * a bounded key k. Very much like looping done in Ajax requests
   * made above.
   */
/*
 * WA: Please don't _ever_ declare functions or variables in global namespace. Use
 * Javascript module pattern instead.
 */
var nutritionFunctions = {}    //namespace
/*Showing Respective menu item*/
$("#adult_menu").bind('click', show_adult_menu);
$("#kids_menu").bind('click', show_kids_menu);
function show_adult_menu() {
  /*
   * WA: No need to loop over inputs to uncheck/check all of them
   * at once. Use following piece of code instead. Notice no loops.
   *
   * $("#adult_menu_one").find('input').attr("checked", false)
   *
   * jQuery atomaticaly tries to apply a function to all the elements
   * returned by $(). $() always returns an array of elements which
   * can be processed together. See its documentation for more info.
   *
   */
   $("#adult_menu_one").find('input').attr("checked", false);
  /*
   * WA: An object should almost always be told what to do and not
   * asked if it can do something.
   *
   * Checking of ids below is not good. We should have declared two
   * diffrent functions. show_adult_menu and show_kids_menu. Those
   * should have handled displaying of respective menus.
   *
   * An apparent advantage of this would be that we wont have to uncheck
   * both the menu items simultaneously and then depending upon the id
   * below show one of them.
   */
  $(additional_data[3].kids_menu_show[0]).hide(); /* WA: Please use jQuery's .show() and .hide() instead. */
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
/*
 * WA: Avoid chaining of functions while attaching same event to a group
 * of elements. Declare a wrapper function around show_options, pre_select_options,
 * clear_added_values and add_nutri_fresh. Attach this wrapper function
 * on click event to these elements.
 *
 * Stop using .live(). Why? See: http://www.elijahmanor.com/2012/02/differences-between-jquery-bind-vs-live.html#tldr
 *
 * Please use fast selectors. Going to inputs through #adult_menu_item, #kids_menu_item would have been faster.
 *
 */
$("#adult_menu_one, #kids_menu_one").delegate("input", "click", show_options);
$("#adult_menu_one, #kids_menu_one").delegate("input", "click", pre_select_options);
$("#adult_menu_one, #kids_menu_one").delegate("input", "click", clear_added_values);
$("#adult_menu_one, #kids_menu_one").delegate("input", "click", add_nutri_fresh);
/*Displaying list of items in a particular selected menu.*/

function show_options() {
  /*
   * WA: Following 'if' tells that we should extract out handling
   * of different menus in different functions. See my above comment
   * about checking of ids.
   *
   */
   //EM: used checking of ids so that the function can be used for both cases and neednt be repeated.
  if (this.name == "adult_menu_item") {
    $(additional_data[2].menu_hide[0]).hide();
    $(additional_data[2].menu_hide[1]).hide();
    $(additional_data[2].menu_hide[3]).show();
    $(additional_data[2].menu_hide[4]).show();
    /* WA: Use fast selectors */
    /*
     * WA: Do not loop over form inputs to know which was selected/checked.
     * Use jQuery's .val() function instead. Also look at :selected and
     * :checked selectors.
     *
     */
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
  } else if (this.name == "kids_menu_item") {
    var kid = $("#kids_menu_one").find("input:checked");;
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
}

/*clearing pre selected items in case of change of choice of item.*/
$("input[name='kids_meat']").bind('click', clear_selected_options);
function clear_selected_options(){
  $.each($("#what_inside").find("input"), function(i,ele){ele.checked = false; remove_item(ele.id);});
  /* WA: There are no such elements in mark up whose id starts with 'what_item'. If you are creating it dynamically, reference it dynamically. */
  addition_of_nutrition();
}

/*Checking condition of item selection of 2(in case of meat) or 3 (in case of veggie) for kids menu.*/
$("#what_inside").delegate("input", 'click', check_selected_options);

function check_selected_options() {
  var radio_selected = $("input[name='kids_meat']");
  var count = $("#what_inside").find("input:checked").length;
  for(var i=0; i<radio_selected.length; i++) {
    if(radio_selected[i].checked == true && radio_selected[i].id == "item_Veggies_k") { /* WA: A very suitable use of :checked selector can be made here. */
		  if(count > 3) {
			  alert("Please select a maximum of 3 fillings!");
			  this.checked = false;
		    return;
			}
    } else if(radio_selected[i].checked == true && radio_selected[i].id != "item_Veggies_k") {
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

/*binding function on click to add menu items.*/

$("#adult_menu_options, #adult_regular_menu").delegate("input", 'click', add_nutri_adult);
$("#kids_regular_menu, #kids_third_menu, #kids_menu_options").delegate("input", 'click', add_nutri_kids);

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
//not clear
function add_nutri_adult() {
  var id = this.id;
  var data = "adult";
  if(this.checked && this.type == 'checkbox'){
    var name_of_item;
    var row_id;
    /* WA: REFACTOR */
    if(/Chicken/.test(id)){
      name_of_item = "Chicken";
      row_id = 'item_Chicken1';
    } else if(/Vinaigrette/.test(id)) {
      name_of_item = "Vinaigrette";
      row_id = 'item_Vinaigrette1';
    } else if(/Chips_1/.test(id)) {
      name_of_item = "Chips";
      row_id = 'item_Chips_1';
    } else if(/Steak/.test(id)) {
      name_of_item = "Steak";
      row_id = 'item_Steak1';
    } else if(/Barbacoa/.test(id)) {
      name_of_item = "Barbacoa";
      row_id = 'item_Barbacoa1';
    } else if(/Carnitas/.test(id)) {
      name_of_item = "Carnitas";
      row_id = 'item_Carnitas1';
    } else if(/White_Rice/.test(id)) {
      name_of_item = "Cilantro-Lime Rice";
      row_id = 'item_White_Rice_1';
    } else if(/Brown_Rice/.test(id)) {
      name_of_item = "Cilantro-Lime Rice";
      row_id = 'item_Brown_Rice_1';
    } else if(/Black/.test(id)) {
      name_of_item = "Black Beans";
      row_id = 'item_Black_Beans1';
    } else if(/Pinto/.test(id)) {
      name_of_item = "Pinto Beans";
      row_id = 'item_Pinto_Beans1';
    } else if(/Fajita/.test(id)) {
      name_of_item = "Fajita Vegetables";
      row_id = 'item_Fajita_Vegetables1';
    } else if((/Fresh/.test(id)) && (/Tomato/.test(id)) && (/Salsa/.test(id))) {
      name_of_item = "Fresh Tomato Salsa ";
      row_id = 'item_Fresh_Tomato_Salsa1';
    } else if(/Cheese/.test(id)) {
      name_of_item = "Cheese";
      row_id = 'item_Cheese1';
    } else if(/Sour/.test(id)) {
      name_of_item = "Sour Cream";
      row_id = 'item_Sour_Cream1';
    } else if((/Green_Chili_Salsa/.test(id))) {
      name_of_item = "Tomatillo-Green Chili Salsa";
      row_id = 'item_Green_Chili_Salsa_1';
    } else if((/Red_Chili_Salsa/.test(id))) {
      name_of_item = "Tomatillo-Red Chili Salsa";
      row_id = 'item_Red_Chili_Salsa_1';
    } else if((/Romaine/.test(id)) && (/Lettuce/.test(id))) {
      name_of_item = "Romaine Lettuce (tacos)";
      row_id = 'item_Romaine_Lettuce1';
    } else if(/Guacamole_1/.test(id)) {
      name_of_item = "Guacamole";
      row_id = 'item_Guacamole_1';
    } else if((/Chili/.test(id)) && (/Corn/.test(id)) && (/Salsa/.test(id))) {
      name_of_item = "Roasted Chili-Corn Salsa ";
      row_id = 'item_Chili_Corn_Salsa1';
    } else if((/Chips_And_Guacamole/.test(id))) {
      name_of_item = "Chips & Guacamole";
      row_id = 'item_Chips_And_Guacamole';
    } else if((/Chips_Chili_Salsa_Green/.test(id))) {
      name_of_item = "Chips & Tomatillo-Green Chili Salsa";
      row_id = 'item_Chips_Chili_Salsa_Green_1';
    } else if((/Chips_Chili_Salsa_Red/.test(id))) {
      name_of_item = "Chips & Tomatillo-Red Chili Salsa";
      row_id = 'item_Chips_Chili_Salsa_Red_1';
    } else if((/Chips_Tomato_Salsa/.test(id))) {
      name_of_item = "Chips & Fresh Tomato Salsa";
      row_id = 'item_Chips_Tomato_Salsa_1';
    } else if((/Chips/.test(id)) && (/Corn/.test(id)) && (/Salsa/.test(id))) {
      name_of_item = "Chips & Roasted Chili-Corn Salsa";
      row_id = 'item_Chips_Corn_Salsa1';
    }
    add_data_to_table(name_of_item, row_id, data);
  } else if(this.checked && this.type == 'radio'){
    var name_of_item;
    var row_id ="radio_item";
    if((/Romaine_Lettuce_Salad/.test(id))) {
      name_of_item = "Romaine Lettuce (salad)";
    } else if((/Crispy_Corn_Tortilla/.test(id))) {
      name_of_item = "Crispy Taco Shell";
    } else if((/Soft_Flour_Tortilla_Taco/.test(id))) {
      name_of_item = "Flour Tortilla (taco)";
    } else if((/Soft_Corn_Tortilla/.test(id))) {
      name_of_item = "Soft Corn Tortilla";
    } else if((/Soft_Flour_Tortilla_burrito/.test(id))) {
      name_of_item = "Flour Tortilla (burrito)";
    }
    add_data_to_table(name_of_item, row_id, data);
  }else {
    remove_item(this.id);
  }
}

/*adding items for kids menu*/
//not clear
function add_nutri_kids() {
    var id = this.id;
    var data = "kids";
    if(this.checked && this.type == 'checkbox'){
      var name_of_item;
      var row_id;
      /* WA: REFACTOR */
      if(/White_Rice/.test(id)){
        name_of_item = "Cilantro-Lime Rice (taco)";
        row_id = 'what_item_White_Rice_k2';
      } else if((/Brown_Rice/.test(id))) {
        name_of_item = "Brown Rice (taco)";
        row_id = 'what_item_Brown_Rice_k2';
      } else if((/Black/.test(id)) && (/Taco/.test(id))) {
        name_of_item = "Black Beans (taco)";
        row_id = 'what_item_Black_Beans_Taco_k2';
      } else if(/Pinto/.test(id) && (/Taco/.test(id))) {
        name_of_item = "Pinto Beans (taco)";
        row_id = 'what_item_Pinto_Beans_Taco_k2';
      } else if(/Fajita/.test(id)) {
        name_of_item = "Fajita Vegetables ";
        row_id = 'what_item_Fajita_Vegetables_k2';
      } else if((/Fresh/.test(id)) && (/Tomato/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = "Fresh Tomato Salsa ";
        row_id = 'what_item_Fresh_Tomato_Salsa_k2';
      } else if(/Cheese/.test(id)) {
        name_of_item = "Cheese";
        row_id = 'what_item_Cheese_k2';
      } else if(/Sour/.test(id)) {
        name_of_item = "Sour Cream ";
        row_id = 'what_item_Sour_Cream_k2';
      } else if((/Green/.test(id)) && (/Chili/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = "Tomatillo-Green Chili Salsa";
        row_id = 'what_item_Green_Chili_Salsa_k2';
      } else if((/Red/.test(id)) && (/Chili/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = "Tomatillo-Red Chili Salsa";
        row_id = 'what_item_Red_Chili_Salsa_k2';
      } else if((/Romaine/.test(id)) && (/Lettuce/.test(id))) {
        name_of_item = "Romaine Lettuce (taco) ";
        row_id = 'what_item_Romaine_Lettuce_k2';
      } else if((/Chili/.test(id)) && (/Corn/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = "Roasted Chili-Corn Salsa ";
        row_id = 'what_item_Chili_Corn_Salsa_k2';
      } 
      add_data_to_table(name_of_item,row_id, data);
    } else if(this.checked && this.type == 'radio'){
      var name_of_item;
      var row_id;
      if(/Chicken/.test(id)){
        name_of_item = "Chicken ";
        row_id = 'kids_meat';
      } else if(/Veggies/.test(id)) {
        name_of_item = "Fajita Vegetables ";
        row_id = 'kids_meat';
      } else if(/Steak/.test(id)) {
        name_of_item = "Steak ";
        row_id = 'kids_meat';
      } else if(/Barbacoa/.test(id)) {
        name_of_item = "Barbacoa ";
        row_id = 'kids_meat';
      } else if(/Carnitas/.test(id)) {
        name_of_item = "Carnitas ";
        row_id = 'kids_meat';
      } else if((/White_Rice_Side/.test(id))) {
        name_of_item = "Cilantro-Lime Rice (side)";
        row_id = 'side_rice';
      } else if((/Brown_Rice_Side/.test(id))) {
        name_of_item = "Brown Rice (side)";
        row_id = 'side_rice';
      } else if((/Black/.test(id)) && (/Side/.test(id))) {
        name_of_item = "Black Beans (side)";
        row_id = 'side_beans';
      } else if(/Pinto/.test(id) && (/Side/.test(id))) {
        name_of_item = "Pinto Beans (side)";
        row_id = 'side_beans';
      } else if(/Guacamole/.test(id)) {
        name_of_item = "Guacamole ";
        row_id = 'kids_meat';
      } else if((/Crispy/.test(id))) {
        name_of_item = "Crispy Taco Shell ";
        row_id = 'side_taco';
      } else if((/Soft/.test(id)) && (/Tortilla/.test(id))) {
        name_of_item = "Soft Corn Tortilla";
        row_id = 'side_taco';
      }
      add_data_to_table(name_of_item, row_id, data);
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
  /*
   * WA: Use $('#nutri_table tr:last').find('td').html('foo')
   *
   */
  $('#nutri_table tr:last').find("td[id!='total']").html(0);
}

/*adding preselected items to table*/
function add_nutri_fresh() {
  // var clear_tab = $("#nutri_table").find("tr[id!='tab']");
  /* WA: REFACTOR */
  // for (var i=0; i<clear_tab.length; i++) {
  //  $(clear_tab[i]).remove();
  // }
  $.each($("#nutri_table").find("tr[id!='tab']"), function(i,ele){$(ele).remove();});
  var name_of_item = [], row_id = [], multiplier, selected_data, food_array;
  if(/kids/.test(this.name)){
    food_array = kids_menu_list;
    selected_data = $("#kids_menu_one").find("input:checked"); /* WA: There you are using :checked slector here. Why not anywhere else? */
  } else if(/adult/.test(this.name)) {
    food_array = adult_menu_list;
    selected_data = $("#adult_menu_one").find("input:checked");
  }
  if (selected_data[0].value == "SMALL QUESADILLA MEAL") {
    name_of_item =["Flour Tortilla (taco)","Cheese (small quesadilla)","Cilantro-Lime Rice (side)","Black Beans (side)","Chips "];
    row_id =['flour_taco','cheese_small','side_rice','side_beans','chips'];
    multiplier = 1;
  } else if (selected_data[0].value == "SINGLE TACO MEAL" || selected_data[0].value == "TWO TACO KIT") {
    name_of_item = ["Crispy Taco Shell ","Chicken ","Cilantro-Lime Rice (side)","Chips "];
    row_id =['side_taco','kids_meat','side_rice','chips'];
    if(selected_data[0].value == "TWO TACO KIT") {
      multiplier = 2;
    } else {
      multiplier = 1;
    }
  } else if (selected_data[0].value == "BURRITO") {
    name_of_item = ["Flour Tortilla (burrito)"];
    multiplier = 1;
    row_id = ['radio_item'];
  } else if (selected_data[0].value == "TACOS") {
    name_of_item = ["Crispy Taco Shell"];
    row_id = ['radio_item'];
    multiplier = 3;
  } else if (selected_data[0].value == "SALAD") {
    name_of_item = ["Romaine Lettuce (salad)"];
    row_id = ['radio_item'];
    multiplier = 1;
  }
  for(var j=0; j<food_array.length; j++) {
    for(var k=0; k<name_of_item.length; k++) {
      var new_row = $("<tr id="+row_id[k]+"></tr>");
      if(food_array[j][additional_data[0].array_nutrition[0]] == name_of_item[k] ) {
        new_cell1 = $("<td></td>")
        new_cell1.text(food_array[j][additional_data[0].array_nutrition[0]]);
        new_row.append(new_cell1);
        for(var k=1;k<16;k++){
          new_cell = $("<td></td>")
          new_cell.text(food_array[j][additional_data[0].array_nutrition[k]]*multiplier);
          new_row.append(new_cell);
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
    if($("input[name='kids_menu_item']")[2].checked == true && (name_of_item == 'Soft Corn Tortilla' || name_of_item == 'Crispy Taco Shell ')) {
      multiplier = 2;
    } else { multiplier = 1; }
    food_array = kids_menu_list;
  } else {
    food_array = adult_menu_list;
    if (name_of_item == "Crispy Taco Shell" || name_of_item == "Flour Tortilla (taco)" || name_of_item == "Soft Corn Tortilla"){
      multiplier = 3;
    } else {
      multiplier = 1;
    }
  }
      /* WA: REFACTOR */
  for(var j=0; j<food_array.length; j++) {
    var new_row = $("<tr id="+row_id+" onClick = 'remove_row(this)'></tr>");
    if(food_array[j][additional_data[0].array_nutrition[0]] == name_of_item ) {
      new_cell1 = $("<td></td>")
      new_cell1.text(food_array[j][additional_data[0].array_nutrition[0]]);
      if(/adult/.test(data) && (name_of_item == "Chicken" || name_of_item == "Steak" || name_of_item == "Carnitas" || name_of_item == "Barbacoa")){
        form_div = $("<div class=\"form_div\"><label>Servings</label><input type = \"text\" class = \"serve\" id=\"serve_"+name_of_item+"\" value = \"1\"><span class = \"add\" onClick = \"add_servings(event, this.id);\" id=\"add_"+name_of_item+"\">+</span><span class = \"del\" onClick = \"del_servings(event, this.id);\" id=\"del_"+name_of_item+"\">-</span>")
        new_cell1.append(form_div);
      }
      new_row.append(new_cell1);
      for(var k=1;k<16;k++){
        new_cell = $("<td></td>")
        new_cell.text(food_array[j][additional_data[0].array_nutrition[k]]*multiplier);
        new_row.append(new_cell);
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
  var vals =["TOTAL",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(var i=2; i<17; i++) {
    var sum = 0;
    $("#nutri_table").find("tr[id!='tab']").children("td:nth-child("+i+")").each(function(){
    sum += parseFloat($(this).html());
    });
    vals[i] = sum;
  }
  for(var i=2; i<17; i++) {
    $('#nutri_table tr:last').children("td:nth-child("+i+")").html(vals[i]);
  }
}

//function to add servings.
function add_servings(event, item_id) {
  event.stopPropagation();
  var id_code = item_id.split(/\_/g);    //stores chicken,steak etc.
  if($("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val() == 1){
    $("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val(2);
    var table_val = $("#nutri_table").find("tr[id ='item_"+id_code[1]+"1']").find("td");
    for(var i=1; i<table_val.length; i++) {
      var val = parseFloat($(table_val[i]).html());
      $(table_val[i]).html(val*2);
    }
    addition_of_nutrition();
  }
}

//function to delete servings.
function del_servings(event, item_id) {
 event.stopPropagation();
 var id_code = item_id.split(/\_/g);    //stores chicken,steak etc.
 if($("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val() == 2){
   $("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val(1);
   var table_val = $("#nutri_table").find("tr[id ='item_"+id_code[1]+"1']").find("td");
   for(var i=1; i<table_val.length; i++) {
     var val = parseFloat($(table_val[i]).html());
     $(table_val[i]).html(val*0.5);
   }
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
