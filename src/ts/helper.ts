import moment from 'moment'

// converts a given date string i.e. 
// 01 January, 1970 00:00:00 Universal Time (UTC)
// into a string representing just the date i.e. 01-01-1970
export const formatDate = (dateString: string) => {

  const date = new Date(dateString);
  const formattedDate = moment(date).format('DD-MM-YYYY');

  return formattedDate
}