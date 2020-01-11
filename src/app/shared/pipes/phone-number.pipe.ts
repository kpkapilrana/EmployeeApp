import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string) {
    const pattern = /^[0-9]*$/;
    let temp;
    if (pattern.test(value)) {
        temp = value;
      } else {
        temp = 'NA';
      }
    return temp;
  }

}
