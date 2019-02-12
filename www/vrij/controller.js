class VrijController
{
    constructor(loginc) 
    {
        this.m = new VrijModel(this, loginc);
        this.v = new VrijView();

        this.offeredTasks = [];
        this.acceptedTasks = [];
    }

    reloadTasklist(callback)
    {
        // request tasks
        if(!callback) 
        {
            this.m.loadTasks(false, 0);
        }
        else
        {
            this.m.storeAllTasks();
            this.loadList();
        }
    }

    loadList()
    {
        console.log("Loading list..");
        this.renderTaskList()
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

        this.v.showTasklist('#tasklist-accepteerde', 'Geaccepteerde taken', this.acceptedTasks, false);
        this.v.showTasklist('#tasklist-aangeboden',  'Aangeboden Taken',    this.offeredTasks, false);
        this.dropdownSlide('#tasklist-aangeboden');
    }

    /**
     * Refreshes lists without re-rendering the entire page
     */
    refreshTasklist()
    {
        this.v.refreshTasklist("#tasklist-accepteerde", this.acceptedTasks);
        this.v.refreshTasklist("#tasklist-aangeboden", this.offeredTasks);

    }

    postAcceptedTask(id, callback)
    {
        if(!callback)
        {
            this.m.sendAcceptTask(id);
        } else 
        {
            this.reloadTasklist(false);
        }

    }

    acceptAllTasks()
    {
        for(var i=0; i<this.offeredTasks.length; i++)
        {
            console.log('Accepting task #' + this.offeredTasks[i]['id'] + '...');
            this.postAcceptedTask(this.offeredTasks[i]['id']);
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
        window.open('vrij_finalize.html', '_self');
    }

    renderAcceptBulkPopup()
    {
        this.v.renderAcceptPrompt();
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
        this.v.renderRefuse()
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
