import moment from 'moment'

export const formatDate = (dateString: string) => {

    const date = new Date(dateString);
    const formattedDate = moment(date).format('DD-MM-YYYY');

    return formattedDate
  }