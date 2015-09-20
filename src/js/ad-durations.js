import $ from 'jquery-browserify';

const LEADING_ZERO_REGEX = /^[0]+/g;
const DURATION_REGEX = /(\d{1,2}):(\d{1,2})/;
const DURATION_SELECTOR = '.ytp-time-duration';

function durationPartToNumber(part) {
  // First, trim leading zeroes
  part = part.replace(LEADING_ZERO_REGEX, '');
  // Next, parse it into an int
  return parseInt(part) || 0;
}

export function getDurationInSeconds() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const intervalRef = setInterval(() => {
      // Give up
      if (attempts >= 10) return resolve(1000);

      let $duration = $(DURATION_SELECTOR);
      if ($duration.length > 0) {
        let durationText = $duration.text();
        let match = DURATION_REGEX.exec(durationText);
        if (match) {
          let duration = (durationPartToNumber(match[1]) * 60) + (durationPartToNumber(match[2]));
          if (duration > 0) {
            clearInterval();
            console.log(duration);
            return resolve(duration);
          } else {
            attempts++;
          }
        }
      }
    }, 100);
  });
}
