import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyDataFilter'
})
export class CompanyDataFilterPipe implements PipeTransform {

  transform(value: any, identifier:any) {
      if(identifier=='description'){
        return value.length > 80 ? value.substring(0, 80) + '...' : value;
      }
      else if(identifier=='status'){
        return value === 0 ? 'Not Applied' : value;
      }
      else if(identifier=='lastapplied'){        
        return value===null?'Yet to Apply':value;
      }
    
  }

}
