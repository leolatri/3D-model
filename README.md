# 3D-model
Создание 3d-models с помощью программы на Tree.js и HTML
## Содержание

0. [Введение](#chapter-i)
1. [Создание HTML файла](#chapter-i)
2.  [Создание JSON и Webpack файлов](#chapter-iii) 
3. [Создание JS файла](#chapter-ii) <br> 
    2.1. [Information](#information) <br> 
    3.1. [Part 1](#part-1-реализация-функции-библиотеки-s21_matrix_ooph)<br> 
## Введение
Проект, который мы будем сегодня реализовывать имеет несколько практических сосотавляющих:
   > - Научиться базывам принципам работы с библиотекой three.js;
   > - Возможность конвертировать картинки разных форматов в 3d визуал.

## Создание HTML файла
 Так как мы создаем проект именно в качестве веб-приложения, нам необходимо создать html файл и прописать в нем: 
   > 1) пути к дополнительным ресурсам (файлам);
   > 2) ```canvas``` — это HTML-элемент, который используется для рисования графики с помощью JavaScript; 
   > 3) тег ```input```, необходимый для выбора интересующей пользователя картинки.
 
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

### Создание JSON и Webpack файлов
Начнем с того, что такое файл JSON. <br><br> 
Файл package.json используется в проектах на JavaScript для управления зависимостями, скриптами и метаданными проекта. Он обычно создается в корневой директории вашего проекта и содержит информацию о проекте, а также о необходимых пакетах и командах для его сборки и запуска.<br><br> 
Для начала установите Node.js, если у вас его еще нет, а так же установим ```webpack``` (чуть позже он нам пригодится). Команда для macOS:<br>
```brew install node``` <br>
```npm install --save-dev webpack webpack-cli``` <br>
После этого мы запускаем команду ```npm init -y```, которая создает нам файл json с базывыми настройками. <br> 
После, мы меняем содержимое файла на это: 
```{
    "name": "lab",
    "version": "1.0.0",
    "scripts": {
        "start": "webpack serve --open",
        "build": "webpack"
    },
    "devDependencies": {
        "html-webpack-plugin": "^5.6.2",
        "three": "^0.169.0",
        "webpack": "^5.95.0",
        "webpack-cli": "^5.1.4",
        "webpack-dev-server": "^5.1.0"
    }
}
```
