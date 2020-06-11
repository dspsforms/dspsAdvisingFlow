import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  result;

  constructor() { }

  ngOnInit() {
  }

  test() {
    this.testLiteral(123);

    let obj = {};
    obj['a1'] = 1;
    obj['a2'] = "x";

    let obj2 = {};

    obj2['b1'] = 'y1';
    obj2['b2'] = 'y2';

    obj['a3'] = obj2;

    // let obj3 = {};
    // obj3['c1'] = 'z1';
    // obj3['c2'] = 'z2';

    // obj2['b3'] = obj3;

    this.result = this.stuff(obj, 1);

  }


  /* for each property in form (and recursively), add {version: 1}
        so if foo: val
        change to foo: [ { data: val, version: 1} ]

        if foo == {...} 
        foo: [ { data: {...}, version: 1 } ]
    */
  
  stuff(node, version: number) {
    let foo = {};

    if (this.isLeaf(node)) {
      return  [{ data: node, version: version }];
    }
    // else {
    //   foo[node] = {};
    // }
    
    Object.keys(node).forEach(field => {
      foo[field] = this.stuff(node[field], version);
    });

    return foo;
  }

  // modifyValueObj(parent, key, result, version: number) {

  //   const val = parent[key];
  //   if (typeof val === "string" || typeof val === "number" ||
  //     typeof val === "boolean") {
      
  //     result[key] =  [{ data: val, version: version }];
        
  //   }
  //   else {
      
  //     Object.keys(key).forEach(field => {
  //       const childTree = {};
  //       this.modifyValueObj(key, field, childTree, version);

  //       // add childTree to result
  //       result[key] = childTree;
  //     });
      
      
  //   }
  //   // Object.keys(node).forEach(field => {
  //   //   const val = node.get(field);
  //   //   if (val instanceof Object) {
  //   //     // recurse down the tree
  //   //     const children = this.modifyValueObj(val);
  //   //   } else if (control instanceof FormGroup) {
  //   //     // recurse down the tree
  //   //     this.initVal(control, data[field]); 
  //   //   }
  //   // });
    
  // }

  isLeaf(node) {
    if (typeof node === "string" || typeof node === "number" ||
      typeof node === "boolean") {
      return true;
    } else {
      return false;
    }
  }
  
  testLiteral(node) {

    if (typeof node === "string" || typeof node === "number" ||
      typeof node === "boolean") {
    
      this.result = node + " is a literal";
      console.log(node, " is a lieral");
      
    }
    else {
      this.result = node + " is NOT a literal";
      console.log(node, " is NOT a lieral");
    
    }
  }
  
}
