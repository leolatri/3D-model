<h1>Векторизация с помощью Three.js</h1>
Векторизация с помощью Three.js Преобразование ростового изображения в векторное изображение Tree.js и HTML (ознакомиться с полным кордом можно по ссылке  <a href="https://github.com/leolatri/3D-model">на мой репозиторий</a> )
## Содержание

- [Введение](#введение)
- [Работа с Node.js](#работа-с-nodejs)
- [Создание HTML файла](#создание-html-файла)
- [Создание package.json и webpack файлов](#создание-packagejson-и-webpack-файлов)
- [Создание JS файла](#создание-js-файла)
## Введение
Проект, который мы будем сегодня реализовывать имеет несколько практических составляющих:
   > - Научиться базовым принципам работы с библиотекой three.js;
   > - Возможность преобразовывать картинки разных форматов в векторное изображение.


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
## Работа с Node.js
Node.js — это среда выполнения JavaScript, построенная на движке V8 от Google Chrome. Она позволяет запускать JavaScript на сервере, что делает возможным создание серверных приложений с использованием JavaScript. Node.js использует неблокирующую, асинхронную модель ввода-вывода, что позволяет обрабатывать множество соединений одновременно, что делает его особенно подходящим для создания высокопроизводительных сетевых приложений. <br>
Для скачивания и установки Node.js, выполните следующие команды:<br>
>1) Для Ubuntu/Linux:
```
sudo apt install nodejs npm
```
>2) На Windows вы можете установить Node.js с помощью пакетного менеджера Chocolatey.
 Если у вас его еще нет, выполните следующие шаги: <br>
 Установите Chocolatey: <br>
 Откройте командную строку с правами администратора (нажмите Win, введите cmd, щелкните правой кнопкой мыши и выберите «Запуск от имени администратора»). <br>
Вставьте следующую команду и нажмите Enter:<br>
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```
После установки Chocolatey в той же командной строке выполните:<br>
```
choco install nodejs
```
> 3) Для MacOS:<br>
```
brew install node
```
Дождитесь завершения установки и идем дальше.

## Создание package.json и webpack файлов
Начнем с того, что такое файл package.json.<br>
 Файл package.json используется в проектах на JavaScript для управления зависимостями, скриптами и метаданными проекта. Он обычно создается в корневой директории нашего проекта и содержит информацию о проекте, а также о необходимых пакетах и командах для его сборки и запуска.<br>
После установки Node.js, мы запускаем команду `npm init -y`, которая создает нам файл package.json с базовыми настройками.
После, мы меняем содержимое файла на это: 
```
{
    "name": "название нашего файла",
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

Теперь разберем, что такое Webpack.<br>
Webpack — это мощный инструмент для сборки модулей JavaScript, который позволяет разработчикам управлять зависимостями и оптимизировать ресурсы для веб-приложений. Он используется для объединения различных файлов (JavaScript, CSS, изображения и т.д.) в один или несколько выходных файлов, которые могут быть загружены в браузере. <br>
 Чтобы создать файл конфигурации для Webpack, нам нужно создать файл с именем webpack.config.js в корневой директории нашего проекта. Этот файл будет содержать настройки, которые Webpack будет использовать для сборки.<br>
```
const path = require('path');
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
Для начала, рекомендую в принципе ознакомиться с библиотекой Three.js на официальном сайте ```https://threejs.org```. Там прекрасно описаны основные "3 кита Three.js" и есть каталог со всеми необходимыми методами. <br><br>
Я постараюсь кратко описать основной алгоритм выполнения:<br>
> 1) Необходимо скачать библиотеку ```three``` :<br>
Чтобы установить библиотеку three.js на разных операционных системах (macOS, Windows и Linux), вы можете использовать пакетный менеджер npm, который идет в комплекте с Node.js.:
```
npm install three
```
> 2) Импортируем все из этой библиотеки (это уже прописываем в файле):
 ```
import * as THREE from 'three';
```
> 3) Для возможности манипулировать в дальнейшем картинкой (вращать ее), прописываем : 
```
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
```
> 4) Создаем необходимый холст, где будет проецироваться 3d-фигура:
```
let canvas = document.getElementById('myscene');
let width = 1400;
let height = 800;
```

