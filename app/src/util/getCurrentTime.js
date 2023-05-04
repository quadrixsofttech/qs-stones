export const getCurrentDateTime = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
  
    const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}`;
  
    return formattedDateTime;
  };