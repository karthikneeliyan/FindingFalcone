import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planetSelectorCallback'
})
export class PlanetSelectorCallbackPipe implements PipeTransform {

  transform(values: any[],selectedPlanets:any,val:any, ...args: unknown[]): any[] {
    let planets=selectedPlanets.filter((pl:any)=>pl!==val)
    return values.filter(v =>!planets.includes(v.name));
  }

}
