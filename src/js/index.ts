import '../assets/scss/app.scss';
import {Car} from './Car'

//Lazyloading for Loadash

// import _ from 'lodash'

// console.log(
//   _.join(['Another', 'module', 'loaded!'], ' ')
// );


const car:Car = new Car();
car.go();

document.getElementById('button').addEventListener('click', ()=>{
  console.log('==============');
  console.log('button clicked');
  console.log('==============');

 

// import('lodash').then((_)=>{
//   console.log(
//     _.join(['Yes', ' I am : ', ' importing loadash dynamicly !'], ' ')
//   );

// })
  

import(/* webpackChunkName: "print" */ './print').then(module => {
      const print = module.default;
  
       print();
     });


})