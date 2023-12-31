export function timeSince(timeStamp) {
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + 's ago';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + 'm ago';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + 'h ago';
    }
    if (secondsPast <= (2 * 86400)) {
        return '1 day ago';
      }
    if (secondsPast > (2 * 86400)) {
      var day = timeStamp.getDate();
      var month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      var year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
      return day + " " + month + year;
    }
  }