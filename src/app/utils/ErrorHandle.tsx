export const handleFetchBaseQueryError = (error) => {
  if (error.status === 401) {
    console.error('Unauthorized access - possibly redirect to login');
  } else if (error.status === 403) {
    console.error('Forbidden access');
  } else if (error.status === 500) {
    console.error('Server error');
  } else {
    console.error('Unknown error', error);
  }

  throw error;

}