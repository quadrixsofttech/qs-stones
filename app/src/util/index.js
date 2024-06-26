import moment from 'moment';

export const formatCurrency = (num) => {
  return `$${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const showDateRangesAsString = (range) => {
  var formattedDates = '';
  range.forEach((dateRange) => {
    const startDate = moment(parseInt(dateRange[0]));
    const endDate = moment(parseInt(dateRange[1]));

    const formattedStartDate = startDate.format('YYYY/MM/DD');
    const formattedEndDate = endDate.format('YYYY/MM/DD');

    const formattedDate = `${formattedStartDate}-${formattedEndDate}; `;
    formattedDates += formattedDate;
  });
  return formattedDates;
};
