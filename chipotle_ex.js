/*Global variable to store json data.*/

var adult_menu_list = [];
var kids_menu_list = [];


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


/*Showing Respective menu item*/
$("#adult_menu").bind('click', show_menu);
$("#kids_menu").bind('click', show_menu);

function show_menu() {
 if (this.id == "adult_menu") {
   $("#kids_menu_one").removeClass("active");
 } else if(this.id == "kids_menu"){
   $("#adult_menu_one").removeClass("active")
 }
 change_visible_menu(this.id);
 clear_tab_on_change();
 clear_added_values();
}


function change_visible_menu(menu_id) {
  if (menu_id == "adult_menu") {
    $("#kids_menu_one").addClass("hide");
    $("#adult_menu_one").removeClass("hide");
    $("#kids_menu_options").addClass("hide");
    $("#kids_regular_menu").addClass("hide");
    $("#kids_third_menu").addClass("hide");
    $("#adult_menu_options").addClass("hide");
    $("#adult_regular_menu").addClass("hide");
    
  } else if (menu_id == "kids_menu") {
    $("#adult_menu_one").addClass("hide");
    $("#kids_menu_one").removeClass("hide");
    $("#kids_menu_options").addClass("hide");
    $("#kids_third_menu").addClass("hide");
    $("#kids_regular_menu").addClass("hide");
    $("#adult_menu_options").addClass("hide");
    $("#adult_regular_menu").addClass("hide");
  }
}

var adult_menu_item = $("input[name='adult_menu_item']");
for(var i=0; i<adult_menu_item.length; i++) {
  $(adult_menu_item[i]).bind('click', show_options);
  $(adult_menu_item[i]).bind('click', pre_select_options);
  $(adult_menu_item[i]).bind('click', clear_added_values);
  $(adult_menu_item[i]).bind('click', add_nutri_fresh_adult);
}

var kids_menu_item = $("input[name='kids_menu_item']");
for(var i=0; i<kids_menu_item.length; i++) {
  $(kids_menu_item[i]).bind('click', show_options);
  $(kids_menu_item[i]).bind('click', pre_select_options);
  $(kids_menu_item[i]).bind('click', clear_added_values);
  $(kids_menu_item[i]).bind('click', add_nutri_fresh_kids);
}

