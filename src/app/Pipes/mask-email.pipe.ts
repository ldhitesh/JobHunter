import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskEmail',
    standalone: false
})
export class MaskEmailPipe implements PipeTransform {

  transform(value: string,Role:string): string {
    if (!value) return value;
    if (Role=="Admin") {
      return value;
    }
    const atIndex = value.indexOf('@');

    if (atIndex !== -1) {
      const maskedPart = '*'.repeat(atIndex); 
      const domainPart = value.slice(atIndex); 

      return maskedPart + domainPart;
    }

    return value;
  }

}