> 5) Создаем экземпляр рендеринга, задавая ему значение холста и сглаживания;
> 6) Устанавливаем соотношение пикселей с помощью метода:
```
setPixelRatio
```
( возвращает коэффициент пикселей устройства. Если он больше 1 (что означает, что устройство имеет высокое разрешение), мы устанавливаем соотношение пикселей в 2, иначе — в 1.). Потом задаем размеры холста и его цвет.
> 7) Затем создаем сцену и устанавливаем камеру (это базовые настройки, которые можно корректировать в зависимости от наших предпочтений, поэтому расписывать это не буду)
> 8) Чтобы в дальнейшем не добавлять по одному элементу на сцену, я создам группу, которая будет хранить в себе все элементы моего рисования (далее это поможет при вращении и перемещении всего объекта в целом):
```
let group = new THREE.Group();
```
> 9) Далее идет основная часть этого приложения - рисование. В этом блоке мы обращаемся к элементу `input` и задаем ему функцию с собsтием нажатия, при котором он будет запускать по факту весь функционал нашей программы. <br>
    Распишу это немного подробнее.  <br>
    Для начала мы создаем переменную, которая будет использоваться для получения первого файла, выбранного пользователем через элемент `<input type="file">` в HTML.<br>
    После того, как мы убедились, что файл не пустой, мы начинаем отрисовку: <br>
> 1) Создание объекта изображения:
```const img = new Image();```
Здесь создается новый объект Image, который будет использоваться для загрузки изображения.
> 2) Обработчик события onload:

```
img.onload = function() {
    // Код внутри этой функции выполнится, когда изображение будет загружено
};
``` 
Этот обработчик срабатывает, когда изображение успешно загружено. Внутри него будет выполняться основной код для обработки изображения.

> 12) Создание канваса и контекста:

```
let canvas2d = document.createElement('canvas');
let ctx = canvas2d.getContext('2d');
canvas2d.width = 200;
canvas2d.height = 200;
```
Здесь создается временный элемент <canvas>, который используется для рисования изображения в 2D. Устанавливаются размеры канваса на 200x200 пикселей.
> 13) Рисование изображения на канвасе:
```
ctx.drawImage(img, 0, 0, 200, 200);
let data = ctx.getImageData(0, 0, size, size).data;
```
Изображение рисуется на канвасе, и затем получаются данные пикселей с помощью getImageData. Эти данные содержат информацию о цветах каждого пикселя в формате RGBA.

> 14) Используем метод group.clear() для очистки всех объектов из группы.  Таким образом, он помогает поддерживать сцену в чистоте и управлять объектами более эффективно, особенно при динамическом обновлении содержимого.
```
group.clear();
```

> 15) Цикл для создания 3D-объектов и цикл для обработки пикселей:
```
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
```
В этом цикле создается новая геометрия для каждой строки пикселей. vertices и colors — это массивы, которые будут содержать координаты вершин и цвета для каждой линии.<br>

Внутренний цикл проходит по каждому пикселю в строке, значения красного, зеленого и синего компонентов извлекаются из массива данных и нормализуются (делятся на 255).<br>
 Далее создается материал `LineBasicMaterial`, который будет использоваться для отрисовки линий. Параметр `{ vertexColors: true }` указывает, что цвета вершин, заданные в массиве `colors`, будут использоваться для окраски линий.<br>

Создается объект `THREE.Line`, который принимает геометрию и материал. Этот объект представляет собой линию, которая будет отображаться в 3D-сцене.<br>

Затем линия добавляется в группу group, что позволяет управлять всеми линиями как единым целым. Это может быть полезно для перемещения, вращения или масштабирования всех объектов в группе одновременно.


> 16) Установка координат вершин и цветов:
```
vertices[j * 3] = j - 100;  //координата по x
vertices[j * 3 + 1] = i - 100; // координата по y
vertices[j * 3 + 2] = data[colorIndex] / 10; //координата по z 

colors[j * 3] = r;
colors[j * 3 + 1] = g; 
colors[j * 3 + 2] = b;
```
Здесь устанавливаются координаты вершин для 3D-объектов. z-координата устанавливается на основе значения красного канала, деленного на 10, чтобы создать некоторую высоту.


В принципе, это все. Нам осталось загрузить результат в объект ```img``` и отрисовать это все с помощью функции, которая вызывает саму себя и обновляет данные сцены и камеры:
```
function animation() {
    requestAnimationFrame(animation);
    controls.update();
    renderer.render(scene, camera);
}
animation();
```
   Осталось только запустить наш проект командой ```npm start``` <br>
 Надеюсь, эта статья была полезной, и вам так же захочется развиваться в frontend-разработке, как и мне))
            