function show_options() {
  if (this.name == "adult_menu_item") {
    $("#adult_menu_options").removeClass("hide");
    $("#adult_regular_menu").removeClass("hide");
    $("#kids_menu_options").addClass("hide");
    $("#kids_regular_menu").addClass("hide");
    var adult = document.getElementsByName("adult_menu_item");
    for(var i=0; i<adult.length; i++) {
      if (adult[i].checked == true) {
        if (adult[i].value == "BURRITO") {
          clear_selections();
          $("#tortilla").removeClass("hide");
          $("#lettuce").addClass("hide");
          $("#for_burrito").removeClass("hide");
          $("#for_burrito_bowl").addClass("hide");
          $("#for_3tacos").addClass("hide");
          $("#for_salad_bowl").addClass("hide");
        } else if (adult[i].value == "BURRITO BOWL") {
            clear_selections();
            $("#tortilla").removeClass("hide");
            $("#lettuce").addClass("hide");
            $("#for_burrito").addClass("hide");
            $("#for_burrito_bowl").removeClass("hide");
            $("#for_3tacos").addClass("hide");
            $("#for_salad_bowl").addClass("hide");
        } else if (adult[i].value == "TACOS") {
            clear_selections();
            $("#tortilla").removeClass("hide");
            $("#lettuce").addClass("hide");
            $("#for_burrito").addClass("hide");
            $("#for_burrito_bowl").addClass("hide");
            $("#for_3tacos").removeClass("hide");
            $("#for_salad_bowl").addClass("hide");
        } else if (adult[i].value == "SALAD") {
           clear_selections();
           $("#lettuce").removeClass("hide");
           $("#tortilla").addClass("hide");
           $("#for_burrito").addClass("hide");
           $("#for_burrito_bowl").addClass("hide");
           $("#for_3tacos").addClass("hide");
           $("#for_salad_bowl").removeClass("hide");
        }
      }
    }
  } else if (this.name == "kids_menu_item") {
    var kid = document.getElementsByName("kids_menu_item");
    $("#kids_menu_options").removeClass("hide");
    $("#kids_regular_menu").removeClass("hide");
    $("#adult_menu_options").addClass("hide");
    $("#adult_regular_menu").addClass("hide");
    for(var i=0; i<kid.length; i++) {
      if (kid[i].checked == true) {
        if (kid[i].value == "SMALL QUESADILLA MEAL") {
          clear_selections_kid_block();
          $("#kids_side_one_title").removeClass("hide");
          $("#kids_side_two_title").removeClass("hide");
          $("#kids_whats_inside").addClass("hide");
          $("#kids_third_menu").addClass("hide");
          $("#for_small_quesadilla").removeClass("hide");
          $("#for_1tacos").addClass("hide");
          $("#for_2tacos").addClass("hide");
          $("#kids_meat_veggies").addClass("hide");
          $("#kids_meat_cheese").removeClass("hide");
          $("#what_inside").addClass("hide");
          $("#side_one").removeClass("hide");
          $("#side_two").removeClass("hide");
        } else if (kid[i].value == "SINGLE TACO MEAL") {
             clear_selections_kid_block();
             clear_selections();
             $("#kids_side_one_title").addClass("hide");
             $("#kids_side_two_title").addClass("hide");
             $("#kids_whats_inside").removeClass("hide");
             $("#kids_third_menu").removeClass("hide");
             $("#for_small_quesadilla").addClass("hide");
             $("#for_1tacos").removeClass("hide");
             $("#for_2tacos").addClass("hide");
             $("#kids_meat_veggies").removeClass("hide");
             $("#kids_meat_cheese").addClass("hide");
             $("#what_inside").removeClass("hide");
             $("#side_one").addClass("hide");
             $("#side_two").addClass("hide");
        } else if (kid[i].value == "TWO TACO KIT") {
            clear_selections_kid_block();
            clear_selections();
            $("#kids_side_one_title").addClass("hide");
            $("#kids_side_two_title").addClass("hide");
            $("#kids_whats_inside").removeClass("hide");
            $("#kids_third_menu").removeClass("hide");
            $("#for_small_quesadilla").addClass("hide");
            $("#for_1tacos").addClass("hide");
            $("#for_2tacos").removeClass("hide");
            $("#kids_meat_veggies").removeClass("hide");
            $("#kids_meat_cheese").addClass("hide");
            $("#what_inside").removeClass("hide");
            $("#side_one").addClass("hide");
            $("#side_two").addClass("hide");
        } 
      }
    }
  }
}

var radio_block2 = $("input[name='kids_meat']");
for (var i=0; i<radio_block2.length; i++) {
	$(radio_block2[i]).bind('click', clear_selected_options);
}

function clear_selected_options(){
  var options = $("#what_inside").find("input");
  for (var i=0; i<options.length; i++) {
  	options[i].checked = false;
  }
}


var a = $("#what_inside").find("input");
for (var i=0; i<a.length; i++) {
	$(a[i]).bind('click', check_selected_options);
}

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
  var checked_inputs = $("input[name='kids_meat']");
  for(var i=0; i<checked_inputs.length; i++) {
    checked_inputs[i].checked = false;
  }
  var checked_inputs_1 = $("input[name='side_one']");
  for(var i=0; i<checked_inputs_1.length; i++) {
    checked_inputs_1[i].checked = false;
  }
  var checked_inputs_2 = $("input[name='side_two']");
  for(var i=0; i<checked_inputs_2.length; i++) {
    checked_inputs_2[i].checked = false;
  }
  var checked_radio = $("input[name='tacos_1']");
  for(var i=0; i<checked_radio.length; i++) {
    checked_radio[i].checked = false;
  }
  var checked_radio_2 = $("input[name='tacos_2']");
  for(var i=0; i<checked_radio_2.length; i++) {
    checked_radio_2[i].checked = false;
  }
  var checked_radio_side = $("input[name='side_rice']");
  for(var i=0; i<checked_radio_side.length; i++) {
    checked_radio_side[i].checked = false;
  }
}


