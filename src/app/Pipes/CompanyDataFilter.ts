import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'companyDataFilter',
    standalone: false
})
export class CompanyDataFilterPipe implements PipeTransform {

  transform(value: any, identifier:any) {
      if(identifier=='description'){
        return value.length > 60 ? value.substring(0, 80) + '...' : value;
      }
      else if(identifier=='status'){
        return value === 0 ? 'Not Applied' : value;
      }
      else if(identifier=='lastapplied'){     
        value===null||value.length==0||''?'Yet to Apply':value;
        return value
      }
      else if(identifier=='link'){
        return value.length > 80 ? value.substring(0, 80) + '...' : value;
      }
      else if(identifier=='morethanweek'){

        if(value.lastapplied=='Yet to Apply')
          value.status='Not Applied';        
        return value;

      }
    
  }

}
