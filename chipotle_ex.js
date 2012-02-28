/*Global variable to store json data.*/

  var adult_menu_list = [], kids_menu_list = [], additional_data = [];
 /*parsing json data*/
 
var nutritionFunctions = {}    //namespace

$(document).ready(function(){
  
  $.ajax({
    url: 'adult_menu.json',
    type: 'GET',
    dataType: "json",
    success: function(data){
      $.each(data,function(i,k_items) {
        adult_menu_list.push(k_items);
      });
    }
  });
  
  $.ajax({
    url: 'kids_menu.json',
    type: 'GET',
    dataType: "json",
    success: function(data){
      $.each(data,function(i,k_items) {
        kids_menu_list.push(k_items);
      });
    }
  });
  
  $.ajax({
    url: 'header_data.json',
    type: 'GET',
    dataType: "json",
    success: function(data){
      $.each(data,function(i,k_items) {
        additional_data.push(k_items);
      });
    }
  });

  $("#adult_menu").click(["adult_menu"],nutritionFunctions.show_adult_menu);
  $("#kids_menu").click(["kids_menu"],nutritionFunctions.show_kids_menu);
  $("input[name='kids_meat']").click(nutritionFunctions.clear_selected_options);
  
  $("#adult_menu_one").find("input").click(nutritionFunctions.show_adult_options);
   /*
    * WA: Lets just stop looping over jquery variables to
    *     do common operations on all of them at once.
    */
  $("#kids_menu_one").find("input").click(nutritionFunctions.show_kids_options);
   /*
    * WA: Lets just stop looping over jquery variables to
    *     do common operations on all of them at once.
    */

  var t4 = $("#adult_menu_one, #kids_menu_one").find("input");
   /*
    * WA: Lets just stop looping over jquery variables to
    *     do common operations on all of them at once.
    */
  for(var i=0; i < t4.length; i++) {
    $(t4[i]).click(nutritionFunctions.pre_select_options);
    $(t4[i]).click(nutritionFunctions.clear_added_values);
    $(t4[i]).click([t4[i].name], nutritionFunctions.add_nutri_fresh);
  }
  
  var t5 = $("#adult_menu_options, #adult_regular_menu").find("input");
  for(var i=0; i < t5.length; i++) {
    $(t5[i]).click([t5[i].id, t5[i].type], nutritionFunctions.add_nutri_adult);
  }
  
  var t6 = $("#kids_regular_menu, #kids_third_menu, #kids_menu_options").find("input");
  for(var i=0; i < t6.length; i++) {
    $(t6[i]).click([t6[i].id, t6[i].type], nutritionFunctions.add_nutri_kids);
  }
  
});

nutritionFunctions.show_adult_menu = function(ele) {
  $("#adult_menu_one").find('input').attr("checked", false);
  $(additional_data[3].kids_menu_show[0]).hide();
  $(additional_data[1].adult_menu_show[0]).show();
  nutritionFunctions.change_visible_menu(ele.data[0]);
  nutritionFunctions.clear_tab_on_change();
  nutritionFunctions.clear_added_values();
}

nutritionFunctions.show_kids_menu = function(ele) {
  $("#kids_menu_one").find('input').attr("checked", false);
  $(additional_data[1].adult_menu_show[0]).hide();
  $(additional_data[3].kids_menu_show[0]).show();
  nutritionFunctions.change_visible_menu(ele.data[0]);
  nutritionFunctions.clear_tab_on_change();
  nutritionFunctions.clear_added_values();
}

/*Toggling between display of kids or adult menu items on respective selection.*/
nutritionFunctions.change_visible_menu = function(menu_id) {
  if (menu_id == "adult_menu") {
    $(additional_data[1].adult_menu_show[0]).show();
    $(additional_data[3].kids_menu_show[0]).hide();
  } else if (menu_id == "kids_menu") {
    $(additional_data[3].kids_menu_show[0]).show();
    $(additional_data[1].adult_menu_show[0]).hide();
  }
  $.each(additional_data[2].menu_hide, function(i,ele){$(ele).hide();});
}

/*clearing nutrition table data*/
nutritionFunctions.clear_tab_on_change = function() {
  $("#nutri_table").find("tr[id!='tab']").remove();
}

/*clearing calculated values of nutrition table.*/
nutritionFunctions.clear_added_values = function() {
  $('#nutri_table tr:last').find("td:gt(0)").html(0);
}

/*Displaying list of items in a particular selected menu.*/

