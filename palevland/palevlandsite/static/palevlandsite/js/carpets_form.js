(function() {
  let carpets = 1;

  window.addEventListener('load', function() {
    addEvents(document.querySelector('#carpet-1'));
    document.querySelector('#carpet-form__add-more').addEventListener('click', addCarpet);
    document.querySelector('#carpet-form').addEventListener('submit', submitForm);
  });

  function calcPrice(e) {
    var el = e.target.closest('.carpet-form__carpet');

    var width = el.querySelector('.carpet-form__cm-w').value,
        length = el.querySelector('.carpet-form__cm-h').value,
        type_mul = el.querySelector('input[value="York"]').checked == true ? 687 : 795,
        amount = el.querySelector('.carpet-form__amount').value;

    el.querySelector('.carpet-form__carpet-total').innerHTML = Math.round(Number((width * length) / 10000 * type_mul * amount));
    calcTotal();
  }

  function calcTotal() {
    var prices = document.querySelectorAll('.carpet-form__carpet-total'),
        sum = 0;

    for(var i=0; i < prices.length; i++) {
      sum += Number(prices[i].innerHTML);
    }

    document.querySelector('#carpet-form__total').innerHTML = sum;
  }

  function addCarpet(e) {
    e.preventDefault();
    carpets++;

    e.target.insertAdjacentHTML('beforebegin', 
    '<div class="carpet-form__carpet" id="carpet-' + carpets + '">' +
    '<div>' +
    '<span>Выбор типа покрытия</span>' +
    '<label>' +
    '<input class="carpet-form__type" name="' + carpets +'-type" type="radio" checked="checked" value="York">' +
    '<span>York</span>' +
    '</label>' +
    '<label>' +
    '<input class="carpet-form__type" name="' + carpets +'-type" type="radio" value="NovaNop">' +
    '<span>Nova Nop</span>' +
    '</label>' +
    '</div>' +
    '<div class="carp-size">' +
    '<p>Размер ковра</p>' +
    '<input class="carpet-form__cm-w" name="' + carpets +'-size-w" type="text" placeholder="см" required><span> X </span><input class="carpet-form__cm-h" name="' + carpets + '-size-h" type="text" placeholder="см" required>' +
    '</div>' +
    '<div class="carp-amount">' +
    '<p>Количество</p>' +
    '<input class="carpet-form__amount" name="' + carpets + '-amount" type="number" min="1" value="1">' +
    '</div>' +
    '<p>Итого в месяц: <span class="carpet-form__carpet-total" id="' + carpets + '-total">0</span>р</p>' +
    '</div>'
    )

    addEvents(document.querySelector('#carpet-' + carpets));
  }

  function addEvents(el) {
    var widths = el.querySelectorAll('.carpet-form__cm-w'),
    heights = el.querySelectorAll('.carpet-form__cm-h'),
    types = el.querySelectorAll('.carpet-form__type'),
    amounts = el.querySelectorAll('.carpet-form__amount');

    for(var i=0; i < widths.length; i++) {
    widths[i].addEventListener('change', calcPrice);
    }

    for(var i=0; i < heights.length; i++) {
    heights[i].addEventListener('change', calcPrice);
    }

    for(var i=0; i < types.length; i++) {
    types[i].addEventListener('change', calcPrice);
    }

    for(var i=0; i < amounts.length; i++) {
    amounts[i].addEventListener('change', calcPrice);
    }
  }

  function submitForm(e) {
    e.preventDefault();

    if(e.target.querySelector('.carpet-form__submit').classList.contains('inactive')) {
      return;
    }

    let data = new FormData(document.querySelector('#carpet-form'));
    e.target.querySelector('.carpet-form__submit').classList.add('inactive');

    fetch('/send_carpet_form/', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': document.querySelector('input[name="csrfmiddlewaretoken"]').value
      },
      body: data
    })
      .then(function(response) {
        response.json()
          .then(function(result) {
            alert('Заказ успешно отправлен!');
            e.target.querySelector('.carpet-form__submit').classList.remove('inactive');
            window.location.replace('/');
          })
          .catch(function(err) {
            alert('Произошла ошибка сервера. Пожалуйста, попробуйте позже.');
            e.target.querySelector('.carpet-form__submit').classList.remove('inactive');
          })

      })
  }
})()