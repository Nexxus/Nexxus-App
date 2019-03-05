class VrijView 
{
    constructor() 
    {
      
    }

    showHeader(div)
    {
        $(div).html("<div data-role='header' data-position='fixed' role='banner' class='ui-header ui-bar-inherit ui-header-fixed slidedown'>"
              + "<h1 class='ui-title' role='heading' aria-level='1'>Nexxus</h1>"
              + "</div>"
        );
    }
    
    showFooter(div)
    {
         $(div).html("<a id='btn-submit' onClick='loginc.handleLogout()' class='ui-btn-half ui-red ui-link ui-btn ui-shadow ui-corner-all' data-role='button' role='button'>Uitloggen</a>");
    }

    showTasklist(div, title, tasks, header, collapse)
    {
        var html = "";
        var div_id = div.substr(1);

        /* body */
        html  += "<div class='ui-content' data-role='content' data-theme='a'>"
               + "<div id='"+div_id+"-title'><h3 style='margin:0;margin-left:2vw; margin-top:1vh;'>" + title + "</h3></div>";

        html  += "<div id='"+div_id+"-spec'></div>";
        /* table */
        html += "<div data-role='content' data-theme='a'>"
              + "<table id='table-"+div_id+"' data-role='table' data-mode='reflow' class='ui-responsive ui-table ui-table-reflow'>"
              + "<tbody id='title'>";

        if(header) 
        {
           html += "<tr>"
                 +   "<td><b>Datum</b></td>"
                 +   "<td><b>Hoeveelheid</b></td>"
                 +   "<td><b>Stad</b></td>"
                 + "</tr>"
        }

        html += "</tbody>";

        // count rows for dropdown
        var row_c = 0;

        /* table rows */
        if(Array.isArray(tasks) && tasks.length > 0)
        {
            html += "<tr style='background-color:#ddd'><td class='pooltitle' onClick=\"c.dropdownToggle('"+div+"')\" id='"+div_id+"-dropdown'></td></tr>";
            html += "<tbody id='"+div_id+"-rows' style='display: none;'>";

            for(var i=0; i < tasks.length; i++) 
            {
                row_c++;
                // count products
                var relations = tasks[i]['product_relations'];
                var totalproducts = 0;

                for(var pr=0; pr < relations.length; pr++)
                {
                    totalproducts += relations[pr]['quantity'];
                }

                var location = tasks[i]['location']['name'];

                html += "<tr class='"+div_id+"' onClick='c.renderPopupTask(" + tasks[i]['id'] + ")'"
                            + "data-priority='1' id='title"+i+"'>";

                html += "<td>" + this.parseTSDate(tasks[i]['order_date']) + "</td>";

                html += "<td>" + totalproducts + (totalproducts==1 ? " product" : " producten") + "</td>";

                html +=   "<td>" + location + "</td>"; 

                html +=  "</tr>";
            }	
        } else { html += "<tr><td colspan=3>Geen taken gevonden</td></tr>"; }
        html += "</tbody></table>";

        $(div).html(html);

        // fill dropdown header
        var ddtxt = "<span id='" + div_id + "-caret'>" +
                        "▼" + 
                    "</span>" + 
                    "<strong>" + 
                        row_c + 
                        (row_c==1 ? " ophaaltaak" : " ophaaltaken") +
                        " in huidige pool" + 
                    "</strong>";
        $(div+"-dropdown").html(ddtxt);

        // collapse dropdown if needed
        var rows = div+"-rows"; 
        var caret = div+"-caret";
        
        if(collapse)
        {
            $(caret).html("▲");
            $(rows).hide();
        }
        else 
        {
            $(caret).html("▼")
            $(rows).show();
        }

        // unique elements 
        switch(div)
        {
            case "#tasklist-aangeboden":
                if(row_c==0)
                {
                    $(div+"-spec").html("<a id='btn-submit' class='ui-btn-half ui-blue ui-link ui-btn ui-shadow ui-corner-all' data-role='button' role='button'>Accepteer Taken</a>");
                }
                else
                {
                    $(div+"-spec").html("<a id='btn-submit' onClick='c.renderAcceptBulkPopup()' class='ui-btn-half ui-blue ui-link ui-btn ui-shadow ui-corner-all' data-role='button' role='button'>Accepteer Taken</a>");
                }
                break;
            case "#tasklist-accepteerde":

                if(row_c==0)
                {
                    $(div+"-spec").html("<a id='btn-submit' class='ui-btn-half ui-green ui-link ui-btn ui-shadow ui-corner-all' data-role='button' role='button'>Start Ophaal</a>");
                }
                else
                {
                    $(div+"-spec").html("<a id='btn-submit' onClick='c.sendToFinalForm(0)' class='ui-btn-half ui-green ui-link ui-btn ui-shadow ui-corner-all' data-role='button' role='button'>Start Ophaal</a>");
                }
                break;
            default:
        }

    }

    showPopupTask(div, task)
    {
        var html = "";
      
        var sup = task.supplier;

        $(".visibility").remove();
        // undo nulls
        sup.city = this.checkNullValue(sup.city, "n/a");
        sup.street = this.checkNullValue(sup.street, "n/a");
        sup.name = this.checkNullValue(sup.name, "n/a");
        sup.phone = this.checkNullValue(sup.phone, "n/a");

        var relations = task['product_relations'];
        var totalproducts = 0;

        for(var pr=0; pr < relations.length; pr++)
        {
            totalproducts += relations[pr]['quantity'];
        }

        html += "<div class='ui-popup-screen ui-overlay-inherit in' id='infop'></div> "
        + "<div class='ui-popup-container pop in ui-popup-active' id='info-popup' style='top: 171px; left: 29px'>"
                  + "<div class='ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all' data-role='popup' id='infop' data-dismissible='false' style=''>"
                  + "<a onclick='c.closeInfoPopup()' style='position:relative; float: right;margin:0'  data-role='button'  class='ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-right ui-red' ></a>"
                  + "<h3 style='margin:0;margin-left:2vw; margin-top:1vh;'>Info</h3>"
                  + " <table id='info' data-role='table' class='ui-responsive table-stroke ui-table ui-table-reflow'>"
                    + "<tbody >"
                        + "<tr>"  
                            + "<td id='stad' ><b class='ui-table-cell-label'> Stad: </b></td><td class='ui-width'>" + sup.city + "</td>"
                        + "</tr>"
                        + "<tr>" 
                            +" <td id='straat'><b class='ui-table-cell-label' > Straat: </b></td><td class='ui-width'>" + sup.street + "</td>"
                        +"</tr>"
                        +"<tr> "
                            +"<td id='datum'><b class='ui-table-cell-label' > Uiterste Datum: </b></td><td class='ui-width'>" + this.parseTSDate(task.order_date) + "</td>"
                        +"</tr>"
                        + "<tr>" 
                            + "<td id='wat'><b class='ui-table-cell-label' > Hoeveelheid: </b> </td><td class='ui-width'>"+ totalproducts + "</td>"
                        +"</tr>"
                            +"<tr><td id='tijd'><b class='ui-table-cell-label'  > Tijd: </b></td><td class='ui-width'>"+ this.parseTSTime(task.order_date) +"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td id='contact'><b class='ui-table-cell-label' > Contact: </b></td><td class='ui-width'>"+ sup.name +" </td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td id='tel'><b class='ui-table-cell-label' > Telefoon: </b></td><td class='ui-width'>"+ sup.phone +" </td>"
                        + "</tr>"
                    +"</tbody>"; 
                +"</table> "
        +"</div>";

        // customize buttons
        var choice = "";
        choice += "<br><div class='ui-center'>";
        if(task['status']['id']==2) 
        {
            choice += "<a onClick='c.renderRefuse()' href='#reden' data-rel='popup' data-transition='pop' data-position-to='window' id='btn-submit' class='ui-btn ui-options ui-red'>Weigeren  <img src='include/css/images/icons-png/delete-white.png'></a>"
            choice += "<a onClick='c.postAcceptedTask(" + task['id'] + ", false)' id='btn-submit' class='ui-btn ui-options ui-green'>Accepteren <img src='include/css/images/icons-png/check-white.png'></a>";
        } else
        if(task['status']['id']==300) 
        {
            choice += "<a onClick='c.renderRefuse()' href='#reden' data-rel='popup' data-transition='pop' data-position-to='window' id='btn-submit' class='ui-btn ui-options ui-red'>Weigeren  <img src='include/css/images/icons-png/delete-white.png'></a>"
            choice += "<a onClick='c.sendToFinalForm(" + task['id'] + ")' id='btn-submit' class='ui-btn ui-options ui-green'>Afronden <img src='include/css/images/icons-png/check-white.png'></a>";

        }
        choice += "</div>";

        $(".visibility").remove();
        $("#content").after(html);
        //$("#content").animate({height:'22vh'});
        $("#info").after(choice);
        this.switch = true;
    }

    renderAcceptPrompt()
    {
        var popup = "";

        popup += "<div class='ui-popup-screen ui-overlay-inherit in' id='reden-screen'></div> "
                + "<div class='ui-popup-container pop in ui-popup-activ' id='reden-popup' style='max-width: 330px; top: 171px; left: 29px;'>"
                    + "<div class='ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all' data-role='popup' id='reden' data-dismissible='false' style='max-width:400px; min-width: 300px'>"
                    + "<div role='main' class='ui-content'>"
                    + "<a onclick='c.closingPopup()' style='position:relative; float: right;margin:0'  data-role='button'  class='ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-right ui-red' ></a>"
                    + "<br>"
                    + "<h3>Accepteer je de aangeboden taken?</h3>"
                    + "<div onclick='c.closingPopup()' class='ui-green mc-text-center'><a onClick='c.acceptAllTasks()' class='ui-btn ui-corner-all ui-shadow ui-btn-b mc-top-margin-1-5' data-disabled='false'>Bevestig</a></div>"
                 + "</div>"
            +"</div>"
        + "</div>";
        $("#footer").after(popup);

        $("#infop").hide();
        $("#info-popup").hide();
    }

    renderRefuse()
    {
        var popup = "";

        popup += "<div class='ui-popup-screen ui-overlay-inherit in' id='reden-screen'></div> "
                + "<div class='ui-popup-container pop in ui-popup-activ' id='reden-popup' style='width: 80vw; top: 171px; margin-left: 9vw;'>"
                    + "<div class='ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all' data-role='popup' id='reden' data-dismissible='false' style='max-width:400px; min-width: 300px'>"
                    + "<div role='main' class='ui-content'>"
                    + "<a onclick='c.closingPopup()' style='position:relative; float: right;margin:0'  data-role='button'  class='ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-right ui-red' ></a>"
                    + "<br>"
                    + "<h3 >Reden annulering</h3>"
                    + "<form>"
                        +"<label class='ui-radio ui-radio-pop ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left'>"
                        + "Ziek"
                        +"<input data-cacheval='false' class=' mc-text-center' type='radio' name='radio-choice' id='radio-choice-1' value='choice-1'>"
                        +"</label>"
                        +"<label class='ui-radio ui-radio-pop ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left'>"
                        +"Tijdgebrek"
                        +"<input data-cacheval='false' type='radio' name='radio-choice' id='radio-choice-2' value='choice-2'>"
                        +"</label>"
                        +"<label class='ui-radio ui-radio-pop ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left'>"
                        +"Overig"
                        + "<input data-cacheval='false' type='radio' name='radio-choice' id='radio-choice-3' value='choice-3'>"
                        +"</label>"
                    +"</form>"
                    + "<div onclick='c.closingPopup()' class='ui-green mc-text-center'><a class='ui-btn ui-corner-all ui-shadow ui-btn-b mc-top-margin-1-5' data-disabled='false'>Bevestig</a></div>"
                 + "</div>"
            +"</div>"
        + "</div>";
        $("#footer").after(popup);

        $("#infop").hide();
        $("#info-popup").hide();
    }

    closePopup()
    {
        $(".ui-resize").animate({height:'70vh'});
        $(".visibility" ).remove();
        $("#reden-screen").remove();
        $("#reden-popup").remove();
    }

    closeInfoPopup() 
    {
      $("#infop").remove();
      $("#info-popup").remove();
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