var adult_menu_options = $("#adult_menu_options").find("input");
for (var i=0; i<adult_menu_options.length; i++) {
  $(adult_menu_options[i]).bind('click', add_nutri_adult);
}
var adult_regular_menu = $("#adult_regular_menu").find("input");
for (var i=0; i<adult_regular_menu.length; i++) {
  $(adult_regular_menu[i]).bind('click', add_nutri_adult);
}
var kids_regular_menu = $("#kids_regular_menu").find("input");
for (var i=0; i<kids_regular_menu.length; i++) {
  $(kids_regular_menu[i]).bind('click', add_nutri_kids);
}
var kids_third_menu = $("#kids_third_menu").find("input");
for (var i=0; i<kids_third_menu.length; i++) {
  $(kids_third_menu[i]).bind('click', add_nutri_kids);
}
var kids_menu_options = $("#kids_menu_options").find("input");
for (var i=0; i<kids_menu_options.length; i++) {
  $(kids_menu_options[i]).bind('click', add_nutri_kids);
}


function pre_select_options() {
  var radio_select_soft_flour_tortilla = $("input[name='soft_flour_tortilla_selected']");
  radio_select_soft_flour_tortilla[0].checked = true;
  var radio_select_tacos_3 = $("input[name='tacos_3']");
  radio_select_tacos_3[0].checked = true;
  var radio_select_romanian_lettuce = $("input[name='romanian_lettuce_selected']");
  radio_select_romanian_lettuce[0].checked = true;
  var radio_select_flour_tortilla_k0 = $("input[name='flour_tortilla_k0_selected']");
  radio_select_flour_tortilla_k0[0].checked = true;
  var radio_select_tacos_1 = $("input[name='tacos_1']");
  radio_select_tacos_1[0].checked = true;
  var radio_select_tacos_2 = $("input[name='tacos_2']");
  radio_select_tacos_2[0].checked = true;
  var radio_select_kids_meat = $("input[name='kids_meat']");
  radio_select_kids_meat[0].checked = true;
  var radio_select_kids_meat_cheese = $("input[name='kids_meat_cheese']");
  radio_select_kids_meat_cheese[0].checked = true;
  var radio_select_side_one = $("input[name='side_one']");
  radio_select_side_one[0].checked = true;
  var radio_select_side_two = $("input[name='side_two']");
  radio_select_side_two[0].checked = true;
  var radio_select_side_rice = $("input[name='side_rice']");
  radio_select_side_rice[0].checked = true;
}

