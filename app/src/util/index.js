import moment from 'moment';

export const formatCurrency = (num) => {
  return `$${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
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

export function groupDatesIntoRanges(dates) {
  const groupedRanges = [];

  for (let i = 0; i < dates?.length; i += 2) {
    const startDate = dates[i];
    const endDate = dates[i + 1];

    if (endDate === undefined) {
      groupedRanges.push([startDate, startDate]);
    } else {
      groupedRanges.push([startDate, endDate]);
    }
  }
  return groupedRanges;
}

export function formatDateRange(startDate, endDate) {
  const formatSingleDate = (date) => {
    return typeof date === 'string' ? date : date?.format('YYYY/MM/DD');
  };

  const formattedStartDate = formatSingleDate(startDate);
  const formattedEndDate = formatSingleDate(endDate);

  if (formattedStartDate === formattedEndDate) {
    return formattedStartDate;
  }

  return `${formattedStartDate}-${formattedEndDate}`;
}

export const formatTimestampToDate = (timestamp) => {
  const ts = Number(timestamp);
  const dateObj = ts > 1000000000000 ? new Date(ts) : new Date(ts * 1000);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};
