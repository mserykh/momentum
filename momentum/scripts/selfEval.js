console.log(`Самооценка 128 / 160  \n
Итого 128 \n
\n
Дополнительный функционал на выбор +10
[+] ToDo List - список дел +10 (cписок остается открытым, если до перезагрузки он был открыт, это состояние сохранятся в localStorage)
[+] Сохранение в LocalStorage выбранный источник получения фото
Часы и календарь +15
  [+] время выводится в 24-часовом формате +5
  [+] время обновляется каждую секунду - часы идут, (время не дёргается) +5
  [+] выводится день недели, число, месяц, например: "Sunday, May 16" +5
\n
Приветствие +10
  [+] текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5
  [+] пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется в local storage +5
\n
Смена фонового изображения +20
  [+] ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5
  [+] изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.
  [+] изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5
  [+] изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5
  [+] при смене слайдов важно обеспечить плавную смену фоновых изображений +5
  \n
Виджет погоды +15
  [+] город по умолчанию - Минск, пока пользователь не ввёл другой город
  [+] при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5
  [+] для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API
  [+] данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5
  [+] выводится уведомление об ошибке при вводе некорректных значений (пустая строка или бессмысленный набор символов) +5
  \n
Виджет цитата дня +10
  [+] при загрузке страницы приложения отображается рандомная цитата и её автор +5
  [+] при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5
  \n
Аудиоплеер +15 
  [+] при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3
  [+] при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3
  [+] треки можно пролистывать кнопками Play-next и Play-prev
  [+] реки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3
  [+] трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3
  [+] после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3
  [+] плейлист генерируется средствами JavaScript (в ходе кросс-чека этот пункт не проверяется)
  \n
Продвинутый аудиоплеер (реализуется без использования библиотек) +20
  [+] добавлен прогресс-бар в котором отображается прогресс проигрывания +3
  [+] при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека +3
  [+] над прогресс-баром отображается название трека +3
  [+] отображается текущее и общее время воспроизведения трека +3
  [+] есть кнопка звука при клике по которой можно включить/отключить звук +2
  [+] добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука +3
  [+] можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3
  \n
Получение фонового изображения от API +10 
  [+] в качестве источника изображений может использоваться Unsplash API +5
  [+] в качестве источника изображений может использоваться Flickr API +5
  \n
Настройки приложения +3
  [+] в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API +3
`);