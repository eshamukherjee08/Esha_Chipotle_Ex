/*Global variable to store json data.*/

var adult_menu_list = [], kids_menu_list = [], additional_data = [];

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

$(document).ready(function(){
  for(var k=0;k<16;k++){$(".t_header").append("<td>"+additional_data[0].array_nutrition[k]+"</td>");}
  for(var k=0;k<15;k++){$(".t_add").append("<td>0</td>");}
});


/*Showing Respective menu item*/
$("#adult_menu, #kids_menu").bind('click', show_menu);
function show_menu() {
  var options_a = $("#adult_menu_one").find("input");
  var options_k = $("#kids_menu_one").find("input");
  // $.each(options_a, function(i,ele){$(ele).checked = false;});
  // $.each(options_k, function(i,ele){$(ele).checked = false;});
  for (var i=0; i<options_a.length; i++) {options_a[i].checked = false;}
  for (var i=0; i<options_k.length; i++) {options_k[i].checked = false;}
  if (this.id == "adult_menu") {
    $(additional_data[3].kids_menu_show[0]).removeClass("active");
  } else if(this.id == "kids_menu"){
    $(additional_data[1].adult_menu_show[0]).removeClass("active");
  }
  change_visible_menu(this.id);
  clear_tab_on_change();
  clear_added_values();
}


/*Toggling between display of kids or adult menu items on respective selection.*/
function change_visible_menu(menu_id) {
  if (menu_id == "adult_menu") {
    $(additional_data[1].adult_menu_show[0]).removeClass("hide");
    $(additional_data[3].kids_menu_show[0]).addClass("hide");
  } else if (menu_id == "kids_menu") {
    $(additional_data[3].kids_menu_show[0]).removeClass("hide");
    $(additional_data[1].adult_menu_show[0]).addClass("hide");
  }
  $.each(additional_data[2].menu_hide, function(i,ele){$(ele).addClass("hide");});
}

/*Binding functions to input elements*/
$("input[name='adult_menu_item'], input[name='kids_menu_item']").live('click', show_options).live('click', pre_select_options).live('click', clear_added_values).live('click', add_nutri_fresh);

/*Displaying list of items in a particular selected menu.*/
function show_options() {
  if (this.name == "adult_menu_item") {
    $(additional_data[2].menu_hide[0]).addClass("hide");
    $(additional_data[2].menu_hide[1]).addClass("hide");
    $(additional_data[2].menu_hide[3]).removeClass("hide");
    $(additional_data[2].menu_hide[4]).removeClass("hide");
    var adult = document.getElementsByName("adult_menu_item");
    for(var i=0; i<adult.length; i++) {
      if (adult[i].checked == true) {
        if (adult[i].value == "BURRITO") {
          clear_selections();
          $.each(additional_data[4].BURRITO[0].show_data, function(i,ele){$(ele).removeClass("hide");});
          $.each(additional_data[4].BURRITO[1].hide_data, function(i,ele){$(ele).addClass("hide");});
        } else if (adult[i].value == "BURRITO BOWL") {
            clear_selections();
            $.each(additional_data[5].BURRITO_BOWL[0].show_data, function(i,ele){$(ele).removeClass("hide");});
            $.each(additional_data[5].BURRITO_BOWL[1].hide_data, function(i,ele){$(ele).addClass("hide");});
        } else if (adult[i].value == "TACOS") {
            clear_selections();
            $.each(additional_data[6].TACOS[0].show_data, function(i,ele){$(ele).removeClass("hide");});
            $.each(additional_data[6].TACOS[1].hide_data, function(i,ele){$(ele).addClass("hide");});
        } else if (adult[i].value == "SALAD") {
           clear_selections();
           $.each(additional_data[7].SALAD[0].show_data, function(i,ele){$(ele).removeClass("hide");});
           $.each(additional_data[7].SALAD[1].hide_data, function(i,ele){$(ele).addClass("hide");});
        }
      }
    }
  } else if (this.name == "kids_menu_item") {
    var kid = document.getElementsByName("kids_menu_item");
    $(additional_data[2].menu_hide[0]).removeClass("hide");
    $(additional_data[2].menu_hide[1]).removeClass("hide");
    $(additional_data[2].menu_hide[3]).addClass("hide");
    $(additional_data[2].menu_hide[4]).addClass("hide");
    for(var i=0; i<kid.length; i++) {
      if (kid[i].checked == true) {
        if (kid[i].value == "SMALL QUESADILLA MEAL") {
          clear_selections_kid_block();
          $.each(additional_data[8].SMALL_QUESADILLA_MEAL[0].show_data, function(i,ele){$(ele).removeClass("hide");});
          $.each(additional_data[8].SMALL_QUESADILLA_MEAL[1].hide_data, function(i,ele){$(ele).addClass("hide");});
        } else if (kid[i].value == "SINGLE TACO MEAL") {
           clear_selections_kid_block();
           clear_selections();
           $.each(additional_data[9].SINGLE_TACO_MEAL[0].show_data, function(i,ele){$(ele).removeClass("hide");});
           $.each(additional_data[9].SINGLE_TACO_MEAL[1].hide_data, function(i,ele){$(ele).addClass("hide");});
        } else if (kid[i].value == "TWO TACO KIT") {
           clear_selections_kid_block();
           clear_selections();
           $.each(additional_data[10].TWO_TACO_KIT[0].show_data, function(i,ele){$(ele).removeClass("hide");});
           $.each(additional_data[10].TWO_TACO_KIT[1].hide_data, function(i,ele){$(ele).addClass("hide");});
        } 
      }
    }
  }
}

