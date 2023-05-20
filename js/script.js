let form = document.forms.list;
let mainArr = []; 
fetch('https://dummyjson.com/users')
   .then(res => res.json())
   .then(data => create(data.users, false, {}));
form.onsubmit = (e) => {
   e.preventDefault();
   let b = true;
   let obj = {};
   let fm = new FormData(form);
   fm.forEach((value, key) => {
      if (value.length > 0) {
         obj[key] = value
      } else {
         b = false;
      }
   })
   if (b) {
      obj.id = Math.random();
      let bj = Object.assign({}, obj)
      fetch('https://dummyjson.com/users').then(res => res.json()).then(data => create(data.users, true, false, bj))
   }
   obj = {};
}

function create(arr, b, fact, bj) {
   if (fact) {
      mainArr = [];
      mainArr = mainArr.concat([], arr);
   }
   if (b) {
      mainArr.push(bj);
   }
   let doc = document;
   let box = doc.querySelectorAll('.box');
   let items = doc.querySelectorAll('.item');
   items.forEach(item => {
      item.remove();
   })
   for (let i of mainArr) {
      let item = doc.createElement('div');
      let title = doc.createElement('div');
      let info = doc.createElement('div');
      let text = doc.createElement('div');
      let numder = doc.createElement('div');
      let title_box = doc.createElement('div');
      let button = doc.createElement('button');
      //style
      button.classList.add('item__button')
      title_box.classList.add('title-box');
      item.classList.add('item');
      title.classList.add('item__title');
      info.classList.add('item__info');
      text.classList.add('item__text');
      numder.classList.add('item__num');
      //inner
      button.innerText = 'Удалить';
      text.innerText = 'Возраст';
      numder.innerText = i.age;
      title.innerText = i.firstName;
      //append
      title_box.append(title, button);
      info.append(text, numder);
      item.append(title_box, info);
      box.forEach(el => {
         if (i.age <= 25 && +el.getAttribute('data-filter_age') === 25) {
            el.append(item);
         } else if (25 < i.age && i.age <= 50 && +el.getAttribute('data-filter_age') === 50) {
            el.append(item);
         } else if (i.age > 50 && el.getAttribute('data-filter_age') === 'infinety') {
            el.append(item);
         }
      })
      button.onclick = () => {
         let c = confirm('Удалить?');
         if (c) {
            fetch(`https://dummyjson.com/users/${i.id}`, { method: 'delete' })
               .then(res => {
                  let arr_one = mainArr.filter(el => el.id !== i.id);
                  create(arr_one, false, true, {});
               })
         }
      }
   }
}
