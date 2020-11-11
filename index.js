/** @description Работа с цветом [es6]
  * @author xaota
  * @types
  * * {integer} <-> {number} - целые числа
  * * {natural} <-> {number} - натуральные числа и ноль, т.е., {unsigned int} // ноль не натуральное число
  * * {byte}    <-> {number} - целые числа [0..255] (включительно)
  * * {percent} <-> {number} - вещественное число [0..1] (включительно), как правило, получается из {byte} / 255
  * @todo Ещё гора чего не описана. +этим тегом помечены кандидаты на оптимизацию, переписывание и т. д.
  * @feature Цепочные вызовы, типа `Color.fromRGB(0, 0, 255).saturate(.2).fade(0.3)`
  */

/** @section @imports */
  import Num    from 'javascript-std-lib/number.js';
  import Vector from 'javascript-algebra/Vector.js';
  import Canvas from 'javascript-canvas/Canvas.js';

  import Blend from './library/Blend.js';

/** @section data */
  const css = { // цвета CSS
    aliceblue           : '#f0f8ff',
    antiquewhite        : '#faebd7',
    aqua                : '#00ffff',
    aquamarine          : '#7fffd4',
    azure               : '#f0ffff',
    beige               : '#f5f5dc',
    bisque              : '#ffe4c4',
    black               : '#000',
    blanchedalmond      : '#ffebcd',
    blue                : '#00f',
    blueviolet          : '#8a2be2',
    brown               : '#a52a2a',
    burlywood           : '#deb887',
    cadetblue           : '#5f9ea0',
    chartreuse          : '#7fff00',
    chocolate           : '#d2691e',
    coral               : '#ff7f50',
    cornflowerblue      : '#6495ed',
    cornsilk            : '#fff8dc',
    crimson             : '#dc143c',
    cyan                : '#0ff',
    darkblue            : '#00008b',
    darkcyan            : '#008b8b',
    darkgoldenrod       : '#b8860b',
    darkgray            : '#a9a9a9',
    darkgrey            : '#a9a9a9',
    darkgreen           : '#006400',
    darkkhaki           : '#bdb76b',
    darkmagenta         : '#8b008b',
    darkolivegreen      : '#556b2f',
    darkorange          : '#ff8c00',
    darkorchid          : '#9932cc',
    darkred             : '#8b0000',
    darksalmon          : '#e9967a',
    darkseagreen        : '#8fbc8f',
    darkslateblue       : '#483d8b',
    darkslategray       : '#2f4f4f',
    darkslategrey       : '#2f4f4f',
    darkturquoise       : '#00ced1',
    darkviolet          : '#9400d3',
    deeppink            : '#ff1493',
    deepskyblue         : '#00bfff',
    dimgray             : '#696969',
    dimgrey             : '#696969',
    dodgerblue          : '#1e90ff',
    firebrick           : '#b22222',
    floralwhite         : '#fffaf0',
    forestgreen         : '#228b22',
    fuchsia             : '#f0f',
    gainsboro           : '#dcdcdc',
    ghostwhite          : '#f8f8ff',
    gold                : '#ffd700',
    goldenrod           : '#daa520',
    gray                : '#808080',
    grey                : '#808080',
    green               : '#008000',
    greenyellow         : '#adff2f',
    honeydew            : '#f0fff0',
    hotpink             : '#ff69b4',
    indianred           : '#cd5c5c',
    indigo              : '#4b0082',
    ivory               : '#fffff0',
    khaki               : '#f0e68c',
    lavender            : '#e6e6fa',
    lavenderblush       : '#fff0f5',
    lawngreen           : '#7cfc00',
    lemonchiffon        : '#fffacd',
    lightblue           : '#add8e6',
    lightcoral          : '#f08080',
    lightcyan           : '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray           : '#d3d3d3',
    lightgrey           : '#d3d3d3',
    lightgreen          : '#90ee90',
    lightpink           : '#ffb6c1',
    lightsalmon         : '#ffa07a',
    lightseagreen       : '#20b2aa',
    lightskyblue        : '#87cefa',
    lightslategray      : '#778899',
    lightslategrey      : '#778899',
    lightsteelblue      : '#b0c4de',
    lightyellow         : '#ffffe0',
    lime                : '#0f0',
    limegreen           : '#32cd32',
    linen               : '#faf0e6',
    magenta             : '#f0f',
    maroon              : '#800000',
    mediumaquamarine    : '#66cdaa',
    mediumblue          : '#0000cd',
    mediumorchid        : '#ba55d3',
    mediumpurple        : '#9370d8',
    mediumseagreen      : '#3cb371',
    mediumslateblue     : '#7b68ee',
    mediumspringgreen   : '#00fa9a',
    mediumturquoise     : '#48d1cc',
    mediumvioletred     : '#c71585',
    midnightblue        : '#191970',
    mintcream           : '#f5fffa',
    mistyrose           : '#ffe4e1',
    moccasin            : '#ffe4b5',
    navajowhite         : '#ffdead',
    navy                : '#000080',
    oldlace             : '#fdf5e6',
    olive               : '#808000',
    olivedrab           : '#6b8e23',
    orange              : '#ffa500',
    orangered           : '#ff4500',
    orchid              : '#da70d6',
    palegoldenrod       : '#eee8aa',
    palegreen           : '#98fb98',
    paleturquoise       : '#afeeee',
    palevioletred       : '#d87093',
    papayawhip          : '#ffefd5',
    peachpuff           : '#ffdab9',
    peru                : '#cd853f',
    pink                : '#ffc0cb',
    plum                : '#dda0dd',
    powderblue          : '#b0e0e6',
    purple              : '#800080',
    rebeccapurple       : '#639',
    red                 : '#f00',
    rosybrown           : '#bc8f8f',
    royalblue           : '#4169e1',
    saddlebrown         : '#8b4513',
    salmon              : '#fa8072',
    sandybrown          : '#f4a460',
    seagreen            : '#2e8b57',
    seashell            : '#fff5ee',
    sienna              : '#a0522d',
    silver              : '#c0c0c0',
    skyblue             : '#87ceeb',
    slateblue           : '#6a5acd',
    slategray           : '#708090',
    slategrey           : '#708090',
    snow                : '#fffafa',
    springgreen         : '#00ff7f',
    steelblue           : '#4682b4',
    tan                 : '#d2b48c',
    teal                : '#008080',
    thistle             : '#d8bfd8',
    tomato              : '#ff6347',
    turquoise           : '#40e0d0',
    violet              : '#ee82ee',
    wheat               : '#f5deb3',
    white               : '#fff',
    whitesmoke          : '#f5f5f5',
    yellow              : '#ff0',
    yellowgreen         : '#9acd32'
  };