function add_nutri_adult() {
  var id = this.id;
  if(this.checked && this.type == 'checkbox'){
    var name_of_item = [];
    var row_id;
    if(/Chicken/.test(id)){
      name_of_item = ["Chicken"];
      row_id = 'item_Chicken1';
    } else if(/Vinaigrette/.test(id)) {
      name_of_item = ["Vinaigrette"];
      row_id = 'item_Vinaigrette1';
    } else if(/Chips_1/.test(id)) {
      name_of_item = ["Chips"];
      row_id = 'item_Chips_1';
    } else if(/Steak/.test(id)) {
      name_of_item = ["Steak"];
      row_id = 'item_Steak1';
    } else if(/Barbacoa/.test(id)) {
      name_of_item = ["Barbacoa"];
      row_id = 'item_Barbacoa1';
    } else if(/Carnitas/.test(id)) {
      name_of_item = ["Carnitas"];
      row_id = 'item_Carnitas1';
    } else if(/Rice/.test(id)) {
      name_of_item = ["Cilantro-Lime Rice"];
      row_id = 'item_Rice1';
    } else if(/Black/.test(id)) {
      name_of_item = ["Black Beans"];
      row_id = 'item_Black_Beans1';
    } else if(/Pinto/.test(id)) {
      name_of_item = ["Pinto Beans"];
      row_id = 'item_Pinto_Beans1';
    } else if(/Fajita/.test(id)) {
      name_of_item = ["Fajita Vegetables"];
      row_id = 'item_Fajita_Vegetables1';
    } else if((/Fresh/.test(id)) && (/Tomato/.test(id)) && (/Salsa/.test(id))) {
      name_of_item = ["Fresh Tomato Salsa "];
      row_id = 'item_Fresh_Tomato_Salsa1';
    } else if(/Cheese/.test(id)) {
      name_of_item = ["Cheese"];
      row_id = 'item_Cheese1';
    } else if(/Sour/.test(id)) {
      name_of_item = ["Sour Cream"];
      row_id = 'item_Sour_Cream1';
    } else if((/Green_Chili_Salsa/.test(id))) {
      name_of_item = ["Tomatillo-Green Chili Salsa"];
      row_id = 'item_Green_Chili_Salsa_1';
    } else if((/Red_Chili_Salsa/.test(id))) {
      name_of_item = ["Tomatillo-Red Chili Salsa"];
      row_id = 'item_Red_Chili_Salsa_1';
    } else if((/Romaine/.test(id)) && (/Lettuce/.test(id))) {
      name_of_item = ["Romaine Lettuce (tacos)"];
      row_id = 'item_Romaine_Lettuce1';
    } else if(/Guacamole_1/.test(id)) {
      name_of_item = ["Guacamole"];
      row_id = 'item_Guacamole_1';
    } else if((/Chili/.test(id)) && (/Corn/.test(id)) && (/Salsa/.test(id))) {
      name_of_item = ["Roasted Chili-Corn Salsa "];
      row_id = 'item_Chili_Corn_Salsa1';
    } else if((/Chips_And_Guacamole/.test(id))) {
      name_of_item = ["Chips","Guacamole"];
      row_id = 'item_Chips_And_Guacamole';
    } else if((/Chips_Chili_Salsa_Green/.test(id))) {
      name_of_item = ["Chips","Tomatillo-Green Chili Salsa"];
      row_id = 'item_Chips_Chili_Salsa_Green_1';
    } else if((/Chips_Chili_Salsa_Red/.test(id))) {
      name_of_item = ["Chips","Tomatillo-Red Chili Salsa"];
      row_id = 'item_Chips_Chili_Salsa_Red_1';
    } else if((/Chips_Tomato_Salsa/.test(id))) {
      name_of_item = ["Chips","Fresh Tomato Salsa "];
      row_id = 'item_Chips_Tomato_Salsa_1';
    } else if((/Chips/.test(id)) && (/Corn/.test(id)) && (/Salsa/.test(id))) {
      name_of_item = ["Chips","Roasted Chili-Corn Salsa "];
      row_id = 'item_Chips_Corn_Salsa1';
    }
    add_data_to_adult_table(name_of_item, row_id);
  } else if(this.checked && this.type == 'radio'){
    var name_of_item = [];
    var row_id ="radio_item";
    remove_item(row_id);
    if((/Romaine/.test(id)) && (/Lettuce/.test(id)) && (/Salad/.test(id))) {
      name_of_item = ["Romaine Lettuce (salad)"];
    } else if((/Crispy/.test(id)) && (/Corn/.test(id)) && (/Tortilla/.test(id))) {
      name_of_item = ["Crispy Taco Shell"];
    } else if((/Soft/.test(id)) && (/Flour/.test(id)) && (/Tortilla/.test(id))) {
      name_of_item = ["Flour Tortilla (burrito)"];
    } else if((/Soft/.test(id)) && (/Corn/.test(id)) && (/Tortilla/.test(id))) {
      name_of_item = ["Soft Corn Tortilla"];
    } else if((/Soft/.test(id)) && (/Taco/.test(id)) && (/Tortilla/.test(id))) {
      name_of_item = ["Flour Tortilla (taco)"];
    }
    add_data_to_adult_table(name_of_item, row_id);
  }else {
    remove_item(this.id);
  }
}

