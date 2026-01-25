const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',//: до самого element (до открывающего тега).
  AFTERBEGIN: 'afterbegin',//: сразу после открывающего тега element (перед первым потомком).
  BEFOREEND: 'beforeend',//: сразу перед закрывающим тегом element (после последнего потомка).
  AFTEREND: 'afterend',//: после element (после закрывающего тега).
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render};
