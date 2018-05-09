//object structure for response
function Response() {
    //////////////////////
    this.success = 0;
    this.error = 0;
    this.responseCode = 0;
    this.inputs = {};
    this.message = '';
    this.response = {
        data: [],
        dataLength: 0,
        dataType: ''
    }
    //////////////////////
}

exports.sendJson = function (req, res, statusCode, message, data) {

    //response object initialization
    let resp = new Response();

    //query parameters
    if (req.query) {
        resp.inputs.query = req.query;
    }

    //body parameters
    if (req.body) {
        resp.inputs.body = req.body;
    }

    //request method
    resp.inputs.requestMethod = req.method;

    if (data) {
        if (data.length != undefined) {
            resp.response.data = data;
            resp.response.dataType = 'array';
            resp.response.dataLength = data.length;
        } else {
            resp.response.data = data;
            resp.response.dataType = 'object';
        }
    } else {
        resp.response.data = null;
        resp.response.dataType = null;
        resp.response.dataLength = null;
    }

    if (statusCode) {
        res.status(statusCode); //setting status code of request
        switch (statusCode) {
            case 200:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "OK";
                else resp.message = message;
                break;
            case 201:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "CREATED";
                else resp.message = message;
                break;
            case 202:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "ACCEPTED";
                else resp.message = message;
                break;
            case 204:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "NO CONTENT";
                else resp.message = message;
                break;
            case 205:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "RESET CONTENT";
                else resp.message = message;
                break;
            case 206: //Partial content
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "PARTIAL CONTENT";
                else resp.message = message;
                break;
            case 400: //Partial content
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "Bad Request";
                else resp.message = message;
                break;
            case 401:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "Unauthorized";
                else resp.message = message;
                break;
            case 404:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "Not Found";
                else resp.message = message;
                break;
            case 500:
                resp.success = 1;
                resp.error = 0;
                if (!message) resp.message = "Internal Server Error";
                else resp.message = message;
                break;
        }
    }

    return res.json(resp);
}