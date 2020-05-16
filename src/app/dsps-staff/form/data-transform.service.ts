import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataTransformService {

  constructor() { }

  initDataOnCreate(form: FormGroup, version: number) {
    
    /*
    convert form.value which may be of the form
      name1: value1
      obj2: {
        name21: value21,
        name22 : value22
      }
      ...

      to

      name1: [ { val : value1 , version: 1} ]
      obj2: {
        name21: [ { val: value21, version: 1 } ]
        name22: [ { val: value22, version: 1 } ]
      }
    */
    
    const result = this.stuff(form.value, version);
    console.log(result);
    return result;

  }

  stuff(node, version: number) {
    let foo = {};

    if (this.isLeaf(node)) {
      return  [{ val: node, version: version }];
    }
    
    Object.keys(node).forEach(field => {
      foo[field] = this.stuff(node[field], version);
    });

    return foo;
  }

  isLeaf(node) {
    if (!node || typeof node === "string" || typeof node === "number" ||
      typeof node === "boolean") {
      return true;
    } else {
      return false;
    }
  }
}
