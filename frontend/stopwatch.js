class Stopwatch {
    element;
    interval_id;

    start_timestamp;
    milliseconds_past;

    hours;
    minutes;
    seconds;

    constructor(element) {
        this.element = element;
    }

    format_time_number(number) {
        number = number.toString();
        return parseInt(number) <= 9 ? `0${number}` : number;
    }

    update_time() {
        let now = new Date().getTime();
        this.milliseconds_past = now - this.start_timestamp;

        let seconds_past = this.milliseconds_past / 1000;

        this.hours = Math.floor(seconds_past / 3600);
        seconds_past -= this.hours * 3600;
        this.minutes = Math.floor(seconds_past / 60);
        seconds_past -= this.minutes * 60;
        this.seconds = Math.floor(seconds_past);
    }

    update_element_text() {
        let hours = this.format_time_number(this.hours);
        let minutes = this.format_time_number(this.minutes);
        let seconds = this.format_time_number(this.seconds);

        let time = `${hours}:${minutes}:${seconds}`;

        this.element.innerHTML = time;
    }

    start() {
        this.start_timestamp = new Date().getTime();

        this.interval_id = setInterval(() => {
            this.update_time();
            this.update_element_text();
        }, 10);
    }

    stop() {
        clearInterval(this.interval_id);
    }
}
