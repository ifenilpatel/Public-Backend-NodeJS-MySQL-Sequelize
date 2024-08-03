class ApiResponse {
    constructor(flag, code, message, data) {
        this.flag = flag;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

module.exports = { ApiResponse };
