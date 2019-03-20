class FinalizeModel 
{
    constructor(controller) 
    {
        this.url = userConfig.api;
        this.token = sessionStorage.getItem("token");
    
        this.c = controller;

        this.tasks = [];
        this.productTypes = [];

        this.acceptedTasks = JSON.parse(sessionStorage.getItem("acceptedTasks"));

        this.current = 1;
    }

    getFinalItem() 
    {
        return sessionStorage.getItem("finalitem");
    }

    /**
     * Calls API to set order status to done.
     */
    setOrderStatusDone(id) 
    {
        $.ajax({
            async: true,
            crossDomain: true,
            model: this,
            id: id,
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
            statusCode: {
                401: function (response) { // token expired
                    this.model.c.loginc.handleLogout();
                    this.model.c.loginc.redirectToLogin();
                }
            },
            success: function(data) 
            {
                console.log(this.id);
                console.log("Order #"+this.id+" successfully submit!");
                console.log(this.model.acceptedTasks);
                this.model.c.submitForm(this.id, true);
            },
            error: function(xhr) {
                console.log("Order #"+this.id+" submit failed. Error: "+xhr.status);
            }
        });
    }

    /**
     * Send image to API and bind it to an attribute
     */
    postImageToApi(id, blob)
    {
        var form = new FormData();
        form.append("productId" , id);
        form.append("attributeId", "4");
        form.append("attachment", blob);

        $.ajax({
            async: true,
            model: this,
            url:
                this.url +
                "/purchaseorderstatus?bearer=" +
                this.token,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: form,
            success: function(data) 
            {

            },
            error: function(xhr) {

            }
        });

    }

    setOrderProductQuantity(order, productId, quantity)
    {
        var orderId = order['id'];
        var orderIndex = this.getIndexById(orderId);
        var productIndex = this.getPindexFromOrderById(orderId, productId);
        var pid = this.acceptedTasks[orderIndex]['product_relations'][productIndex]['product']['id'];

        this.acceptedTasks[orderIndex]['product_relations'][productIndex]['quantity'] = quantity;
        this.setOrderProductQuantityApi(this.acceptedTasks[orderIndex]['id'], pid, quantity);
    }

    /**
     * Calls AJAX to adjust product quantities in Nexxus 
     */ 
    setOrderProductQuantityApi(id, pid, quantity)
    {
        $.ajax({
            async: true,
            crossDomain: true,
            model: this,
            order: [id, pid, quantity],
            url:
                this.url +
                "/purchaseorderquantity"
                + "?bearer=" + this.token
                + "&purchaseOrderId=" + id
                + "&productId=" + pid 
                + "&quantity=" + quantity,
            method: "PUT",
            headers: {},
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            statusCode: {
                401: function (response) { // token expired
                    this.model.c.loginc.handleLogout();
                    this.model.c.loginc.redirectToLogin();
                }
            },
            success: function(data, textStatus, xhr) 
            {
                console.log("Order #" + id + " Product #" + pid + " Status #" + xhr.status +": " + xhr.statusText);

            },
            error: function(xhr) {
                console.log("[setQuantityApi] API request failed");
            }
        });
    }

    /**
     * Adjusts the product quantities in orders in both the local variable and online.
     */
    adjustProductQuantities(id)
    {
        var currentOrder = this.getOrderById(id);
        var orderId = currentOrder['id'];

        var orderIndex = this.getIndexById(orderId);

        var products = this.getProductsFromOrder(id);

        // get from values and adjust them in the obj arr
        for(var i=0; i < products.length; i++)
        {
            var input = $("#afrond-quantity-" + products[i]['id']).val();

            this.setOrderProductQuantity(currentOrder, products[i]['id'], input);
        }
    }
    
    /**
     * Find an order by Order#
     */
    getOrderById(id)
    {
        var tasks = this.acceptedTasks;
        var needle = -1;

        for(var i=0;i<tasks.length;i++)
        {
            if(tasks[i]['id'] == id)
            {
                needle = tasks[i];
            }
        }

        return needle;
    }

    /**
     * Find an order by array index
     */
    getOrderByIndex(id)
    {
        return this.acceptedTasks[id];
    }

    /**
     * Get the index of an order by ID
     */
    getIndexById(id)
    {
        var tasks = this.acceptedTasks;
        var needle = -1;

        for(var index=0;index<tasks.length;index++)
        {
            if(tasks[index]['id'] == id)
            {
                needle = index;
            }
        }

        return needle;
    }
  

    /**
     * Retrieve the corresponding products from an order (by ID)
     */
    getProductsFromOrder(id)
    {
        var order = this.getOrderById(id);
        
        return order['product_relations'];
    }

    /**
     * Retrieve a specific product from an order by OrderID and ProductID
     */
    getPindexFromOrderById(id, pid)
    {
        var products = this.getProductsFromOrder(id);
        console.log("[OrderById()] Getting product #"+pid+" from order #"+id+".."); 

        var needle = -1;

        for(var i=0;i<products.length;i++)
        {
            if(products[i]['id'] == pid)
            {
                needle = i;
            }
        }

        return needle;

    }

    getNamesFromProducts(products)
    {
        var names = [];

        for(var i=0;i<products.length;i++)
        {
            names[i] = products[i]['product']['name'];
        }

        return names;
    }

    /** 
     * Returns the number of the current task
     */
    getCurrentTask() 
    {
        return this.current;
    }
  
    /** 
     * Returns an array with the details about the current task
     */
    getTasks() 
    {
        return this.tasks;
    }
}
