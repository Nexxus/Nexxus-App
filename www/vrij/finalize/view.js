class FinalizeView {
  constructor(taken) {}
  //ryan zijn code
  showCurrentTask(huidige, laatste, taak) {
    //title
    var currentTask =
      "<h3 style=margin:0;margin-left:2vw; margin-top:1vh;> Taak " +
      huidige +
      "/" +
      laatste +
      " </h3>";

    //Details huidige taak
    currentTask +=
      "<table id='info' data-role='table' class='ui-responsive table-stroke ui-table ui-table-reflow'>" +
      "<tbody >" +
      "<tr>" +
      "<td id='stad' ><b > Postcode: </b></td><td class='ui-width'>" +
      taak[huidige][2] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      " <td id='straat'><b class='ui-table-cell-label' > Straat: </b></td>" +
      "<td class='ui-width'>" +
      taak[huidige][1] +
      "</td>" +
      "</tr>" +
      "<tr> " +
      "<td id='datum'><b class='ui-table-cell-label' > Datum: </b></td>" +
      "<td class='ui-width'>" +
      taak[huidige][3] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td id='wat'><b class='ui-table-cell-label' > Hoeveelheid: </b></td>" +
      "<td class='ui-width'>" +
      taak[huidige][4] +
      "</td>" +
      "</tr>" +
      "<tr><td id='tijd'><b class='ui-table-cell-label'> Tijd: </b></td>" +
      "<td class='ui-width'>" +
      taak[huidige][5] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td id='contact'><b class='ui-table-cell-label' > Contact: </b></td>" +
      "<td class='ui-width'>" +
      taak[huidige][6] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td id='tel'><b class='ui-table-cell-label' > Telefoon: </b></td>" +
      "<td class='ui-width'>" +
      taak[huidige][7] +
      "</td>" +
      "</tr>" +
      "</tbody>" +
      "</table> ";
    //opties taak annuleren of afronden
    currentTask +=
      "<div class='ui-center'>" +
      "<a onClick='c.renderAccept()' data-rel='popup' data-transition='pop' data-position-to='window' id='btn-submit' class='ui-btn ui-options ui-rood'>Annuleren  <img src='include/css/images/icons-png/delete-white.png'></a>" +
      "<a onClick='c.renderCancel()' class='ui-btn ui-options ui-green'>Afronden <img src='include/css/images/icons-png/check-white.png'></a></div>";

    $("#content").html(currentTask);
  }

  showWheel(huidige, taken) {
    $("#wheel").remove();
    $(".ui-center").after("<div id='wheel'></div>");

    if (huidige > 1) {
      $("#wheel").append(
        "<p class='vorige'>" +
          (huidige - 1) +
          ". " +
          taken[huidige - 1][1] +
          "</p>"
      );
    } else {
      $("#wheel").append(
        "<p class='vorige'>0. Je hebt nog geen taken voltooit</p>"
      );
    }

    if (huidige > 1 || huidige < taken.length) {
      $("#wheel").append(
        "<p class='huidige'>" + huidige + ". " + taken[huidige][1] + "</p>"
      );
    }
    if (huidige < taken.length - 1) {
      $("#wheel").append(
        "<p class='hierna'>" +
          (huidige + 1) +
          ". " +
          taken[huidige + 1][1] +
          "</p>"
      );
    } else {
      $("#wheel").append("<p class='hierna'> Je hebt al je taken voltooid</p>");
    }
  }
  showQuantityForm() {
    $("#quantity-form").show();
    $("#photo-form").hide();
  }

  showPhotoForm() {
    $("#quantity-form").hide();

    // add images according to amount

    var quantity = $("#itemQuantity").val();

    if (quantity > 999) {
      quantity = 999;
    }

    var htmlphoto = "";

    for (var i = 0; i < quantity; i++) {
      var imageOption = "";
      imageOption += "<td><div class='image-upload'>";
      imageOption += "<label for='file-input-" + i + "'>";
      imageOption += "<h4>Foto #" + (i + 1) + "</h4>";
      imageOption +=
        "<img id='file-input-img-" +
        i +
        "' src='include/img/plus.png' class='ui-plus' max-width='50%' />";
      imageOption += "</label>";

      imageOption +=
        "<input id='file-input-" +
        i +
        "' class='photo-input' type='file' onChange='c.v.changePhotoIconToSolved(" +
        i +
        ")' />";
      imageOption += "</div></td>";

      switch (i % 2) {
        case 0:
          imageOption = "<tr>" + imageOption;
          break;
        case 1:
          imageOption = imageOption + "</tr>";
          break;
      }
      htmlphoto += imageOption;
    }
    $("#photo-icons").html(htmlphoto);

    $("#photo-form").fadeIn();
  }

  changePhotoIconToSolved(i) {
    // check if file is an image
    var allowed_types = ["image/jpg", "image/jpeg", "image/png", "image/bmp"];

    var img = $("#file-input-" + i).prop("files");
    var imgtype = img[0]["type"];

    if (allowed_types.indexOf(imgtype) >= 0) {
      $("#file-input-img-" + i).attr("src", "include/img/checkmark.png");
    } else {
      $("#file-input-img-" + i).attr("src", "include/img/crossmark.png");
    }
  }
}
