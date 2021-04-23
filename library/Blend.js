/** {Blend} Смешиванеи цветов @class @export @default
  *
  */
  export default class Blend {
  /** */
    static multiply(a, b) {
      return a * b;
    }

  /** */
    static screen(a, b) {
      return a + b - a * b;
    }

  /** */
    static overlay(a, b) {
      a *= 2;
      return a <= 1
        ? Blend.multiply(a, b)
        : Blend.screen(a - 1, b);
    }

  /** */
    static softlight(a, b) {
      let d = 1; let e = a;
      if (b > 0.5) {
        e = 1;
        d = a > 0.25
          ? Math.sqrt(a)
          : ((16 * a - 12) * a + 4) * a;
      }
      return a - (1 - 2 * b) * e * (d - a);
    }

  /** */
    static hardlight(a, b) {
      return Blend.overlay(b, a);
    }

  /** */
    static difference(a, b) {
      return Math.abs(a - b);
    }

  /** */
    static exclusion(a, b) {
      return a + b - 2 * a * b;
    }

  /** */
    static average(a, b) {
      return (a + b) / 2;
    }

  /** */
    static negation(a, b) {
      return 1 - Math.abs(a + b - 1);
    }
  }
