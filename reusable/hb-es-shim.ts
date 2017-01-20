import {JsExtend} from 'ngSDK/reusable/JsExtend';

new JsExtend({
    Array: {
        prototype: {
            prepend: function (elem) {
                this.unshift(elem);
            },
            contains: function (value) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === value) return true;
                }
                return false;
            },
            unique: function () {
                var arr = [];
                for (var i = 0; i < this.length; i++) {
                    if (!arr.contains(this[i])) {
                        arr.push(this[i]);
                    }
                }
                return arr;
            }
        }
    },

    Math: {
        slope: function (h, w) {
            if (typeof h === 'object') {
                if ('width' in h && 'height' in h) {
                    return h.height / h.width;
                } else {
                    throw new Exception('Math.ratio: First Argument has type of Object yet attribute(s) [\'height\', \'width\'] are either or both missing.', h);
                }
            }

            return h / w;
        }
    },

    String: {
        prototype: {
            capitalize: function () {
                return this.charAt(0).toUpperCase() + this.slice(1);
            },
            toSnakecase: function () {
                return this.replace(/([A-Z]+)/g, "_$1").toLowerCase();
            },
            toTitlecase: function () {
                return this.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() + ' ';
                }).trim();
            },
            slugify: function () {
                return this.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }
        }
    },

    // Shim for Safari not supporting to construct Date object from ISO8601 formatted string
    Date: {
        fromISO: (function () {
            var sampleTimeString = '2011-11-24T09:00:27+0200';
            // Chrome
            var testingTimestamp = Date.parse(sampleTimeString);
            if (testingTimestamp === 1322118027000)
                return function (input) {
                    return new Date(Date.parse(input));
                };

            // JS 1.8 gecko
            var noOffset = function (input) {
                if (input instanceof Date) {
                    return input.getTime();
                }

                var day = input.slice(0, -5).split(/\D/).map(function (item) {
                    return parseInt(item, 10) || 0;
                });

                day[1] -= 1;
                day = new Date(Date.UTC.apply(Date, day));
                var offsetString = input.slice(-5),
                    offset = parseInt(offsetString, 10) / 100;

                if (offsetString.slice(0, 1) == "+") {
                    offset *= -1
                }

                day.setHours(day.getHours() + offset);

                return day.getTime();
            };

            if (noOffset(sampleTimeString) === 1322118027000) {
                return noOffset;
            }

            return function (input) {
                var day, timezone,
                    regExp = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/,

                    splitted = regExp.exec(input) || [];
                if (splitted[1]) {
                    day = splitted[1].split(/\D/).map(function (itm) {
                        return parseInt(itm, 10) || 0;
                    });
                    day[1] -= 1;
                    day = new Date(Date.UTC.apply(Date, day));
                    if (!day.getDate()) return NaN;
                    if (splitted[5]) {
                        timezone = parseInt(splitted[5], 10) / 100 * 60;
                        if (splitted[6]) timezone += parseInt(splitted[6], 10);
                        if (splitted[4] == "+") timezone *= -1;
                        if (timezone) day.setUTCMinutes(day.getUTCMinutes() + timezone);
                    }
                    return day;
                }
                return NaN;
            }
        })(),
        now: function () {
            return new Date().getTime();
        },
        prototype: {
            yyyymmdd: function (separator) {
                var yyyy = this.getFullYear().toString(),
                    mm = (this.getMonth() + 1).toString(),
                    dd = this.getDate().toString();
                return yyyy + separator + (mm[1] ? mm : "0" + mm[0]) + separator + (dd[1] ? dd : "0" + dd[0]);
            }
        }
    },
});
