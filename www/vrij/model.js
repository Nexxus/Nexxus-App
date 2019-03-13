class VrijModel
{
    constructor(controller, loginc) 
    {
        this.url        = userConfig.api;
        this.token      = sessionStorage.getItem("token");

        this.offeredId  = userConfig.offeredId; 
        this.acceptedId = userConfig.acceptedId;

        this.c          = controller;
        this.loginc     = loginc;
    }

    loadTasks(callback, step)
    {
        if(!callback)
        {
            this.requestTasklist(2)
            //console.log("Request made..");
        }
        else if (callback && step==1)
        {
            this.requestTasklist(300);
            //console.log("Offered callback success");
        }
        else if (callback && step==2)
        {
            //console.log("Accepted callback success");
            this.c.reloadTasklist(true);
        }
    }

    /**
     * Saves tasks in session upon success
     */
    requestTasklist(status)
    {
        // get orders
        $.ajax({
            "async": true,
            "crossDomain": true,
            "model": this,
            "url": this.url + "/purchaseorders/" + status + "?bearer=" +this.token,
            "method": "GET",
            "headers": {},
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data":{"status":status},
            "statusCode": {
                401: function (response) { // token expired
                    this.model.loginc.handleLogout();
                    this.model.loginc.redirectToLogin();
                }
            },
            success: function(data)
            {
                if(data==undefined) data = 0;

                switch(status) {
                    case 2:   // offered
                        this.model.c.offeredTasks = JSON.parse(data);
                        this.model.loadTasks(true, 1);
                        break;
                    case 300: // accepted
                        this.model.c.acceptedTasks = JSON.parse(data);
                        this.model.loadTasks(true, 2);
                        break;
                    default:
                        return false;
                }
            },
            error: function() {

            }
        });
    }

    // stores all tasks in two seperate and one combined session item
    storeAllTasks()
    {
        var offered = this.c.offeredTasks;
        var accepted = this.c.acceptedTasks;

        // combine all tasks
        var allTasks = [];
        if(offered!=null && accepted!=null)
        {
            allTasks = allTasks.concat(offered, accepted);
        }

        sessionStorage.setItem("offeredTasks",  JSON.stringify(offered));
        sessionStorage.setItem("acceptedTasks", JSON.stringify(accepted));
        sessionStorage.setItem("allTasks",      JSON.stringify(allTasks));
    }

    getSessionData(item)
    {
        var item = sessionStorage.getItem(item);

        if(item != "undefined") 
        {
            return JSON.parse(item);
        }
        else {
            return 0;
        }
    }

    getOfferedTasks()
    {
        var tasks = this.getSessionData("offeredTasks");

        return tasks;
    }

    getAcceptedTasks()
    {
        var tasks = this.getSessionData("acceptedTasks");

        return tasks;
    }

    getAllTasks()
    {
        var tasks = this.getSessionData("allTasks");

        return tasks;
    }

    sendAcceptTask(id)
    {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "model": this,
            "url": this.url + "/purchaseorderstatus?bearer=" +this.token
                    + "&purchaseOrderId=" + id 
                    + "&statusId=300",
            "method": "PUT",
            "headers": {},
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            success: function(data)
            {
                this.model.c.postAcceptedTask(0, true);
                console.log("Task #"+id+" accepted");
            },
            error: function() {

            }
        });
    }

    /**
     * Returns task by ID (array) 
     */
    getTaskInfo(id)
    {
        var tasks = this.getAllTasks();

        var task = "";

        for(var i=0; i < tasks.length; i++)
        {
            if(tasks[i]['id']==id)
            {
                 task = tasks[i];
            }
        }
        return task;
    }

}