/*clearing pre selected items in case of change of choice of item.*/
$("input[name='kids_meat']").live('click', clear_selected_options);
function clear_selected_options(){
  var options = $("#what_inside").find("input");
  for (var i=0; i<options.length; i++) {
  	options[i].checked = false;
  }
  $("#nutri_table").find("tr[id ^='what_item']").remove();
  addition_of_nutrition();
}

/*Checking condition of item selection of 2(in case of meat) or 3 (in case of veggie) for kids menu.*/
$("#what_inside").delegate("input", 'click', check_selected_options);

function check_selected_options() {
  var radio_selected = $("input[name='kids_meat']");
  var a = $("#what_inside").find("input");
  for(var i=0; i<radio_selected.length; i++) {
    if(radio_selected[i].checked == true && radio_selected[i].id == "item_Veggies_k") {
      count = 0;
      for (var i=0; i<a.length; i++) {
      	if(a[i].checked) {
  				count++;
  			}
  		  if(count > 3) {
  			  alert("Please select a maximum of 3 fillings!");
  			  this.checked = false;
  		    return;
  			}
      }
    } else if(radio_selected[i].checked == true && radio_selected[i].id != "item_Veggies_k") {
      count = 0;
      for (var i=0; i<a.length; i++) {
      	if(a[i].checked) {
  	  		count++;
  			}
  			if(count > 2) {
  			  alert("Please select a maximum of 2 fillings!");
  			  this.checked = false;
  		    return;
  			}
      }
    }
  }
}

/*clearing various selections on change.*/
function clear_selections() {
  var checked_inputs = $("input[type='checkbox']");
  for(var i=0; i<checked_inputs.length; i++) {
    checked_inputs[i].checked = false;
  }
  var checked_radio_3 = $("input[name='tacos_3']");
  for(var i=0; i<checked_radio_3.length; i++) {
    checked_radio_3[i].checked = false;
  }
}

function clear_selections_kid_block() {
  var checked_inputs = $("input[name='kids_meat'], input[name='side_one'], input[name='side_two'], input[name='tacos_1'], input[name='tacos_2'], input[name='side_rice']");
  for(var i=0; i<checked_inputs.length; i++) {
    checked_inputs[i].checked = false;
  }
}

/*binding function on click to add menu items.*/

$("#adult_menu_options, #adult_regular_menu").delegate("input", 'click', add_nutri_adult);
$("#kids_regular_menu, #kids_third_menu, #kids_menu_options").delegate("input", 'click', add_nutri_kids);

/*marking pre selected options as checked.*/
function pre_select_options() {
  $("input[name='soft_flour_tortilla_selected'], input[name='romanian_lettuce_selected']")[0].checked = true;
  $("input[name='flour_tortilla_k0_selected']")[0].checked = true;
  $("input[name='tacos_3']")[0].checked = true;
  $("input[name='tacos_1']")[0].checked = true;
  $("input[name='kids_meat_cheese']")[0].checked = true;
  $("input[name='tacos_2']")[0].checked = true;
  if($("input[name='kids_menu_item']")[0].checked){
   $("input[name='kids_meat']")[0].checked = true; 
  } else {
   $("input[name='kids_meat']")[1].checked = true;  
  }
  $("input[name='side_one']")[0].checked = true;
  $("input[name='side_two']")[0].checked = true;
  $("input[name='side_rice']")[0].checked = true;
}

/*adding items for adult menu*/
function add_nutri_adult() {
  var id = this.id;
  var data = "adult";
  if(this.checked && this.type == 'checkbox'){
    var name_of_item;
    var row_id;
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
function add_nutri_kids() {
    var id = this.id;
    var data = "kids";
    if(this.checked && this.type == 'checkbox'){
      var name_of_item;
      var row_id;
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
  var clear_tab = $("#nutri_table").find("tr[id!='tab']");
  for (var i=0; i<clear_tab.length; i++) {
  	$(clear_tab[i]).remove();
  }
}

/*clearing calculated values of nutrition table.*/
function clear_added_values() {
  var total_row = $('#nutri_table tr:last');
  for (var j=2; j<17; j++) {
    total_row.children("td:nth-child("+j+")").each(function(){
      ($(this).html(0));
    });
  }
}

/*adding preselected items to table*/
function add_nutri_fresh() {
  var clear_tab = $("#nutri_table").find("tr[id!='tab']");
  for (var i=0; i<clear_tab.length; i++) {
  	$(clear_tab[i]).remove();
  }
  var name_of_item = [], row_id = [], multiplier, selected_data, food_array;
  if(/kids/.test(this.name)){
    food_array = kids_menu_list;
    selected_data = $("#kids_menu_one").find("input:checked");
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
  $("#nutri_table").find("tr[id="+element_id+"]").remove();
  addition_of_nutrition();
}

/*Addition of nutrition value.*/
function addition_of_nutrition() {
  var total_row = $('#nutri_table tr:last');
  var vals =["TOTAL",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var all_rows = $("#nutri_table").find("tr[id!='tab']");
  for(var i=2; i<17; i++) {
    var sum = 0;
    all_rows.children("td:nth-child("+i+")").each(function(){
    sum += parseFloat($(this).html());
    });
    vals[i] = sum;
  }
  for(var i=2; i<17; i++) {
    total_row.children("td:nth-child("+i+")").html(vals[i]);
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