nutritionFunctions.show_adult_options = function() {
  $(additional_data[2].menu_hide[0]).hide();
  $(additional_data[2].menu_hide[1]).hide();
  $(additional_data[2].menu_hide[3]).show();
  $(additional_data[2].menu_hide[4]).show();
  var adult = $("#adult_menu_one").find("input:checked");
   if (adult.val() == "BURRITO") {
     nutritionFunctions.clear_selections();
     $.each(additional_data[4].BURRITO[0].show_data, function(i,ele){$(ele).show();});
     $.each(additional_data[4].BURRITO[1].hide_data, function(i,ele){$(ele).hide();});
   } else if (adult.val() == "BURRITO BOWL") {
       nutritionFunctions.clear_selections();
       $.each(additional_data[5].BURRITO_BOWL[0].show_data, function(i,ele){$(ele).show();});
       $.each(additional_data[5].BURRITO_BOWL[1].hide_data, function(i,ele){$(ele).hide();});
   } else if (adult.val() == "TACOS") {
       nutritionFunctions.clear_selections();
       $.each(additional_data[6].TACOS[0].show_data, function(i,ele){$(ele).show();});
       $.each(additional_data[6].TACOS[1].hide_data, function(i,ele){$(ele).hide();});
   } else if (adult.val() == "SALAD") {
      nutritionFunctions.clear_selections();
      $.each(additional_data[7].SALAD[0].show_data, function(i,ele){$(ele).show();});
      $.each(additional_data[7].SALAD[1].hide_data, function(i,ele){$(ele).hide();});
   }
} 
  
nutritionFunctions.show_kids_options = function() {
  var kid = $("#kids_menu_one").find("input:checked");
  $(additional_data[2].menu_hide[0]).show();
  $(additional_data[2].menu_hide[1]).show();
  $(additional_data[2].menu_hide[3]).hide();
  $(additional_data[2].menu_hide[4]).hide();
  if (kid.val() == "SMALL QUESADILLA MEAL") {
    nutritionFunctions.clear_selections_kid_block();
    $.each(additional_data[8].SMALL_QUESADILLA_MEAL[0].show_data, function(i,ele){$(ele).show();});
    $.each(additional_data[8].SMALL_QUESADILLA_MEAL[1].hide_data, function(i,ele){$(ele).hide();});
  } else if (kid.val() == "SINGLE TACO MEAL") {
     nutritionFunctions.clear_selections_kid_block();
     nutritionFunctions.clear_selections();
     $.each(additional_data[9].SINGLE_TACO_MEAL[0].show_data, function(i,ele){$(ele).show();});
     $.each(additional_data[9].SINGLE_TACO_MEAL[1].hide_data, function(i,ele){$(ele).hide();});
  } else if (kid.val() == "TWO TACO KIT") {
     nutritionFunctions.clear_selections_kid_block();
     nutritionFunctions.clear_selections();
     $.each(additional_data[10].TWO_TACO_KIT[0].show_data, function(i,ele){$(ele).show();});
     $.each(additional_data[10].TWO_TACO_KIT[1].hide_data, function(i,ele){$(ele).hide();});
  } 
}

/*clearing pre selected items in case of change of choice of item.*/
nutritionFunctions.clear_selected_options = function(){
  $.each($("#what_inside").find("input"), function(i,ele){ele.checked = false; nutritionFunctions.remove_item(ele.id);});
  nutritionFunctions.addition_of_nutrition();
}

/*clearing various selections on change.*/
nutritionFunctions.clear_selections = function() {
  $("input[type='checkbox'], input[name='tacos_3']").attr("checked", false);
}

nutritionFunctions.clear_selections_kid_block = function() {
   /*
    * WA: Lets just stop looping over jquery variables to
    *     do common operations on all of them at once.
    */
  $("input[name='kids_meat'], input[name='side_one'], input[name='side_two'], input[name='tacos_1'], input[name='tacos_2'], input[name='side_rice']").attr("checked", false);
}


/*marking pre selected options as checked.*/
nutritionFunctions.pre_select_options = function() {
  $.each(additional_data[11].selected_options, function(i,ele){$(ele)[0].checked = true;});
  if($("input[name='kids_menu_item']")[0].checked){
   $("input[name='kids_meat']")[0].checked = true; 
  } else {
   $("input[name='kids_meat']")[1].checked = true;  
  }
}

/*adding items for adult menu*/
nutritionFunctions.add_nutri_adult = function(ele) {
  if($("#nutri_table").find("tr[id="+ele.data[0]+"]").length){
   nutritionFunctions.remove_item(ele.data[0]); 
  }else {
    var name_of_item = /.+_(.+)/g.exec(ele.data[0]);
    if(ele.data[1] == 'checkbox'){
      var row_id = "item_"+name_of_item[1];
      nutritionFunctions.add_data_to_table(name_of_item[1], row_id, "adult");
    } else if(ele.data[1] == 'radio'){
      var row_id ="radio_item";
      nutritionFunctions.add_data_to_table(name_of_item[1], row_id, "adult");
    }
  }
}

