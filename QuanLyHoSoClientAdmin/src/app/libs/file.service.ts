import { Injectable } from '@angular/core';
import { of as observableOf, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class FileService {
    constructor(
    ) { }

    public getEncodeFromImage(fileUpload: File) {
        if (fileUpload) {
            let reader: FileReader = new FileReader();
            reader.readAsDataURL(fileUpload);
            return fromEvent(reader, 'load').pipe(
                map((e) => {
                    let result = null;
                    let tmp: any = reader.result;
                    let baseCode = tmp.substring(tmp.indexOf('base64,', 0) + 7);
                    result = fileUpload.name + ';' + fileUpload.size + ';' + baseCode;
                    return result;
                })
            );
        } else {
            return observableOf(null);
        }
    }

    public getEncodeFromImages(fileUpload: File[]) {
        return new Promise((resolve, reject) => {
            if (fileUpload) {
                let pms = [];
                for (let i = 0; i < fileUpload.length; i++) {
                    pms.push(this.readFile(fileUpload[i]));
                }

                Promise.all(pms)
                    .then(data => {
                        resolve(data);
                    });
            } else {
                resolve([]);
            }
        });
    }

    public readFile(file: File) {
        return new Promise((resolve, reject) => {
            let reader: FileReader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                let result = null;
                let tmp: any = reader.result;
                let baseCode = tmp.substring(tmp.indexOf('base64,', 0) + 7);
                result = file.name + ';' + file.size + ';' + baseCode;
                resolve(result);
            };

            reader.onerror = error => reject(null);
        })
    }
}