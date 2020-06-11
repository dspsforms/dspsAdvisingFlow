import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataTransformService {

  constructor() { }

  initDataOnCreate(
    form: FormGroup,
    version: number,
    completedByUserId: string,
    now: Date,
    mode: 'array' | 'noarray') {
    
    /*
    convert form.value which may be of the form
      name1: value1
      obj2: {
        name21: value21,
        name22 : value22
      }
      ...

      to

      name1: [ { val : value1 , version: 1, usedId: ..., date: now} ]
      obj2: {
        name21: [ { val: value21, version: 1, userId: ..., date: now } ]
        name22: [ { val: value22, version: 1 , userId: ..., date: now } ]
      }

       return the leaf node as array or without the array, depending on mode

    */
    
    const result = this.initVersionRecursive(
      form.value,
      version,
      completedByUserId,
      now,
      mode);
    
    console.log(result);
    return result;

  }

  /*
    return the leaf node as array or without the array, depending on mode
  */
  // 
  initVersionRecursive(
    node,
    version: number,
    userId: string,
    now: Date,
    mode: 'array' | 'noarray')
  {
    let foo = {};

    if (this.isLeaf(node)) {
      if (mode === 'array') {
        return  [{ val: node, version: version, userId: userId, date: now }];
      } else {
        return  { val: node, version: version, userId: userId, date: now };
      }
      
    }
    
    Object.keys(node).forEach(field => {
      foo[field] =
        this.initVersionRecursive(node[field], version, userId, now, mode);
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
