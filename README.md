# 3D-model
Создание 3d-models с помощью программы на Tree.js и HTML
## Содержание

0. [Введение](#chapter-i)
1. [Создание HTML файла](#chapter-i)
2.  [Создание JSON и Webpack файлов](#chapter-iii) 
3. [Создание JS файла](#chapter-ii) \
    2.1. [Information](#information) \
    3.1. [Part 1](#part-1-реализация-функции-библиотеки-s21_matrix_ooph)
## Введение
Проект, который мы будем сегодня реализовывать имеет несколько практических сосотавляющих:\
    - Научиться базывам принципам работы с библиотекой three.js;\
    - Возможность конвертировать картинки разных форматов в 3d визуал.
   
## Создание HTML файла
--- Так как мы создаем проект именно для взаимодействия с браузными серверами, первое, с чего мы начинаем наш проект, это создание нашего html файла и пропишем в нем: \
    1) пути к необходимым файлам;\
    2) ```canvas``` — это HTML-элемент, который используется для рисования графики с помощью JavaScript; \
    3) тег ```input```, необходимый для выбора интересующей пользователя картинки.


```<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="lab.css" rel="stylesheet">
    <title>3D-Project</title>
</head>
<body>
    <canvas id="myscene"></canvas>
    <input type="file" id="fileInput" accept="image/*">
    <script type="module" src="./lab.js"></script>
</body>
</html>
```
