import './styles/index.css'; 
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import jordanImage from './images/jordan.jpg';


const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
];

const container = document.querySelector('.container');
const template = document.querySelector('#template').content.cloneNode(true);


  container.append(template);
