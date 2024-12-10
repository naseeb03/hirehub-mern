// Utility function to send a successful response
export const sendSuccess = (res, data = {}, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      ...data, // Spread the data object to avoid unnecessary nesting
    });
  };
  
// Utility function to send an error response
export const sendError = (res, message = 'Internal server error', statusCode = 500) => {
res.status(statusCode).json({
    success: false,
    message,
});
};