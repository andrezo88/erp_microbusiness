import httpStatus from 'http-status';
export function errorHandler(identifier: string, error: any) {
 console.error(identifier, error?.response?.data || error);

 let errorMessage = error?.message;

 const errorCode = error?.response?.data?.code;
 const errorDescription =
  error?.response?.data?.msg ||
  error?.response?.data?.message ||
  error?.response?.data ||
  error?.response;

 if (error?.response && error.response.data) {
  errorMessage = String(errorCode || errorDescription);
 }

 return {
  status:
   error?.status ||
   error?.response?.data.status ||
   httpStatus.INTERNAL_SERVER_ERROR,
  message:
   (error?.status === httpStatus.UNPROCESSABLE_ENTITY
    ? errorMessage
    : errorMessage
   ),
  detail: error?.detail || (errorCode ? errorDescription : undefined),
 };
}