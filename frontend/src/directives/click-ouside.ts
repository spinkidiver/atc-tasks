import type { DirectiveOptions } from "vue";

// Definir el tipo de la directiva
const clickOutsideDirective: DirectiveOptions = {
  bind(el, binding, vnode) {
    const handler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        const method = binding.expression;

        // Aseguramos que el método existe en el contexto de Vue
        if (
          method &&
          vnode.context &&
          typeof vnode.context[method as keyof typeof vnode.context] ===
            "function"
        ) {
          (vnode.context as any)[method](event); // Llamamos al método
        }
      }
    };

    (el as any).clickOutsideEvent = handler;
    document.body.addEventListener("click", handler);
  },

  unbind(el) {
    document.body.removeEventListener("click", (el as any).clickOutsideEvent);
  },
};

export default clickOutsideDirective;
