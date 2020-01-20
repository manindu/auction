import moment from 'moment';
import countdown from 'moment-countdown';
import Toast from 'react-native-root-toast';

export const getRemainingTime = endDate => {
  return moment()
    .countdown(
      endDate,
      countdown.DAYS ||
        countdown.HOURS ||
        countdown.MINUTES ||
        countdown.SECONDS,
      NaN,
      4,
    )
    .toString();
};

export const showToast = message => {
  return Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

export const addCommaToNumber = currency => {
  if (!currency && currency !== 0) return '';
  if (currency === 0) return 0;

  const str = currency.toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  return str.join('.');
};

export const getBidAmount = (userBids, itemId) => {
  const item = userBids.find(bid => bid.itemId === itemId);
  if (item) {
    return item.bid;
  }
  return 0;
};
