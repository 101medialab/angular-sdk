import {Pipe} from "@angular/core";

@Pipe({
    name: 'mapToIterable'
})
export class MapToIterable {
    transform(object: Object): Array {
        var result = [];

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                result.push({key, val: object[key]});
            }
        }

        return result;
    }
}