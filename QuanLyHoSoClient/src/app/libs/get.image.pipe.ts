import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment'

@Pipe({ name: 'getImage' })
export class GetImagePipe implements PipeTransform {

    transform(name: string) {
        if(!name) {
            return environment.urlImg + "spinner.gif";
        }
        return environment.urlImg + name;
    }
}