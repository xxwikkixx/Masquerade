const TWO_MINUTES = ['hey.mp4','moonmen.mp4'];
const ONE_MINUTE = ['pokemon.mp4', 'nigel.mp4', 'shaq.mp4', 'doge.mp4', 'band.mp4', 'baseball.mp4','movie.mp4'];
const UNDER_50 = ['shaq.mp4','icecream.mp4','nigel.mp4', 'store.mp4', 'schwifty.mp4', 'duck.mp4', 'gi-joe-meme.mp4', 'band.mp4', 'baseball.mp4', 'movie.mp4', 'adele.mp4','schwifty.mp4','duck.mp4', 'dog.mp4'];

let counter = Math.floor(Math.random() * 100000);

export function video(time) {
    counter++;
    if (time >= 100) {
        return TWO_MINUTES[counter % TWO_MINUTES.length];
    }else if (time >= 50 ) {
        return ONE_MINUTE[counter % ONE_MINUTE.length];
    }else if (time >= 30) {
        return UNDER_50[counter % UNDER_50.length];
    }else {
        return UNDER_50[counter % UNDER_50.length];
    }
}
