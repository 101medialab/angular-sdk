export default class Debounce {
    private timer = 0;

    run(callback, ms) {
        clearTimeout(this.timer);

        this.timer = setTimeout(callback, ms);
    }
}