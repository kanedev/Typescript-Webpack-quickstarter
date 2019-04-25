import '../assets/scss/app.scss';
import {Car} from './Car'
import _ from 'lodash'

console.log(
  _.join(['Another', 'test 2  : ', 'loadash + cache + spliting code !'], ' ')
);


const car:Car = new Car();
car.go();