function add_nutri_kids() {
    var id = this.id;
    if(this.checked && this.type == 'checkbox'){
      var name_of_item = [];
      var row_id;
      if(/White_Rice/.test(id)){
        name_of_item = ["Cilantro-Lime Rice (taco)"];
        row_id = 'what_item_White_Rice_k2';
      } else if((/Brown_Rice/.test(id))) {
        name_of_item = ["Brown Rice (taco)"];
        row_id = 'what_item_Brown_Rice_k2';
      } else if((/Black/.test(id)) && (/Taco/.test(id))) {
        name_of_item = ["Black Beans (taco)"];
        row_id = 'what_item_Black_Beans_Taco_k2';
      } else if(/Pinto/.test(id) && (/Taco/.test(id))) {
        name_of_item = ["Pinto Beans (taco)"];
        row_id = 'what_item_Pinto_Beans_Taco_k2';
      } else if(/Fajita/.test(id)) {
        name_of_item = ["Fajita Vegetables "];
        row_id = 'what_item_Fajita_Vegetables_k2';
      } else if((/Fresh/.test(id)) && (/Tomato/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = ["Fresh Tomato Salsa "];
        row_id = 'what_item_Fresh_Tomato_Salsa_k2';
      } else if(/Cheese/.test(id)) {
        name_of_item = ["Cheese"];
        row_id = 'what_item_Cheese_k2';
      } else if(/Sour/.test(id)) {
        name_of_item = ["Sour Cream "];
        row_id = 'what_item_Sour_Cream_k2';
      } else if((/Green/.test(id)) && (/Chili/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = ["Tomatillo-Green Chili Salsa"];
        row_id = 'what_item_Green_Chili_Salsa_k2';
      } else if((/Red/.test(id)) && (/Chili/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = ["Tomatillo-Red Chili Salsa"];
        row_id = 'what_item_Red_Chili_Salsa_k2';
      } else if((/Romaine/.test(id)) && (/Lettuce/.test(id))) {
        name_of_item = ["Romaine Lettuce (taco) "];
        row_id = 'what_item_Romaine_Lettuce_k2';
      } else if((/Chili/.test(id)) && (/Corn/.test(id)) && (/Salsa/.test(id))) {
        name_of_item = ["Roasted Chili-Corn Salsa "];
        row_id = 'what_item_Chili_Corn_Salsa_k2';
      } 
      add_data_to_table(name_of_item,row_id);
    } else if(this.checked && this.type == 'radio'){
      var name_of_item = [];
      var row_id;
      if(/Chicken/.test(id)){
        name_of_item = ["Chicken "];
        row_id = 'kids_meat';
      } else if(/Veggies/.test(id)) {
        name_of_item = ["Fajita Vegetables "];
        row_id = 'kids_meat';
      } else if(/Steak/.test(id)) {
        name_of_item = ["Steak "];
        row_id = 'kids_meat';
      } else if(/Barbacoa/.test(id)) {
        name_of_item = ["Barbacoa "];
        row_id = 'kids_meat';
      } else if(/Carnitas/.test(id)) {
        name_of_item = ["Carnitas "];
        row_id = 'kids_meat';
      } else if((/White_Rice_Side/.test(id))) {
        name_of_item = ["Cilantro-Lime Rice (side)"];
        row_id = 'side_rice';
      } else if((/Brown_Rice_Side/.test(id))) {
        name_of_item = ["Brown Rice (side)"];
        row_id = 'side_rice';
      } else if((/Black/.test(id)) && (/Side/.test(id))) {
        name_of_item = ["Black Beans (side)"];
        row_id = 'side_beans';
      } else if(/Pinto/.test(id) && (/Side/.test(id))) {
        name_of_item = ["Pinto Beans (side)"];
        row_id = 'side_beans';
      } else if(/Guacamole/.test(id)) {
        name_of_item = ["Guacamole "];
        row_id = 'kids_meat';
      } else if((/Crispy/.test(id))) {
        name_of_item = ["Crispy Taco Shell "];
        row_id = 'side_taco';
      } else if((/Soft/.test(id)) && (/Tortilla/.test(id))) {
        name_of_item = ["Soft Corn Tortilla"];
        row_id = 'side_taco';
      } 
      remove_item(row_id);
      add_data_to_table(name_of_item, row_id);
    } else {
      remove_item(this.id);
    }
}

function clear_tab_on_change() {
  var clear_tab = $("#nutri_table").find("tr[id!='tab']");
  for (var i=0; i<clear_tab.length; i++) {
  	$(clear_tab[i]).remove();
  }
}

function clear_added_values() {
  var total_row = $('#nutri_table tr:last');
  for (var j=2; j<17; j++) {
    total_row.children("td:nth-child("+j+")").each(function(){
      ($(this).html(0));
    });
  }
}

function add_nutri_fresh_adult() {
  var clear_tab = $("#nutri_table").find("tr[id!='tab']");
  for (var i=0; i<clear_tab.length; i++) {
  	$(clear_tab[i]).remove();
  }
  var name_of_item;
  var new_row = $("<tr id='radio_item'></tr>");
  var checked_data = $("#adult_menu_options").find("input:checked").length;
  var selected_data = $("#adult_menu_one").find("input:checked");
  if (selected_data[0].value == "BURRITO") {
    name_of_item = "Flour Tortilla (burrito)";
  } else if (selected_data[0].value == "TACOS") {
    name_of_item = "Crispy Taco Shell";
  } else if (selected_data[0].value == "SALAD") {
    name_of_item = "Romaine Lettuce (salad)";
  }
  
  for(var j=0; j<23; j++) {
    if(adult_menu_list[j]["Menu_item"] == name_of_item) {
      new_cell1 = $("<td></td>")
      new_cell1.text(adult_menu_list[j]["Menu_item"]);
      new_row.append(new_cell1);
      new_cell2 = $("<td></td>")
      new_cell2.text(adult_menu_list[j]["Calories"]);
      new_row.append(new_cell2);
      new_cell3 = $("<td></td>")
      new_cell3.text(adult_menu_list[j]["Cal From Fat"]);
      new_row.append(new_cell3);
      new_cell4 = $("<td></td>")
      new_cell4.text(adult_menu_list[j]["Total Fat (g)"]);
      new_row.append(new_cell4);
      new_cell5 = $("<td></td>")
      new_cell5.text(adult_menu_list[j]["Sat Fat (g)"]);
      new_row.append(new_cell5);
      new_cell6 = $("<td></td>")
      new_cell6.text(adult_menu_list[j]["Trans Fat (g)"]);
      new_row.append(new_cell6);
      new_cell7 = $("<td></td>")
      new_cell7.text(adult_menu_list[j]["Cholesterol (mg)"]);
      new_row.append(new_cell7);
      new_cell8 = $("<td></td>")
      new_cell8.text(adult_menu_list[j]["Sodium (mg)"]);
      new_row.append(new_cell8);
      new_cell9 = $("<td></td>")
      new_cell9.text(adult_menu_list[j]["Carbohydrates (g)"]);
      new_row.append(new_cell9);
      new_cell10 = $("<td></td>")
      new_cell10.text(adult_menu_list[j]["Dietary Fiber (g)"]);
      new_row.append(new_cell10);
      new_cell11 = $("<td></td>")
      new_cell11.text(adult_menu_list[j]["Sugars (g)"]);
      new_row.append(new_cell11);
      new_cell12 = $("<td></td>")
      new_cell12.text(adult_menu_list[j]["Protein (g)"]);
      new_row.append(new_cell12);
      new_cell13 = $("<td></td>")
      new_cell13.text(adult_menu_list[j]["Vitamin A"]);
      new_row.append(new_cell13);
      new_cell14 = $("<td></td>")
      new_cell14.text(adult_menu_list[j]["Vitamin C"]);
      new_row.append(new_cell14);
      new_cell15 = $("<td></td>")
      new_cell15.text(adult_menu_list[j]["Calcium"]);
      new_row.append(new_cell15);
      new_cell16 = $("<td></td>")
      new_cell16.text(adult_menu_list[j]["Iron"]);
      new_row.append(new_cell16);
      $('#nutri_table tr:last').before(new_row);
      addition_of_nutrition();
      break;
    }
  }
}

function add_nutri_fresh_kids() {
  var clear_tab = $("#nutri_table").find("tr[id!='tab']");
  for (var i=0; i<clear_tab.length; i++) {
  	$(clear_tab[i]).remove();
  }
  var name_of_item = [];
  var row_id = [];
  var checked_data = $("#kids_menu_options").find("input:checked").length;
  var selected_data = $("#kids_menu_one").find("input:checked");
  if (selected_data[0].value == "SMALL QUESADILLA MEAL") {
    name_of_item =["Flour Tortilla (taco)","Chicken ","Cheese (small quesadilla)","Cilantro-Lime Rice (side)","Black Beans (side)","Chips "];
    row_id =['flour_taco','kids_meat','cheese_small','side_rice','side_beans','chips'];
  } else if (selected_data[0].value == "SINGLE TACO MEAL" || selected_data[0].value == "TWO TACO KIT") {
    name_of_item = ["Crispy Taco Shell ","Chicken ","Cilantro-Lime Rice (side)","Chips "];
    row_id =['side_taco','kids_meat','side_rice','chips'];
  } 
  
  for(var j=0; j<26; j++) {
    for(var k=0; k<name_of_item.length; k++) {
      var new_row = $("<tr id="+row_id[k]+"></tr>");
      if(kids_menu_list[j]["Menu_item"] == name_of_item[k] ) {
        new_cell1 = $("<td></td>")
        new_cell1.text(kids_menu_list[j]["Menu_item"]);
        new_row.append(new_cell1);
        new_cell2 = $("<td></td>")
        new_cell2.text(kids_menu_list[j]["Calories"]);
        new_row.append(new_cell2);
        new_cell3 = $("<td></td>")
        new_cell3.text(kids_menu_list[j]["Cal From Fat"]);
        new_row.append(new_cell3);
        new_cell4 = $("<td></td>")
        new_cell4.text(kids_menu_list[j]["Total Fat (g)"]);
        new_row.append(new_cell4);
        new_cell5 = $("<td></td>")
        new_cell5.text(kids_menu_list[j]["Sat Fat (g)"]);
        new_row.append(new_cell5);
        new_cell6 = $("<td></td>")
        new_cell6.text(kids_menu_list[j]["Trans Fat (g)"]);
        new_row.append(new_cell6);
        new_cell7 = $("<td></td>")
        new_cell7.text(kids_menu_list[j]["Cholesterol (mg)"]);
        new_row.append(new_cell7);
        new_cell8 = $("<td></td>")
        new_cell8.text(kids_menu_list[j]["Sodium (mg)"]);
        new_row.append(new_cell8);
        new_cell9 = $("<td></td>")
        new_cell9.text(kids_menu_list[j]["Carbohydrates (g)"]);
        new_row.append(new_cell9);
        new_cell10 = $("<td></td>")
        new_cell10.text(kids_menu_list[j]["Dietary Fiber (g)"]);
        new_row.append(new_cell10);
        new_cell11 = $("<td></td>")
        new_cell11.text(kids_menu_list[j]["Sugars (g)"]);
        new_row.append(new_cell11);
        new_cell12 = $("<td></td>")
        new_cell12.text(kids_menu_list[j]["Protein (g)"]);
        new_row.append(new_cell12);
        new_cell13 = $("<td></td>")
        new_cell13.text(kids_menu_list[j]["Vitamin A"]);
        new_row.append(new_cell13);
        new_cell14 = $("<td></td>")
        new_cell14.text(kids_menu_list[j]["Vitamin C"]);
        new_row.append(new_cell14);
        new_cell15 = $("<td></td>")
        new_cell15.text(kids_menu_list[j]["Calcium"]);
        new_row.append(new_cell15);
        new_cell16 = $("<td></td>")
        new_cell16.text(kids_menu_list[j]["Iron"]);
        new_row.append(new_cell16);
        $('#nutri_table tr:last').before(new_row);
        addition_of_nutrition();
        break;
      }
    }
  }
}

function add_data_to_table(name_of_item,row_id) {
  for(var j=0; j<26; j++) {
    for(var k=0; k<name_of_item.length; k++) {
      var new_row = $("<tr id="+row_id+"></tr>");
      if(kids_menu_list[j]["Menu_item"] == name_of_item[k] ) {
        new_cell1 = $("<td></td>")
        new_cell1.text(kids_menu_list[j]["Menu_item"]);
        new_row.append(new_cell1);
        new_cell2 = $("<td></td>")
        new_cell2.text(kids_menu_list[j]["Calories"]);
        new_row.append(new_cell2);
        new_cell3 = $("<td></td>")
        new_cell3.text(kids_menu_list[j]["Cal From Fat"]);
        new_row.append(new_cell3);
        new_cell4 = $("<td></td>")
        new_cell4.text(kids_menu_list[j]["Total Fat (g)"]);
        new_row.append(new_cell4);
        new_cell5 = $("<td></td>")
        new_cell5.text(kids_menu_list[j]["Sat Fat (g)"]);
        new_row.append(new_cell5);
        new_cell6 = $("<td></td>")
        new_cell6.text(kids_menu_list[j]["Trans Fat (g)"]);
        new_row.append(new_cell6);
        new_cell7 = $("<td></td>")
        new_cell7.text(kids_menu_list[j]["Cholesterol (mg)"]);
        new_row.append(new_cell7);
        new_cell8 = $("<td></td>")
        new_cell8.text(kids_menu_list[j]["Sodium (mg)"]);
        new_row.append(new_cell8);
        new_cell9 = $("<td></td>")
        new_cell9.text(kids_menu_list[j]["Carbohydrates (g)"]);
        new_row.append(new_cell9);
        new_cell10 = $("<td></td>")
        new_cell10.text(kids_menu_list[j]["Dietary Fiber (g)"]);
        new_row.append(new_cell10);
        new_cell11 = $("<td></td>")
        new_cell11.text(kids_menu_list[j]["Sugars (g)"]);
        new_row.append(new_cell11);
        new_cell12 = $("<td></td>")
        new_cell12.text(kids_menu_list[j]["Protein (g)"]);
        new_row.append(new_cell12);
        new_cell13 = $("<td></td>")
        new_cell13.text(kids_menu_list[j]["Vitamin A"]);
        new_row.append(new_cell13);
        new_cell14 = $("<td></td>")
        new_cell14.text(kids_menu_list[j]["Vitamin C"]);
        new_row.append(new_cell14);
        new_cell15 = $("<td></td>")
        new_cell15.text(kids_menu_list[j]["Calcium"]);
        new_row.append(new_cell15);
        new_cell16 = $("<td></td>")
        new_cell16.text(kids_menu_list[j]["Iron"]);
        new_row.append(new_cell16);
        $('#nutri_table tr:last').before(new_row);
        addition_of_nutrition();
        break;
      }
    }
  }
  
}

function add_data_to_adult_table(name_of_item,row_id) {
  for(var j=0; j<23; j++) {
    for(var k=0; k<name_of_item.length; k++) {
      var new_row = $("<tr id="+row_id+"></tr>");
      if(adult_menu_list[j]["Menu_item"] == name_of_item[k] ) {
        new_cell1 = $("<td></td>")
        new_cell1.text(adult_menu_list[j]["Menu_item"]);
        new_row.append(new_cell1);
        new_cell2 = $("<td></td>")
        new_cell2.text(adult_menu_list[j]["Calories"]);
        new_row.append(new_cell2);
        new_cell3 = $("<td></td>")
        new_cell3.text(adult_menu_list[j]["Cal From Fat"]);
        new_row.append(new_cell3);
        new_cell4 = $("<td></td>")
        new_cell4.text(adult_menu_list[j]["Total Fat (g)"]);
        new_row.append(new_cell4);
        new_cell5 = $("<td></td>")
        new_cell5.text(adult_menu_list[j]["Sat Fat (g)"]);
        new_row.append(new_cell5);
        new_cell6 = $("<td></td>")
        new_cell6.text(adult_menu_list[j]["Trans Fat (g)"]);
        new_row.append(new_cell6);
        new_cell7 = $("<td></td>")
        new_cell7.text(adult_menu_list[j]["Cholesterol (mg)"]);
        new_row.append(new_cell7);
        new_cell8 = $("<td></td>")
        new_cell8.text(adult_menu_list[j]["Sodium (mg)"]);
        new_row.append(new_cell8);
        new_cell9 = $("<td></td>")
        new_cell9.text(adult_menu_list[j]["Carbohydrates (g)"]);
        new_row.append(new_cell9);
        new_cell10 = $("<td></td>")
        new_cell10.text(adult_menu_list[j]["Dietary Fiber (g)"]);
        new_row.append(new_cell10);
        new_cell11 = $("<td></td>")
        new_cell11.text(adult_menu_list[j]["Sugars (g)"]);
        new_row.append(new_cell11);
        new_cell12 = $("<td></td>")
        new_cell12.text(adult_menu_list[j]["Protein (g)"]);
        new_row.append(new_cell12);
        new_cell13 = $("<td></td>")
        new_cell13.text(adult_menu_list[j]["Vitamin A"]);
        new_row.append(new_cell13);
        new_cell14 = $("<td></td>")
        new_cell14.text(adult_menu_list[j]["Vitamin C"]);
        new_row.append(new_cell14);
        new_cell15 = $("<td></td>")
        new_cell15.text(adult_menu_list[j]["Calcium"]);
        new_row.append(new_cell15);
        new_cell16 = $("<td></td>")
        new_cell16.text(adult_menu_list[j]["Iron"]);
        new_row.append(new_cell16);
        $('#nutri_table tr:last').before(new_row);
        addition_of_nutrition();
        break;
      }
    }
  }
  
}

function remove_item(element_id) {
  var remove_row = $("#nutri_table").find("tr[id="+element_id+"]");
  $(remove_row).remove();
  addition_of_nutrition();
}

function addition_of_nutrition() {
  var total_row = $('#nutri_table tr:last');
  var vals =["TOTAL",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var all_rows = $("#nutri_table").find("tr[id!='tab']");
  for(var i=2; i<17; i++) {
    var sum = 0;
    all_rows.children("td:nth-child("+i+")").each(function(){
      sum += parseInt($(this).html());
    });
    vals[i] = sum;
  }
  for(var i=2; i<17; i++) {
    total_row.children("td:nth-child("+i+")").html(vals[i]);
  }
  
}