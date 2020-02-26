# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse

def index(request):
  return render(request, 'index.html')

def send_carpet_form(request):
  if request.method == 'POST':
    count = 1
    message = ''

    while(request.POST.get(str(count) + '-size-w')):
      message += ('Тип: ' + request.POST.get(str(count) + '-type'))
      message += (', Размер: ' + request.POST.get(str(count) + '-size-w') + 'X' + request.POST.get(str(count) + '-size-h'))
      message += (', Количество: ' + request.POST.get(str(count) + '-amount'))
      message += '\n'

      count += 1

    message += ('\nДанные заказчика:\n')
    message += ('Имя: ' + request.POST.get('name') + ' Телефон: ' + request.POST.get('phone') + ' E-mail: ' + request.POST.get('email'))

    send_mail(
      u'Заказ грязезащитных ковров',
      message,
      'russian.memento@gmail.com',
      ['info@palev.ru']
    )

    return HttpResponse(
      json.dumps({'result': 'OK', 'message': message}),
      content_type="application/json"
    )