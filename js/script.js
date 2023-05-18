let form = document.forms.list;
let arr = [
   {
      name: 'lorem',
      age: 16
   },
   {
      name: 'lorem',
      age: 28
   },
   {
      name: 'lorem',
      age: 64
   }
];
form.onsubmit = (e) => {
   e.preventDefault();
   let b = true;
   let obj = {}
   let fm = new FormData(form);
   fm.forEach((value, key) => {
      if (value.length > 0) {
         obj[key] = value
      } else {
         b = false;
      }
   })
   if (b) {
      arr.push(obj);
      create(arr);
   }
   obj = {};
}
function create(arr) {
   let doc = document;
   let box = doc.querySelectorAll('.box');
   let items = doc.querySelectorAll('.item');
   items.forEach(item => {
      item.remove();
   })
   for (let i of arr) {
      let item = doc.createElement('div');
      let title = doc.createElement('div');
      let info = doc.createElement('div');
      let text = doc.createElement('div');
      let numder = doc.createElement('div');
      //style
      item.classList.add('item');
      title.classList.add('item__title');
      info.classList.add('item__info');
      text.classList.add('item__text');
      numder.classList.add('item__num');
      //inner
      text.innerText = 'Возраст';
      numder.innerText = i.age;
      title.innerText = i.name;
      //append
      info.append(text, numder);
      item.append(title, info);
      box.forEach(el => {
         if (i.age <= 25 && +el.getAttribute('data-filter_age') === 25) {
            el.append(item);
         } else if (25 < i.age && i.age <= 50 && +el.getAttribute('data-filter_age') === 50) {
            el.append(item);
         } else if (i.age > 50 && el.getAttribute('data-filter_age') === 'infinety') {
            el.append(item);
         }
      })
   }
}

create(arr)