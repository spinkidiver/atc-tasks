/* eslint-disable */
import "es6-promise/auto";

export default (function initPollyFills(): void {
  // Polyfill for Array.prototype.find
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
      value: function (
        predicate: (value: any, index: number, obj: any[]) => boolean,
        thisArg?: any
      ): any {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        const o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        const len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== "function") {
          throw new TypeError("predicate must be a function");
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        const _thisArg = arguments[1];

        // 5. Let k be 0.
        let k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          const kValue = o[k];
          if (predicate.call(_thisArg, kValue, k, o)) {
            return kValue;
          }
          k++;
        }

        // 7. Return undefined.
        return undefined;
      },
    });
  }

  // Polyfill for Object.assign (using arguments instead of spread operator)
  if (typeof Object.assign !== "function") {
    Object.defineProperty(Object, "assign", {
      value: function assign(target: any): any {
        "use strict"; // 'use strict' is now placed correctly
        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError("Cannot convert undefined or null to object");
        }

        const to = Object(target);
        // Starting from the second argument
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }

  // Polyfill for String.prototype.startsWith
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (
      search: string,
      pos: number = 0
    ): boolean {
      return this.substr(pos < 0 ? 0 : +pos, search.length) === search;
    };
  }

  // Polyfill for String.prototype.includes
  if (!String.prototype.includes) {
    String.prototype.includes = function (
      search: string,
      start: number = 0
    ): boolean {
      if (typeof start !== "number") {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
})();
