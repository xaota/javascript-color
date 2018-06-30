### Использование
```javascript
import Color from 'javascript-color';

const color = Color.fromRGB(0, 0, 125)
  .saturate(0.2)
  .fade(-0.1);

console.log(color.cssHSLA); // -> 'hsla(240, 100%, 25%, 0.9)'
```

### Возможности
* Создаёт и возвращает цвета в различных цветовых моделях (`fromHSB, rgb` и т.д.)
* Информация о характеристиках цвета (каналы `rgba`, `saturation`, `hue`, `luma` и т.д.)
* Преобразования цвета (`saturate`, `lighten`, `spin`, `shade` и т.д.)
* Сложение, смешивание и наложение цветов (`mix`, `blending functions`...)
* Поддержка основных цветов CSS (в том числе создание цвета по названию CSS)
* Поддержка прозрачности и операций с ней (`transparent === rgba(0, 0, 0, 0)`)
* Сравнение и копирование цветов (`compare`, `copy`)
* Цвет как типимизированный массив для использования в графике (`int`, `float`)
