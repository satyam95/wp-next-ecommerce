export const daysAgo = (dateString: string): string => {
    const reviewDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - reviewDate.getTime();
  
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(daysDifference / 365);
  
    if (daysDifference < 1) {
      return 'Today';
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else if (daysDifference < 30) {
      return `${daysDifference} days ago`;
    } else if (monthsDifference < 12) {
      return `${monthsDifference} months ago`;
    } else {
      return `${yearsDifference} years ago`;
    }
};
