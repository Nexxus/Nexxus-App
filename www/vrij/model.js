class VrijModel
{
    constructor(controller, loginc) 
    {
        this.url        = userConfig.api;
        this.token      = sessionStorage.getItem("token");

        this.storeTasks();

        this.c          = controller;
        this.loginc     = loginc;
    }

    /**
     * Saves tasks in session upon success
     */
    requestTasks(status, item)
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
            "data":{"item":item},
            "statusCode": {
                401: function (response) { // token expired
                    this.model.loginc.handleLogout();
                    this.model.loginc.redirectToLogin();
                }
            },
            success: function(data)
            {
                if(data==undefined)
                { 
                    data = 0;
                }
                this.model.loadTasks(true, data, item, 0)

            },
            error: function() {

            }
        });
    }


    loadTasks(callback, data, item, status) 
    {
        if(callback) {
            sessionStorage.setItem(item, data);

            this.concatTasks();
        } else {
            this.requestTasks(status, item);
        }
    }
    
    storeTasks()
    {
        this.loadTasks(false, false, "offeredTasks",  2);
        this.loadTasks(false, false, "acceptedTasks", 300);
        
        return true;
    }

    // combines both tasks into AllTasks if both are set
    concatTasks()
    {
        var offered  = this.getSessionData("offeredTasks");
        var accepted = this.getSessionData("acceptedTasks");

        if(offered!=null && accepted!=null)
        {
            var allTasks = [];
            allTasks = allTasks.concat(offered, accepted);
        }


        sessionStorage.setItem("allTasks", JSON.stringify(allTasks));
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
            },
            error: function() {

            }
        });
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
}