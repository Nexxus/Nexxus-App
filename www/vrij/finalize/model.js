class FinalizeModel {
  constructor(controller) {
    this.url = userConfig.api;
    this.token = sessionStorage.getItem("token");

    this.c = controller;

    this.taken = [];
    this.huidige = 1;
    this.createDummy();
  }

  getFinalItem() {
    return sessionStorage.getItem("finalitem");
  }

  setOrderStatusDone(id) {
    $.ajax({
      async: true,
      crossDomain: true,
      model: this,
      url:
        this.url +
        "/purchaseorderstatus?bearer=" +
        this.token +
        "&purchaseOrderId=" +
        id +
        "&statusId=3",
      method: "PUT",
      headers: {},
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
      success: function(data) {
        console.log(this.model);
        this.model.c.submitForm(true);
      },
      error: function() {}
    });
  }

  //dummy content om door te lopen in het wiel
  createDummy() {
    for (var x = 1; x <= 3; x++) {
      this.taken[x] = [x];
      for (var y = 0; y < 3; y++) {
        this.taken[x][y] = 0;
      }
    }

    this.taken[1][1] = "breedstraat 128";
    this.taken[1][2] = "2543";
    this.taken[1][3] = "29-2-2019";
    this.taken[1][4] = "13";
    this.taken[1][5] = "12:00";
    this.taken[1][6] = "jan";
    this.taken[1][7] = "06876543";

    this.taken[2][1] = "sirtemastraat 177";
    this.taken[2][2] = "2544";
    this.taken[2][3] = "28-3-2019";
    this.taken[2][4] = "15";
    this.taken[2][5] = "13:00";
    this.taken[2][6] = "jan";
    this.taken[2][7] = "06876542";

    this.taken[3][1] = "zwaardvegersgaarde";
    this.taken[3][2] = "2445";
    this.taken[3][3] = "27-4-2019";
    this.taken[3][4] = "17";
    this.taken[3][5] = "14:00";
    this.taken[3][6] = "jan";
    this.taken[3][7] = "06876541";
  }

  getCurrentTask() {
    return this.huidige;
  }

  getTasks() {
    return this.taken;
  }

  setNextTask() {
    if (this.huidige < this.taken.length - 1) {
      this.huidige++;
    } else {
      window.open("vrij.html", "_self");
    }
  }
  /*submitFinalizeForm(status)
    {

        switch(status)
        {
            case 100:
                // send images
                var form = new FormData();
                form.append("productId", 0);
                form.append("attributeId", 0);
                form.append("attachment", "");

                $.ajax({
                    "url": this.url + "/productattachment?bearer=" +this.token,
                    "method": "POST",
                    "headers": {},
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "model": this,
                    "data": form,
                    success: function(data)
                    {
                        this.submitFinalizeForm(200);
                    },
                    error: function() {

                    }
                });
                break;
            case 200: // on callback success, change order status
                break;
            case 404:
            default:
                break;
        }
    }*/
}
