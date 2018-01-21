exports.STATUS_CODE = {
    SERVER_ERROR : {
        CODE : 500,
        STATUS : "Server Error",
        MESSAGE : "Some error occured in server"
    },
    DB_ERROR : {
        CODE : 500,
        STATUS : "Database Error",
        MESSAGE : "Some error occured in the database"
    },
    INSUFFICIENT_PARAMS : {
        CODE : 400,
        STATUS : "Bad request",
        MESSAGE : "Insufficient parameters"
    },
    MOVIE_NOT_FOUND : {
        CODE : 401,
        STATUS : "Not found",
        MESSAGE : "No such movie found. Please check again"
    }
};