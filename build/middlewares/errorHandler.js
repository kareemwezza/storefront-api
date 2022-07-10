"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomeError = void 0;
class CustomeError extends Error {
    constructor(message, statusCode) {
        super();
        this.statusCode = statusCode || 501;
        this.message =
            message ||
                "Internal Server Error Occured! We are sorry for this inconvenience 😢. Please Try again later.";
    }
}
exports.CustomeError = CustomeError;
exports.default = (error, req, res, next) => {
    let err = error;
    if (!(err instanceof CustomeError)) {
        err = new CustomeError(err.message, 501);
    }
    return res.status(err.statusCode).json(err);
};
