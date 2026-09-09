export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    let status = err.statusCode || err.status || 500;
    if (err.name === "ValidationError" || err.name === "CastError") status = 400;
    if (err.code === 11000) status = 409;

    if (status >= 500) console.error(err);
    const message = status >= 500
        ? "Server error"
        : err.code === 11000 ? "Resource already exists" : err.message;
    res.status(status).json({ message });
}
