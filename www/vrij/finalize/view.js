class FinalizeView 
{
    constructor(taken) 
    {
    
    }

    showAfrondPopup(order)
    {
        var id = order['id'];
        var prod_relations = order['product_relations'];

        var products = []

        // get product types
        for(var i=0;i<prod_relations.length;i++)
        {
            products[i] = []
            products[i]['id'] = prod_relations[i]['id'];
            products[i]['name'] = prod_relations[i]['product']['name'];
            products[i]['quantity'] = prod_relations[i]['quantity'];
        }

        // start frame en title
        var html  = "<div class='ui-popup-screen ui-overlay-inherit in' id='afrondPop'></div> "
                  + "   <div class='ui-popup-container pop in ui-popup-active' id='afrond-popup' style='top: 10vw; left: 2vw; width: 95vw;'>"
                  + "       <div class='ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all' data-role='popup' id='afrondp' data-dismissible='false' style=''>"
                  + "           <h3 style='margin:0;margin-left:2vw; margin-top:1vh; text-align:center;'>Afrond formulier<hr></h3>"
                  + "           <div id='quantity-form' class='ui-resize ui-content ui-body-a' data-role='content' data-theme='a' role='main'>";
        
        // quantity form
        html += "                   <label><b> Noteer de juiste product hoeveelheiden.</b></label>";

        for(var i =0; i < products.length; i++)
        {
            html += "               <label>"+ products[i]['name'] + "</label>"
                  + "               <div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"
                  + "                   <div class='ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit'>"
                  + "                       <input value='"+ products[i]['quantity'] +"' id='afrond-quantity-"+ products[i]['id'] + "' class='inputnum' type='number' value='1'>"
                  + "                   </div>"
                  + "               </div>";
        }
        // delivery location
        html += ""
             + "                    <div class='ui-center'>"
             + "                        <a onclick='c.closePopup()' id='btn-submit' class='ui-btn ui-options ui-red'>Annuleer <img src='include/css/images/icons-png/delete-white.png'></a>"
             + "                        <a onclick='c.renderPhotoForm("+id+")' id='btn-submit' class='ui-btn ui-options ui-green'>Bevestig <img src='include/css/images/icons-png/check-white.png'></a>"
             + "                    </div>"
             + "                 </div>";

        // photo form
        html += "               <div id='photo-form' class='ui-content ui-body-a' data-role='content' data-theme='a' role='main' style='display: block;'>"
                +"                  <h3> Foto's </h3>"
                + "                 <label>Klik op de vakjes om foto's te maken van de producten.</label>"
                + "                 <table>"
                + "                     <div id='photo-icons' class='ui-center'></div>"
                + "                 </table>"
                + "                  </div>";

        $("#content").after(html);
        $("#photo-form").hide();
    }

    closePopup() 
    {
        $("#afrondPop").remove();
        $("#afrond-popup").remove();
    }

    showCurrentTask(current, task) 
    {
        if(current < task.length)
        {
            var order_nr    = task[current]['order_nr'];
            var sup         = task[current]['supplier'];
            
            sup.city        = this.checkNullValue(sup.city, "n/a");
            sup.street      = this.checkNullValue(sup.street, "n/a");
            sup.name        = this.checkNullValue(sup.name, "n/a");
            sup.phone       = this.checkNullValue(sup.phone, "n/a");

            // title
            var currentTask = "<h3 class='details'> Details: </h3>";
        
            // details current task
            currentTask += "<table id='info' data-role='table' class='ui-responsive table-stroke ui-table ui-table-reflow'>"
                  + "<tbody>"
                    + "<tr>"
                        + "<td id='stad' ><b > Order Nr.: </b></td><td class='ui-width'>"
                        + order_nr 
                        + "</td>"
                    + "</tr>"
                    + "<tr>"
                        + "<td id='stad' ><b > Stad: </b></td><td class='ui-width'>"
                        + sup.city
                        + "</td>"
                    + "</tr>"
                    + "<tr>"
                        + "<td id='straat'><b class='ui-table-cell-label'> Straat: </b></td>"
                        + "<td class='ui-width'>" + sup.street + "</td>"
                    + "</tr>"
                    + "<tr>"
                        + "<td id='datum'><b class='ui-table-cell-label'> Uiterste Datum: </b></td>"
                        + "<td class='ui-width'>"
                        + this.parseTSDate(task[current]['order_date'])
                        + "</td>"
                    + "</tr>"
//                  + "<tr><td id='tijd'><b class='ui-table-cell-label'> Tijd: </b></td>"
//                      + "<td class='ui-width'>"
//                      + this.parseTSTime(task[current]['order_date'])
//                      + "</td>"
//                  + "</tr>"
                    + "<tr>"
                        + "<td id='contact'><b class='ui-table-cell-label' > Contact: </b></td>"
                        + "<td class='ui-width'>"
                        + sup.name
                        + "</td>"
                    + "</tr>"
                    + "<tr>"
                        + "<td id='tel'><b class='ui-table-cell-label' > Telefoon: </b></td>"
                        + "<td class='ui-width'>"
                        + sup.phone
                        + "</td>"
                    + "</tr>"
                    + "</tbody>"
              +  "</table> ";
        
            // load options
            currentTask += "<div id='finalize-buttons' class='ui-center'>";
            currentTask += "    <a onClick='c.goBack()' data-rel='popup' data-transition='pop' data-position-to='window' id='btn-submit' class='ui-btn ui-options ui-red'>Annuleer <img src='include/css/images/icons-png/delete-white.png'></a>"; 
            currentTask += "    <a onClick='c.renderAfrondPopup(" + current + ")' class='ui-btn ui-options ui-green'>Afronden <img src='include/css/images/icons-png/check-white.png'></a>";
            currentTask += "</div>";
        
            $("#content").html(currentTask);
        }
        else 
        {
            $("#finalize-buttons").html("<a onClick='c.goBack()' class='ui-btn ui-half ui-options ui-green'>Voltooi<br>Ophaaldienst&nbsp;<img src='include/css/images/icons-png/check-white.png'></a></div>");
        }
    }
  
    showWheel(current, tasks) 
    {
        $("#wheel").remove();
        $("#header").after("<div id='wheel'></div>");

        var html = ""
                    + "<p class='previous'>"
                        + "<span id='previous-index'>0</span>.&nbsp;"
                        + "<span id='previous-label'>Geen taken voltooid</span>"
                    + "</p>"
                    + "<p class='current'>"
                        + "<span id='current-index'>1</span>.&nbsp;"
                        + "<span id='current-label'></span>"
                    + "</p>"
                    + "<p class='next'>"
                        + "<span id='next-index'>2</span>.&nbsp;"
                        + "<span id='next-label'></span>"
                    + "</p>"
            $("#wheel").html(html);

        if(current < tasks.length)
        {
            if(current == 0)
            {
                $("#previous-label").html("Geen taken voltooid");
            } else {
                $("#previous-index").html(current);
                $("#previous-label").html(tasks[current-1]['supplier']['street']);
            }

            if (current == tasks.length-1) 
            {
                $("#next-index").html(tasks.length+1);
                $("#next-label").html("Einde rit");
            }
            else 
            {
                $("#next-index").html(current + 2);
                $("#next-label").html(tasks[current+1]['supplier']['street']);
            }

            $("#current-index").html(current + 1);
            $("#current-label").html(tasks[current]['supplier']['street']);
        }
        else 
        {
            $("#previous-index").html(current);
            $("#previous-label").html(tasks[current-1]['supplier']['street']);

            $("#current-index").html(current + 1);
            $("#current-label").html("Einde rit");

            $("#next-index").html("");
            $("#next-label").html("");
        }

    }
  
    showPhotoForm(orderId, products)
    {
        $("#quantity-form").hide();

        var html = "";

        for(var i=0; i < products.length; i++)
        {
            var quantity = products[i]['quantity'];

            html += "<h2 id='title-"+ i +"'>" + products[i]['product']['name']+ "</h2><table>";
            
            (quantity > 999 ? quantity = 999 : 0) 
            
            for (var j = 0; j < quantity; j++) 
            {
                var imageOption = "" 
                    + "<td>"
                        + "<div class='image-upload'>"
                            + "<label for='file-input-" + products[i]['id'] + "'>"
                                + "<h4>Foto #" + (j + 1) + "</h4>"
                                + "<img id='file-input-img-" + products[i]['id'] + "' src='include/img/plus.png' class='ui-plus' max-width='40%' />"
                            + "</label>"
                            + "<input style='display:none' id='file-input-" +  products[i]['id'] + "' class='photo-input' type='file' onChange='c.v.changePhotoIconToSolved(" +  products[i]['id'] + ")' />"
                        + "</div>" 
                    + "</td>";


                switch (j % 2) 
                {
                    case 0:
                      html +=  "<tr>" + imageOption;
                      break;
                    case 1:
                      html +=  imageOption + "</tr>";
                      break;
                    default:
                }
            }
            html += "</tr></table>"; 
        }
            html += ""
                  + "<a id='btn-submit' class='ui-btn ui-options ui-green' role='button' name='submit' onClick='c.submitForm("+ orderId +", false)'>Verstuur</a>";

        $("#photo-icons").html(html);  
        $("#photo-form").show();
    }
  
    changePhotoIconToSolved(id) 
    {
        // check if file is an image
        var allowed_types = ["image/jpg", "image/jpeg", "image/png", "image/bmp"];
    
        var img = $("#file-input-" + id).prop("files");
        var imgtype = img[0]["type"];
    
        if (allowed_types.indexOf(imgtype) >= 0) 
        {
          $("#file-input-img-" + id).attr("src", "include/img/checkmark.png");
        } else {
          $("#file-input-img-" + id).attr("src", "include/img/crossmark.png");
        }
    }

    parseTSDate(ts)
    {
        return ts.substring(0,ts.indexOf('T'));
    }

    parseTSTime(ts)
    {
        return ts.substring(ts.indexOf('T')+1,ts.indexOf('+')-3);
    }

    checkNullValue(value, replacement)
    {
        if(typeof(value) == 'undefined')
        {
            value = replacement
        }

        return value
    }
}
