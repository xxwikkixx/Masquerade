const TWO_MINUTES = ['hey.mp4','moonmen.mp4'];
const ONE_MINUTE = ['pokemon.mp4', 'nigel.mp4'];
const UNDER_50 = ['nigel.mp4', 'store.mp4', 'schifty.mp4', 'duck.mp4'];
const UNDER_20 = ['Adele.mp4','schifty.mp4','duck.mp4'];

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function video(time) {
    if (time >= 100) {
        return TWO_MINUTES[rand(0, TWO_MINUTES.length - 1)];
    }else if (time >= 50 ) {
        return ONE_MINUTE[rand(0, ONE_MINUTE.length - 1)];
    }else if (time >= 30) {
        return UNDER_50[rand(0, UNDER_50.length - 1)];
    }else {
        return UNDER_20[rand(0, UNDER_20.length - 1)];
    }
}