/*adding items for kids menu*/
nutritionFunctions.add_nutri_kids = function(ele) {
  var name_of_item = /.+_(.+)/g.exec(ele.data[0]);
  var row_id;
  if($("#nutri_table").find("tr[id="+ele.data[0]+"]").length){
    nutritionFunctions.remove_item(ele.data[0]); 
  }else {
    var radio_selected = $("input[name='kids_meat']");
    var count = $("#what_inside").find("input:checked").length;
    for(var i=0; i<radio_selected.length; i++) {
      if(radio_selected[i].checked && radio_selected[i].id == "item_FajitaVegetables") {
        if(count > 3) {
       	  alert("Please select a maximum of 3 fillings!");
          $("#what_inside").find("input[id='"+ele.data[0]+"']").attr("checked", false);
          return false;
       	}
      }else if(radio_selected[i].checked && radio_selected[i].id != "item_FajitaVegetables") {
        if(count > 2) {
       	  alert("Please select a maximum of 2 fillings!");
          $("#what_inside").find("input[id='"+ele.data[0]+"']").attr("checked", false);
          return false;
       	}
      }
    }
    if(ele.data[1] == 'checkbox'){
      row_id = "what_item_"+name_of_item[1];
      nutritionFunctions.add_data_to_table(name_of_item[1],row_id, "kids");
    }else if(ele.data[1] == 'radio'){
      if((/Chicken/.test(name_of_item[1])) || (/FajitaVegetables/.test(name_of_item[1])) || (/Steak/.test(name_of_item[1])) || (/Barbacoa/.test(name_of_item[1])) || (/Carnitas/.test(name_of_item[1])) || (/Guacamole/.test(name_of_item[1]))){
        row_id = 'kids_meat';
      }else if((/CilantroLimeRiceSide/.test(name_of_item[1])) || (/BrownRiceSide/.test(name_of_item[1]))) {
        row_id = 'side_rice';
      }else if((/BlackBeansSide/.test(name_of_item[1])) || (/PintoBeansSide/.test(name_of_item[1]))) {
        row_id = 'side_beans';
      }else if((/SoftCornTortilla/.test(name_of_item[1])) || (/CrispyCornTortilla/.test(name_of_item[1])) || (/SoftFlourTortilla/.test(name_of_item[1]))) {
        row_id = 'side_taco';
      }else if((/CheeseSmallQuesadilla/.test(name_of_item[1]))) {
        row_id = 'cheese_small';
      }else if((/Chips/.test(name_of_item[1]))) {
        row_id = 'chips';
      }
      nutritionFunctions.add_data_to_table(name_of_item[1], row_id, "kids");
    }
 	}
}

/*adding preselected items to table*/
nutritionFunctions.add_nutri_fresh = function(ele) {
  /*
  * WA: Exract different parameters here and passs it to a function
        that handles the addition to table.
        */
  $("#nutri_table").find("tr[id!='tab']").remove();
  var name_of_item = [], row_id = [], selected_data;
  if(/kids/.test(ele.data[0])){
    selected_data = $("#kids_menu_one").find("input:checked");
  } else if(/adult/.test(ele.data[0])) {
    selected_data = $("#adult_menu_one").find("input:checked");;
  }
  if (selected_data[0].value == "SMALL QUESADILLA MEAL") {
    name_of_item =["SoftFlourTortilla","CheeseSmallQuesadilla","CilantroLimeRiceSide","BlackBeansSide","Chips"];
    row_id =['flour_taco','cheese_small','side_rice','side_beans','chips'];
  } else if (selected_data[0].value == "SINGLE TACO MEAL" || selected_data[0].value == "TWO TACO KIT") {
    name_of_item = ["CrispyCornTortilla","Chicken","CilantroLimeRiceSide","Chips"];
    row_id =['side_taco','kids_meat','side_rice','chips'];
    if(selected_data[0].value == "TWO TACO KIT") {
    } 
  } else if (selected_data[0].value == "BURRITO") {
    name_of_item = ["FlourTortillaBurrito"];
    row_id = ['radio_item'];
  } else if (selected_data[0].value == "TACOS") {
    name_of_item = ["CrispyCornTortilla"];
    row_id = ['radio_item'];
  } else if (selected_data[0].value == "SALAD") {
    name_of_item = ["RomaineLettuceSalad"];
    row_id = ['radio_item'];
  }
  
  for(var k=0; k<name_of_item.length; k++) {
    nutritionFunctions.add_data_to_table(name_of_item[k], row_id[k], ele.data[0])
  }
}

