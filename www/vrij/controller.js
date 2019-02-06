class VrijController 
{
  constructor(loginc) {
    this.m = new VrijModel(this, loginc);
    this.v = new VrijView();

    this.offeredTasks = [];
    this.acceptedTasks = [];

    this.currentList = "offered";
  }

  reloadTasklist(callback) 
  {
    // request tasks
    if (!callback) {
      this.m.loadTasks(false, 0);
    } else {
      this.m.storeAllTasks();
      this.loadList();
    }
  }

  loadList() 
  {
    console.log("Loading list..");
    this.renderTaskList();
  }

  /**
   * Renders main page with tasks from current location
   */
  renderTaskList() 
  {
    this.v.showHeader("#header");
    this.v.showFooter("#footer");

    $("#content").html("");
    $("#content").append("<div id='tasklist-accepteerde'>");
    $("#content").append("<div id='tasklist-aangeboden'>");

    this.v.showTasklist(
      "#tasklist-accepteerde",
      "Geaccepteerde taken",
      this.acceptedTasks,
      true
    );
    this.v.showTasklist(
      "#tasklist-aangeboden",
      "Aangeboden Taken",
      this.offeredTasks,
      false
    );
    this.dropdownSlide("#tasklist-aangeboden");
  }

  postAcceptedTask(id, callback) 
  {
    if (!callback) {
      this.m.sendAcceptTask(id);
    } else {
      this.currentList = "accepted";
      this.reloadTasklist(false);
    }
  }

  renderPopupTask(id) 
  {
    var task = this.m.getTaskInfo(id);

    this.v.showPopupTask("#order-current", task);
  }

  sendToFinalForm(id) 
  {
    sessionStorage.setItem("finalitem", id);
    window.open("vrij_finalize.html", "_self");
  }

  closingPopup() 
  {
    this.v.closePopup();
  }

  closeInfoPopup() 
  {
    this.v.closeInfoPopup();
  }

  renderRefuse() 
  {
    this.v.renderRefuse();
  }

  renderCancel() 
  {
    this.v.renderCancel();
  }

  renderAccept() 
  {
    this.renderAcceptedTaskList();
  }

  dropdownSlide(div) 
  {
    this.v.dropdownSlideToggle(div);
  }
}