/** @section */
  export default class Color {
  /** {Color} @constructor
   * @param {...percent} rgb значения компонент цвета
   * @param {percent} alpha уровень прозрачности цвета
   * @param {string}  value название цвета (CSS, если есть)
   */
    constructor(rgb, alpha = 1, value = undefined) {
      const [red, green, blue] = rgb;
      Object.assign(this, {channel: {red, green, blue, alpha}, value});
    }

  /** Строковое представление цвета @debug
   * @return {string} "[Color CSS-syntax]"
   */
    toString() {
      return `[Color ${this.css}]`;
    }

  /** Копирование цвета
   * @return {Color} объект копия цвета
   */
    copy() {
      const rgb = this.rgb;
      return new Color([rgb.r, rgb.g, rgb.b], rgb.a, this.value);
    }

  /** @section Компоненты цвета */
    get red() {
      return this.channel.red;
    }

  /** */
    get green() {
      return this.channel.green;
    }

  /** */
    get blue() {
      return this.channel.blue;
    }

  /** */
    get alpha() {
      return this.channel.alpha;
    }

  /** @section Представление цвета в различных цветовых моделях */
    get rgb() {
      return {
        r: this.red,
        g: this.green,
        b: this.blue,
        a: this.alpha
      }
    }

  /** */
    get RGB() {
      const rgb = this.rgb, a = rgb.a;
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => Math.round(Number(c.toFixed(5)) * 255));
      return {r, g, b, a};
    }

  /** */
    get hex() {
      const rgb = this.RGB;
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => c.toString(16));
      return {r, g, b};
    }

  /** */
    get HEX() {
      const hex = this.hex;
      let [r, g, b] = [hex.r, hex.g, hex.b].map(c => c.length === 2 ? c : '0' + c);
      if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1]) [r, g, b] = [r[0], g[0], b[0]];
      return (r + g + b).toLowerCase();
    }

  /** */
    get ahex() {
      const rgb = this.RGB;
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => c.toString(16));
      const a = Math.round(rgb.a * 255).toString(16);
      return {r, g, b, a};
    }

  /** */
    get AHEX() {
      const hex = this.ahex;
      const [a, r, g, b] = [hex.a, hex.r, hex.g, hex.b].map(c => c.length === 2 ? c : '0' + c);
      return (a + r + g + b).toLowerCase();
    }

  /** */
    get HEXA() {
      const hex = this.ahex;
      const [a, r, g, b] = [hex.a, hex.r, hex.g, hex.b].map(c => c.length === 2 ? c : '0' + c);
      return (r + g + b + a).toLowerCase();
    }

  /** */
    get hsl() {
      const rgba = this.rgb, [r,g,b,a] = [rgba.r, rgba.g, rgba.b, rgba.a];
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const l = (max + min) / 2, d = max - min;
      let h = 0, s = 0;

      if (max === min) return {h, s, l, a};
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2;               break;
        case b: h = (r - g) / d + 4;               break;
      }
      h = Math.round(h * 60);
      s = l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);
      return {h, s, l, a};
    }

  /** */
    get HSL() {
      const hsl = this.hsl;
      hsl.s = Math.round(hsl.s * 100);
      hsl.l = Math.round(hsl.l * 100);
      return hsl;
    }

  /** */
    get hsv() {
      const rgba = this.rgb, [r,g,b,a] = [rgba.r, rgba.g, rgba.b, rgba.a];
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const v = max, d = max - min, s = max === 0 ? 0 : d / max;
      let h = 0;
      if (max === min) return {h, s, v, a}
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h = Math.round(h * 60);
      return {h, s, v, a}
    }

  /** */
    get HSV() {
      const hsv = this.hsv;
      hsv.s = Math.round(hsv.s * 100);
      hsv.v = Math.round(hsv.v * 100);
      return hsv;
    }

  /** */
    get hsb() {
      const hsv = this.hsv, brightness = hsv.v;
      delete hsv.v;
      hsv.b = brightness;
      return hsv;
    }

  /** */
    get HSB() {
      const hsb = this.hsb;
      hsb.s = Math.round(hsb.s * 100);
      hsb.b = Math.round(hsb.b * 100);
      return hsb;
    }

  /** Цвет словом-названием @css @slow
   * @return {string} название цвета
   */
    get key() {
      const hex = this.cssHEX;
      for (const i in css) if (css[i] === hex) return i;
      return undefined;
    }

  /** @subsection Представление цвета в различных цветовых моделях @css */
    get css() {
      return this.value
        ? this.key
        : this.channel.alpha === 1
          ? this.cssHEX
          : this.cssRGBA;
    }

  /** */
    get cssRGB() {
      const rgb = this.RGB;
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }

  /** */
    get cssRGBA() {
      const rgba = this.RGB;
      return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    }

  /** */
    get cssHEX() {
      return '#' + this.HEX;
    }

  /** */
    get cssHEXA() { // RGBA => #rrggbbaa
      return '#' + this.HEXA;
    }

  /** */
    get cssAHEX() { // ARGB => #aarrggbb, not support in css
      return '#' + this.AHEX;
    }

  /** */
    get cssHSL() {
      const hsl = this.HSL;
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

  /** */
    get cssHSLA() {
      const hsl = this.HSL;
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
    }

  /** */
    get cssHSV() { // not support in css
      const hsv = this.HSV;
      return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    }

  /** */
    get cssHSVA() { // not support in css
      const hsv = this.HSV;
      return `hsva(${hsv.h}, ${hsv.s}%, ${hsv.v}%, ${hsv.a})`;
    }

  /** */
    get cssHSB() { // css4
      const hsb = this.HSB;
      return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
    }

  /** */
    get cssHSBA() { // css4
      const hsb = this.HSB;
      return `hsva(${hsb.h}, ${hsb.s}%, ${hsb.b}%, ${hsb.a})`;
    }

  /** @TODO:
   * HWB
   * CMYK
   * NCol
   * LAB
   * XYZ
   * LCH
   * LUV
   */

  /** @section Характеристики цвета */
  /** Яркость цвета
   * @return {float} [0..1]
   */
    get luminance() {
      const rgb = this.rgb, [r, g, b] = [rgb.r, rgb.g, rgb.b];
      return luminance(r, g, b);
    }

  /** Относительная яркость цвета (relative luminance)
   * @standart WCAG 2.0
   * @link //www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   * @return {float} [0..1]
   */
    get luma() {
      const rgb = this.rgb;
      let [r, g, b] = [rgb.r, rgb.g, rgb.b];
      r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
      g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
      b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
      return luminance(r, g, b);
    }

  /** Светлота цвета
   * @return {float} [0..1]
   */
    get lightness() {
      return this.hsl.l;
    }

  /** Насыщенность цвета @hsl @primary
   * @return {float} [0..1]
   */
    get saturation() {
      return this.hsl.s;
    }

  /** Насыщенность цвета @hsv
   * @return {float} [0..1]
   */
    get hsvSaturation() {
      return this.hsv.s;
    }

  /** Цветовой тон @hsl @primary @angle
   * @return {integer} [0..360]
   * @fixme: {float} [0..2 * Math.PI] - в радианах
   */
    get hue() {
      return this.hsl.h;
    }

  /** Цветовой тон @hsv @angle
   * @return {integer} [0..360]
   * @fixme: {float} [0..2 * Math.PI] - в радианах
   */
    get hsvHue() {
      return this.hsv.h;
    }

  /** Яркость (Значение цвета) @hsb / @hsv (value)
   * @return {float} [0..1]
   */
    get brightness() {
      return this.hsv.v; // this.hsb.b
    }

  /** @TODO:
   * brightness (0..100?)
   * chroma (?)
   * tone ({string})
   * heat (теплота) (?)
   */

  /** @section Преобразование цвета @copy @chainable */
  /** Изменение насыщенности
   * @param {percent} amount уровень
   * @param {boolean} relative?false использовать относительную насыщенность для расчёта
   * @return {Color} итоговый цвет
   * @todo: methods for relative calc - убрать условие
   */
    saturate(amount, relative = false) {
      const saturation = this.saturation;
      amount = relative ? saturation * amount : amount;
      return this.SATURATION(saturation + amount);
    }

  /** */
    desaturate(amount, relative = false) { // @deprecated
      return this.saturate(-amount, relative);
    }

  /** */
    SATURATION(amount) { // @absolute
      const hsl = this.hsl;
      hsl.s = Num.clamp(amount);
      return Color.hsl(hsl);
    }

  /** Изменение яркости
   * @param {percent} amount устанавливаемое значениие
   * @param {boolean} relative?false использовать относительную светлоту для расчёта
   * @return {Color} итоговый цвет
   * @todo: methods for relative calc - убрать условие
   */
    lighten(amount, relative = false) {
      const lightness = this.lightness;
      amount = relative ? lightness * amount : amount;
      return this.LIGHTNESS(lightness + amount);
    }

  /** */
    darken(amount, relative = false) {
      return this.lighten(-amount, relative);
    }

  /** */
    LIGHTNESS(amount) { // @absolute
      const hsl = this.hsl;
      hsl.l = Num.clamp(amount);
      return Color.hsl(hsl);
    }

  /** Изменение прозрачности
   * @param {percent} amount устанавливаемое значениие
   * @param {boolean} relative?false использовать относительную прозрачность как опорную
   * @return {Color} итоговый цвет
   * @todo: absolute method
   */
    fade(amount, relative = false) {
      const alpha = this.alpha;
      amount = relative ? alpha * amount : amount;
      return this.FADE(alpha + amount);
    }

  /** */
    fadeIn(amount, relative = false) { // @deprecated
      return this.fade(amount, relative);
    }

  /** */
    fadeOut(amount, relative = false) { // @deprecated
      return this.fade(-amount, relative);
    }

  /** */
    FADE(amount) { // @absolute
      const rgb = this.rgb;
      rgb.a = Num.clamp(amount);
      return Color.rgb(rgb);
    }

  /** Изменение цветового тона @hsl
   * @param {percent} amount устанавливаемое значениие
   * @return {Color} итоговый цвет
   * @todo: absolute method
   */
    spin(amount) {
      const hsl = this.hsl;
      const hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return Color.hsl(hsl);
    }

  /** Осветление (смешивание с белым)
   * @param {percent} amount устанавливаемое значениие
   * @return {Color} итоговый цвет
   */
    tint(amount) {
      return Color.mix(Color.white, this, amount);
    }

  /** Затемнение (смешивание с чёрным)
   * @param {percent} amount устанавливаемое значениие
   * @return {Color} итоговый цвет
   */
    shade(amount) {
      return Color.mix(Color.black, this, amount);
    }

  /** Преобразование в "Оттенки серого" на основе насыщенности // desaturate(100%)
   * @return {Color} итоговый цвет
   */
    greyScale() {
      const hsl = this.hsl;
      hsl.s = 0;
      return Color.hsl(hsl);
    }

  /** Преобразование в "Оттенки серого" на основе интенсивности (яркости)
   * @return {Color} итоговый цвет
   */
    lumaScale(relative = true) {
      const luma = relative === true ? this.luma : this.luminance;
      return new Color([luma, luma, luma], this.alpha);
    }

  /** Выбор наиболее контрастного цвета
   * @return {Color} итоговый цвет
   */
    contrast(dark = Color.black, light = Color.white, threshold = 0.43) {
      light = light.copy();
      dark  =  dark.copy();
      if (dark.luma > light.luma) [light, dark] = [dark, light];
      return this.luma < threshold ? light : dark;
    }

  /** Обратный (по модели RGB) цвет
   * @return {Color} итоговый цвет
   */
    inverse() { // negative
      const c = this.rgb,
          rgb = [c.r, c.g, c.b].map(e => 1 - e);
      return new Color(rgb, c.a);
    }

  /** Обратный (по модели RGB) цвет с прозрачностью
   * @return {Color} итоговый цвет
   */
    INVERSE() { // negative
      const c = this.rgb,
          rgb = [c.r, c.g, c.b].map(e => 1 - e),
            a = 1 - c.a;
      return new Color(rgb, a);
    }

  /** Сложение цветов
   * @param {Color} color цвет-слагаемое
   * @return {Color} итоговый цвет
   * @todo: static (?), validate
   */
    addition(color) {
      const channel = this.channel.map((c, i) => Num.clamp(c + color.channel[i]));
      const rgb = channel.slice(0, 3), alpha = channel[3];
      return new Color(rgb, alpha);
    }

  /** @TODO:
   * теплее/холоднее
   * изменение яркости (tint/shade (?))
   */

  /** @section Использование цвета для вычислений @native */
  /** Вектор-компонент цвета @integer
   * @return {Int8Array}[0..2] - [R, G, B] компоненты цвета [0..255]
   */
    get int() {
      const rgb = this.RGB;
      return new Int8Array([rgb.r, rgb.g, rgb.b]);
    }

  /** */
    get INT() {
      const rgb = this.RGB;
      return new Int8Array([rgb.r, rgb.g, rgb.b, rgb.a]);
    }

  /** Вектор-компонент цвета @float
   * @return {Float32Array}[0..2] - [R, G, B] компоненты цвета [0..1]
   */
    get float() {
      const rgb = this.rgb;
      return new Float32Array([rgb.r, rgb.g, rgb.b]);
    }

  /** */
    get FLOAT() {
      const rgb = this.rgb;
      return new Float32Array([rgb.r, rgb.g, rgb.b, rgb.a]);
    }

  /** @section Комбинации цветов @static @method's */
  /** Смешивание цветов
   * @param {Color} A цвет-компонент
   * @param {Color} B цвет-компонент
   * @param {percent} weight уровень смешивания
   * @return {Color} итоговый цвет
   */
    static mix(A, B, weight = 0.5) {
      const w = weight * 2 - 1,
            a = A.alpha - B.alpha,
            w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0,
            w2 = 1 - w1,
            r = w1 * A.red   + w2 * B.red,
            g = w1 * A.green + w2 * B.green,
            b = w1 * A.blue  + w2 * B.blue,
            alpha = A.alpha * weight + B.alpha * (1 - weight);
      return new Color([r, g, b], alpha);
    }

  /** color interpolation */
    static fade(A = Color.white, B = Color.black, percent = 0) {
      // interpolate
      const total = 100, step = ~~(percent * 100);
      const channel = (a, b) => b + (~~((a - b) / total) * step);
      const r = channel(A.red, B.red);
      const g = channel(A.green, B.green);
      const b = channel(A.blue, B.blue);
      const alpha = channel(A.alpha * 255, B.alpha * 255) / 255;
      return new Color([r, g, b], alpha);
    }

  /** @subsection Наложение цветов */
    static blend(mode, A = Color.white, B = Color.black) {
      var alphaA = A.alpha,
          alphaB = B.alpha,
          alpha = alphaB + alphaA * (1 - alphaB),
          rgbA = A.float,
          rgbB = B.float,
          rgb = rgbA.map(blend);
      return new Color(rgb, alpha);

    /** */
      function blend(a, i) {
        const b = rgbB[i], r = mode(a, b);
        return alpha !== 0
          ? (alphaB * b + alphaA * (a - alphaB * (a + b - r))) / alpha
          : r;
      }
    }

  /** */
    static multiply(A, B) {
      return Color.blend(Blend.multiply, A, B);
    }

  /** */
    static screen(A, B) {
      return Color.blend(Blend.screen, A, B);
    }

  /** */
    static overlay(A, B) {
      return Color.blend(Blend.overlay, A, B);
    }

  /** */
    static softlight(A, B) {
      return Color.blend(Blend.softlight, A, B);
    }

  /** */
    static hardlight(A, B) {
      return Color.blend(Blend.hardlight, A, B);
    }

  /** */
    static difference(A, B) {
      return Color.blend(Blend.difference, A, B);
    }

  /** */
    static exclusion(A, B) {
      return Color.blend(Blend.exclusion, A, B);
    }

  /** */
    static average(A, B) {
      return Color.blend(Blend.average, A, B);
    }

  /** */
    static negation(A, B) {
      return Color.blend(Blend.negation, A, B);
    }

  /** @subsection Создание цвета @static @method's */
    static hex(rgb, value) {
      if (rgb.length === 3) rgb = rgb.split('').map(c => c + c).join('');
      rgb = rgb.match(/.{2}/g).map(c => parseInt(c, 16));
      return Color.fromRGB(...rgb, 1, value);
    }

  /** */
    static ahex(argb, value) {
      if (argb.length === 4) argb = argb.split('').map(c => c + c).join('');
      argb = argb.match(/.{2}/g).map(c => parseInt(c, 16));
      const rgb = argb.slice(1), alpha = argb[0] / 255;
      return Color.fromRGB(...rgb, alpha, value);
    }

  /** */
    static rgb({r, g, b, a = 1}, value) {
      return new Color([r, g, b], a, value);
    }

  /** */
    static RGB(rgba, value) {
      const [r, g, b] = [rgba.r, rgba.g, rgba.b].map(c => c / 255);
      return Color.rgb({r, g, b, a: rgba.a}, value);
    }

  /** */
    static hsl({h, s, l, a = 1}, value) {
      h = (h % 360) / 360;
      // s = Num.clamp(s);
      // l = Num.clamp(l);
      // a = Num.clamp(a);
      if (s === 0) return new Color([l, l, l], a); // achromatic
      const q = l <= 0.5 ? l * (s + 1) : l + s - l * s,
          p = l * 2 - q,
          r = hue(p, q, h + 1 / 3),
          g = hue(p, q, h),
          b = hue(p, q, h - 1 / 3);
      return new Color([r, g, b], a, value);
    }

  /** */
    static HSL(hsla, value) {
      hsla = Object.assign({}, hsla, {s: hsla.s / 100, l: hsla.l / 100});
      return Color.hsl(hsla, value);
    }

  /** */
    static hsv({h, s, v, a = 1}, value) {
      h %= 360;
      const i = Math.floor((h / 60) % 6),
          f = (h / 60) - i,
        vs = [
          v,
          v * (1 - s),
          v * (1 - f * s),
          v * (1 - (1 - f) * s)
        ],
      perm = [
          [0, 3, 1],
          [2, 0, 1],
          [1, 0, 3],
          [1, 2, 0],
          [3, 1, 0],
          [0, 1, 2]
        ],
      rgb = [
        vs[perm[i][0]],
        vs[perm[i][1]],
        vs[perm[i][2]]
      ];
      return new Color(rgb, a, value);
    }

  /** */
    static HSV(hsva, value) {
      hsva = Object.assign({}, hsva, {s: hsva.s / 100, v: hsva.v / 100});
      return Color.hsv(hsva, value);
    }

  /** */
    static hsb({h, s, b, a = 1}, value) {
      return Color.hsv({h, s, v: b, a}, value);
    }

  /** */
    static HSB(hsba, value) {
      hsba.v = hsba.b;
      return Color.HSV(hsba, value);
    }

  /** */
    static fromRGB(r, g, b, a, value) {
      return Color.RGB({r, g, b, a}, value);
    }

  /** */
    static fromHEX(hex, value) {
      return hex[0] === '#'
        ? Color.hex(hex.slice(1), value)
        : Color.hex(hex, value);
    }

  /** */
    static fromAHEX(ahex, value) {
      return ahex[0] === '#'
        ? Color.ahex(ahex.slice(1), value)
        : Color.ahex(ahex, value);
    }

  /** */
    static fromHSL(h, s, l, a, value) {
      return Color.HSL({h, s, l, a}, value);
    }

  /** */
    static fromHSV(h, s, v, a, value) {
      return Color.HSV({h, s, v, a}, value);
    }

  /** */
    static fromHSB(h, s, b, a, value) {
      return Color.HSB({h, s, b, a}, value);
    }

  /** @subssection Создание цвета из параметра @css */
    static cssRGB(color) { // rgb({byte}, {byte}, {byte}) или rgba({byte}, {byte}, {byte}, {percent})
      color = color.replace(/rgb|rgba|\(|\)\s+/gi, '').split(',').map(Number);
      const r = color[0], g = color[1], b = color[2];
      const a = color.length === 4 ? color[3] : 1;
      return Color.fromRGB(r, g, b, a);
    }

  /** */
    static cssHEX(color) {
      return Color.fromHEX(color);
    }

  /** */
    static cssAHEX(color) {
      return Color.fromAHEX(color);
    }

  /** */
    static cssHSL(color) {
      color = color.replace(/hsl|hsla|\(|\)|\%|\s+/gi, '').split(',').map(Number);
      const h = color[0], s = color[1], l = color[2];
      const a = color.length === 4 ? color[3] : 1;
      return Color.fromHSL(h, s, l, a);
    }

  /** */
    static cssHSV(color) {
      color = color.replace(/hsv|hsva|\(|\)|\%|\s+/gi, '').split(',').map(Number);
      const h = color[0], s = color[1], v = color[2];
      const a = color.length === 4 ? color[3] : 1;
      return Color.fromHSV(h, s, v, a);
    }

  /** */
    static cssHSB(color) {
      color = color.replace(/hsb|hsba|\(|\)|\%|\s+/gi, '').split(',').map(Number);
      const h = color[0], s = color[1], b = color[2];
      const a = color.length === 4 ? color[3] : 1;
      return Color.fromHSB(h, s, b, a);
    }

  /** */
    static key(color) {
      return color in css
        ? Color[color].copy()
        : undefined;
    }

  /** */
    static css(color) {
      if (color.charAt(0) === '#') return Color.cssHEX(color);
      switch (color.substr(0, 3)) {
        case 'rgb': return Color.cssRGB(color);
        case 'hsl': return Color.cssHSL(color);
        case 'hsv': return Color.cssHSV(color);
        case 'hsb': return Color.cssHSB(color);
      }
      return Color.key(color);
    }

  /** @subsection Сравнение цветов */
    static compare(A, B, epsilon) {
      A = A.float, B = B.float;
      return A.every((e, i) => Math.abs(e - B[i]) < epsilon);
    }

  /** */
    static COMPARE(A, B, epsilon) {
      A = A.FLOAT, B = B.FLOAT;
      return A.every((e, i) => Math.abs(e - B[i]) < epsilon);
    }

  /** @section Списки цветов */
    static listFromRGBA(...array) {
      let r, g, b, a;
      return Array.from({length: array.length}, function(_, index) {
        index *= 4;
        r = array[index];
        g = array[index + 1];
        b = array[index + 2];
        a = array[index + 3];
        return Color.fromRGB(r, g, b, a);
      });
    }

  /** Список цветов из изображения (по пикселям)
    * @param {Image} image Изображение
    * @param {Vector} size? Размер изображения
    * @return {array} {...Color}
    */
    static listFromImage(image, size = Vector.from(image.width, image.height)) {
      const canvas = new Canvas().view(size),
            pixels = canvas.image(image).pixels();
      return Color.listFromRGBA(...pixels.data);
    }

  /** Список уникальных цветов из изображения (по пикселям) @slow (O(n^2))
    * @param {Image} image Изображение
    * @param {Vector} size? Размер изображения
    * @param {number} epsilon точность
    * @return {array} {...Color}
    */
    static uniqListFromImage(image, size, epsilon) {
      const list = Color.listFromImage(image, size);
      const result = [];
      for (let index = 0; index < list.length; index++) {
        const color = list[index];
        if (result.some(e => Color.compare(e, color, epsilon))) continue;
        result.push(color);
      }
      return result;
    }

  /** Средний цвет из изображения */
    static averageFromImage(image, options) {
      const canvas  = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width  = image.width;
      canvas.height = image.height;
      context.clearRect(0, 0, image.width, image.height);
      context.drawImage(image, 0, 0, image.width, image.height);
      const bitmap = context.getImageData(0, 0, image.width, image.height).data;
      const value = getColorFromArray4(bitmap, options);
      return prepareResult(value);
    }

  /** [r,g,b] */
    static isDark(color) { // http://www.w3.org/TR/AERT#color-contrast
      return ((color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000) < 128;
    }
  }

/** @section Инициализация основных цветов @css */
  Color.transparent = new Color([0, 0, 0], 0, 'transparent');
  for (const color in css) Color[color] = Color.hex(css[color].slice(1), color);

// #region [Private]
/** @subsection common.color */
/** Перевод цветового тона в компоненты @rgb */
  function hue(p, q, h) {
    h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
    if (h * 6 < 1) return p + (q - p) * h * 6;
    if (h * 2 < 1) return q;
    if (h * 3 < 2) return p + (q - p) * (2 / 3 - h) * 6;
    return p;
  }

/** Яркость цвета */
  function luminance(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

/** */
  function getColorFromArray4(arr, options = {}) {
    const bytesPerPixel = 4, arrLength = arr.length;
    const len = arrLength - arrLength % bytesPerPixel,
          preparedStep = (options.step || 1) * bytesPerPixel,
          algorithm = sqrtAlgorithm;
    return algorithm(arr, len, preparedStep);
  }

/** */
  function sqrtAlgorithm(arr, len, preparedStep) {
    let
        redTotal = 0,
        greenTotal = 0,
        blueTotal = 0,
        alphaTotal = 0,
        count = 0;

    for (let i = 0; i < len; i += preparedStep) {
        const
            red = arr[i],
            green = arr[i + 1],
            blue = arr[i + 2],
            alpha = arr[i + 3];

        redTotal += red * red * alpha;
        greenTotal += green * green * alpha;
        blueTotal += blue * blue * alpha;
        alphaTotal += alpha;
        count++;
    }

    return alphaTotal
      ? [
        Math.round(Math.sqrt(redTotal / alphaTotal)),
        Math.round(Math.sqrt(greenTotal / alphaTotal)),
        Math.round(Math.sqrt(blueTotal / alphaTotal)),
        Math.round(alphaTotal / count)
      ]
      : [0, 0, 0, 0];
  }

/** */
  function prepareResult(value) {
    const
        rgb = value.slice(0, 3),
        rgba = [].concat(rgb, value[3] / 255),
        isDark = Color.isDark(value);

    return {
        value,
        rgb: 'rgb(' + rgb.join(',') + ')',
        rgba: 'rgba(' + rgba.join(',') + ')',
        isDark,
        isLight: !isDark
    };
  }
// #endregion