/*adding data to nutrition table*/
nutritionFunctions.add_data_to_table = function(name_of_item,row_id, data) {
  var food_array;
  if(/kids/.test(data)){
    if($("input[name='kids_menu_item']")[2].checked && (name_of_item == 'SoftCornTortilla' || name_of_item == 'CrispyCornTortilla' || name_of_item == 'SoftFlourTortilla')) {
      multiplier = 2;
    } else { multiplier = 1; }
    food_array = kids_menu_list;
  } else {
    food_array = adult_menu_list;
    if ($("input[name='adult_menu_item']")[2].checked && (name_of_item == 'SoftCornTortilla' || name_of_item == 'CrispyCornTortilla' || name_of_item == 'SoftFlourTortilla')){
      multiplier = 3;
    } else { multiplier = 1;}
  }
  for(var j=0; j<food_array.length; j++) {
    var new_row = $("<tr id="+row_id+" onClick = 'nutritionFunctions.remove_row(this)'></tr>");
    if(food_array[j][additional_data[0].array_nutrition[0]] == name_of_item ) {
      new_cell1 = $("<td id = 'title'></td>")
      new_cell1.text(food_array[j][additional_data[0].array_nutrition[0]]);
      if(/adult/.test(data) && (name_of_item == "Chicken" || name_of_item == "Steak" || name_of_item == "Carnitas" || name_of_item == "Barbacoa")){
        form_div = $("<div class=\"form_div\"><label>Servings</label><input type = \"text\" class = \"serve\" id=\"serve_"+name_of_item+"\" value = \"1\"><span class = \"add\" onClick = \"nutritionFunctions.add_servings(event, this.id);\" id=\"add_"+name_of_item+"\">+</span><span class = \"del\" onClick = \"nutritionFunctions.del_servings(event, this.id);\" id=\"del_"+name_of_item+"\">-</span>")
        new_cell1.append(form_div);
      }
      new_row.append(new_cell1);
      for(var k=1;k<16;k++){
        new_row.append($("<td></td>").text(food_array[j][additional_data[0].array_nutrition[k]]*multiplier));
      }
        /*
        *WA: Try to append new elements outside of a loop
        */
      break;
    }
  }
  if($("#nutri_table").find("tr[id="+row_id+"]").length){
    $("#nutri_table").find("tr[id="+row_id+"]").replaceWith(new_row);
  } else {
    $('#nutri_table tr:last').before(new_row);
  }
  nutritionFunctions.addition_of_nutrition();
}

/*Removing unchecked or changed item from nutrition table.*/
nutritionFunctions.remove_item = function(element_id) {
  $("#nutri_table").find("tr[id ^="+element_id+"]").hide('slow', function(){ $("#nutri_table").find("tr[id ^="+element_id+"]").remove();nutritionFunctions.addition_of_nutrition();});
}

/*Addition of nutrition value.*/
nutritionFunctions.addition_of_nutrition = function() {
  for(var i=2; i<17; i++) {
    var sum = 0;
    $("#nutri_table").find("tr[id!='tab']").children("td:nth-child("+i+")").each(function(){
    sum += parseFloat($(this).html());
    });
    $('#nutri_table tr:last').children("td:nth-child("+i+")").html(sum);
  }
  $("tr:odd").addClass("odd_row");        //adding css on dynamic row creation.
  $('#nutri_table tr:last').addClass("last_row");
}

//function to add servings.
nutritionFunctions.add_servings = function(event, item_id) {
  event.stopPropagation();
  var id_code = item_id.split(/\_/g);    //stores chicken,steak etc.
  if($("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val() == 1){
    $("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val(2);
    $.each($("#nutri_table").find("tr[id ='item_"+id_code[1]+"']").find("td[id!='title']"), function(i,ele){$(ele).html(parseFloat($(ele).html())*2);});
    nutritionFunctions.addition_of_nutrition();
  }
}

//function to delete servings.
nutritionFunctions.del_servings = function(event, item_id) {
 event.stopPropagation();
 var id_code = item_id.split(/\_/g);    //stores chicken,steak etc.
 if($("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val() == 2){
   $("#nutri_table").find("input[id ='serve_"+id_code[1]+"']").val(1);
   $.each($("#nutri_table").find("tr[id ='item_"+id_code[1]+"']").find("td[id!='title']"), function(i,ele){$(ele).html(parseFloat($(ele).html())*0.5);});
   nutritionFunctions.addition_of_nutrition();
 } 
}

// function to delete row on clicking each row.
nutritionFunctions.remove_row = function(th) {
  if($("input[id=\'"+th.id+"\']")[0] == undefined){  //handling exception in case of row created by radio button.
    return false;
  }else{
    $("input[id=\'"+th.id+"\']")[0].checked = false;
    $(th).hide('slow', function(){ $(th).remove(); nutritionFunctions.addition_of_nutrition();});
  }
}

$("#item_No_Item").click(function() {
  $("#nutri_table").find("tr[id ='kids_meat']").remove();
  nutritionFunctions.addition_of_nutrition();
});