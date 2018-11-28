class Model
{
    constructor(controller) 
    {
        this.url        = "http://copiatek.com/application/api";
        this.getPorder  = "/purchaseorders/1?bearer=";
        this.token      = sessionStorage.getItem("token");

        this.c          = controller;
    }

    getTasksFromLoc()
    {
        // get orders
        $.ajax({
            "async": true,
            "crossDomain": true,
            "model": this,
            "url": this.url + this.getPorder + this.token,
            "method": "GET",
            "headers": {},
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            success: function(data)
            {

                // store data
                this.model.setTasks(JSON.parse(data));

                // return
                this.model.c.retrieveTasks();
            },
            error: function() {

            }
        });

    }

    setTasks(array)
    {
        sessionStorage.setItem("tasks", JSON.stringify(array));

        return 0;
    }

    getTasks()
    {
        return JSON.parse(sessionStorage.getItem("tasks"));
    }

    storeTaskSession(data)
    {
        var result = JSON.parse(data);

        return result;

    }
    
    /**
     * Returns task by ID (array) 
     */
    getTaskInfo(id)
    {
        var tasks = this.getTasks();

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

    getTasksAccepted()
    {

    }

    parseDateFromTimestamp(ts)
    {
        return ts.substring(0,ts.indexOf('T'));
    }

    parseTimeFromTimestamp(ts)
    {
        return ts.substring(ts.indexOf('T'));
    }
}
