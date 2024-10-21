# 3D-model
Создание 3d-models с помощью программы на Tree.js и HTML
## Содержание

0. [Введение](#chapter-i)
1. [Создание HTML файла](#chapter-i)
2.  [Создание JSON и Webpack файлов](#chapter-iii) 
3. [Создание JS файла](#chapter-ii) <br> 
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
Для начала установите Node.js, если у вас его еще нет, а так же установим ```webpack``` (чуть позже он нам пригодится). Команда для macOS:<br><br>
```brew install node``` <br>
```npm install --save-dev webpack webpack-cli``` <br><br>
После этого мы запускаем команду ```npm init -y```, которая создает нам файл json с базывыми настройками. <br> 
После, мы меняем содержимое файла на это: 
```{
    "name": "название вашего файла",
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
<br>
Чтобы создать файл конфигурации для Webpack, вам нужно создать файл с именем webpack.config.js в корневой директории вашего проекта. Этот файл будет содержать настройки, которые Webpack будет использовать для сборки вашего проекта. 

``` const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './lab.js', // Указывает входной файл для сборки
    output: {
        filename: 'lab.js', // Имя выходного файла
        path: path.resolve(__dirname, 'dist'), // Путь к выходной директории
        clean: true, // Очищает выходную директорию перед каждой сборкой
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Указывает директорию для статических файлов
        },
        open: true, // Автоматически открывает браузер при запуске сервера
        port: 8080, // Порт, на котором будет запущен сервер
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './lab.html', // Шаблон HTML-файла
        }),
    ],
    mode: 'development', // Режим сборки (development или production)
};
```
### Создание JS файла
Как вы уже поняли из прошлого блока, нам необходимо создать файл ```lab.js```. 
Для начала рекомендую в принуипе ознакомиться с библиотекой Three.js на официальном сайте ```https://threejs.org```. Там прекрасно описаны основные "3 кита Three.js" и есть каталог со всеми необходимыми методами. <br><br>
Я постараюсь кратко описать всю структуру и математику проекта, поэтому опишу основной алгоритм выполнения: <br>
    <br><br> 1) Необходимо скачать библиотеку ```three``` так же через brew;
    <br><br> 2) Импортируем все из этой библиотеки (это уже прописываем в файле) ```import * as THREE from 'three';```;
    <br><br> 3) Для возможности манипулировать в дальнейшем картинкой (вращать ее), прописываем : ```import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';```
    <br><br> 4) Создаем необходимый золст, где будет проецироваться 3d-фигура:
    ```let canvas = document.getElementById('myscene');
let width = 1400;
let height = 800;```
    <br><br> 5) Создаем экземпляр рендринка, задавая ему значение холста и сглаживания (для 3d графики очень важный аспект).
    <br><br> 6) Устанавливаем соотношение пикселей с помощью метода ```setPixelRatio``` ( возвращает коэффициент пикселей устройства. Если он больше 1 (что означает, что устройство имеет высокое разрешение), мы устанавливаем соотношение пикселей в 2, иначе — в 1.). Потом задаем размеры холста и его цвет
    <br><br> 7) Затем создаем сцену и устанавливаем камеру (это базовые настройки, которые можно корректировать в зависимости от ваших предпочтений, поэтому расписывать это не буду)
    <br><br> 8) Чтобы в дальнейшем не добавлять по одному элементу на сцену, я создам группу, которая будет хранить в себе все элементы моего рисования (далее это поможет при вращении и перемещении всего объекта в целом) ```let group = new THREE.Group()```;
    <br><br> 9) Далее идет основная часть этого приложения - рисование. В этом блоке мы обращаемся к элементу ```input``` и задаем ему функцию с собитием нажатия, при котором он будет запускать по факту весь функционал нашей программы. <br><br>
    Распишу это немного подробнее.  <br><br>
    Для начала мы создаем переменную которая будет используется для получения первого файла, выбранного пользователем через элемент <input type="file"> в HTML.<br><br>
    После того, как мы убедились, что файл не пустой, мы начинаем отрисовку:
``` reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                let canvas2d = document.createElement('canvas');
                let ctx = canvas2d.getContext('2d');
                canvas2d.width = 200;
                canvas2d.height = 200;

                ctx.drawImage(img, 0, 0, 200, 200);
                let size = 200;
                let data = ctx.getImageData(0, 0, size, size).data;

                group.clear();

                for (let i = 0; i < size; ++i) {
                    let geometry = new THREE.BufferGeometry();
                    let vertices = new Float32Array(size * 3);
                    let colors = new Float32Array(size * 3); 

                    for (let j = 0; j < size; ++j) {
                        let colorIndex = (j * size + i) * 4; 
                        let r = data[colorIndex] / 255; 
                        let g = data[colorIndex + 1] / 255; 
                        let b = data[colorIndex + 2] / 255;

                        vertices[j * 3] = j - 100; 
                        vertices[j * 3 + 1] = i - 100; 
                        vertices[j * 3 + 2] = data[colorIndex] / 10; 

                        colors[j * 3] = r;
                        colors[j * 3 + 1] = g; 
                        colors[j * 3 + 2] = b; 
                    }

                    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
                    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

                    let material = new THREE.LineBasicMaterial({ vertexColors: true });
                    let line = new THREE.Line(geometry, material);
                    group.add(line);
                }
            };
```
            
