export const setUserSession = (userId) => {
    localStorage.setItem('userId', userId);
  };
  
  export const getUserSession = () => {
    return localStorage.getItem('userId');
  };
  
  export const clearUserSession = () => {
    localStorage.removeItem('userId');
  };
  