import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';
import EventPointAddView from '../view/event-point-add-view.js';

import { remove, render, replace } from '../framework/render.js';
import { EVENT_MODE, USER_ACTION, UPDATE_TYPE, NEW_EVENT, RENDER_POSITION } from '../const.js';

export default class EventPresentor {
  // Containers
  #eventContainer = null;
  // Models
  #offersModel = null;
  #destinationsModel = null;
  // Handlers
  #handleEventChange = null;
  #handleModeChange = null;
  // Components
  #eventComponent = null;
  #eventEditComponent = null;
  #eventAddComponent = null;
  // Temp
  #event = null;
  #savedEvent = null;
  #mode = EVENT_MODE.DEFAULT;

  constructor({
    // Containers
    eventContainer,
    // Models
    offersModel,
    destinationsModel,
    // Handlers
    onDataChange,
    onModeChange,
  }) {
    // Containers
    this.#eventContainer = eventContainer;
    // Models
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    // Handlers
    this.#handleEventChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  // Инициализация события
  init(event) {
    this.#event = event;

    this.#eventComponent = this.#createEventComponent();
    render(this.#eventComponent, this.#eventContainer);

    this.#eventEditComponent = this.#createEventEditComponent();
  }

  // Обновление события
  update(event = this.#event) {
    this.#event = event;

    const updatedEventComponent = this.#createEventComponent();
    const updatedEventEditComponent = this.#createEventEditComponent();

    if (this.#mode === EVENT_MODE.DEFAULT) {
      replace(updatedEventComponent, this.#eventComponent);
    } else {
      replace(updatedEventEditComponent, this.#eventEditComponent);
      this.#eventEditComponent = updatedEventEditComponent;
    }
    this.#eventComponent = updatedEventComponent;
    this.#eventEditComponent = updatedEventEditComponent;
  }

  reset (event = this.#savedEvent) {
    this.#event = {...event};
    const updatedEventEditComponent = this.#createEventEditComponent();

    if (this.#mode === EVENT_MODE.EDITING) {
      updatedEventEditComponent.element.querySelector('.event--edit').classList.add('shake');
      replace(updatedEventEditComponent, this.#eventEditComponent);
      this.#eventEditComponent = updatedEventEditComponent;
    }
    this.#eventEditComponent = updatedEventEditComponent;
    this.#eventComponent.element.querySelector('.event').classList.add('shake');
    setTimeout(() => {
      this.#eventComponent.element.querySelector('.event').classList.remove('shake');
      this.#eventEditComponent.element.querySelector('.event--edit').classList.remove('shake');
    }, 1000);
  }

  // Добавление события
  add(event) {
    this.#event = {...event};
    if (this.#eventAddComponent) {
      remove(this.#eventAddComponent);
      this.#eventAddComponent = this.#createEventAddComponent(this.#event);
      this.#eventAddComponent.element.querySelector('.event--edit').classList.add('shake');
      render(this.#eventAddComponent, this.#eventContainer, RENDER_POSITION.AFTERBEGIN);
    } else {
      this.#eventAddComponent = this.#createEventAddComponent();
      render(this.#eventAddComponent, this.#eventContainer, RENDER_POSITION.AFTERBEGIN);
    }
  }

  // Создание компонента
  #createEventComponent() {
    return new EventPointView({
      ...this.component,
      onSwitchToForm: this.#handleSwitchToForm,
      onFavoriteClick: this.#handleFavoriteClick
    }
    );
  }

  // Создание компонента редактирования
  #createEventEditComponent() {
    return new EventPointEditView({
      ...this.component,
      onSwitchToCard: this.#handleSwitchToCard,
      onSubmitForm: this.#handleFormSubmit,
      onDeleteForm: this.#handleFormDelete
    }
    );
  }

  // Создание компонента добавления
  #createEventAddComponent(event = NEW_EVENT) {
    return new EventPointAddView({
      ...this.component,
      event: event,
      onSubmitForm: this.#handleFormSubmit,
      onCancelForm: this.#handleFormCancel
    }
    );
  }

  // Переключение режима на редактирование
  #switchToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange({
      mode: EVENT_MODE.EDITING,
    });
    this.#mode = EVENT_MODE.EDITING;
  }

  // Переключение режима на просмотр
  #switchToCard() {
    this.#event = {...this.#savedEvent};
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#eventEditComponent = this.#createEventEditComponent();
    this.#mode = EVENT_MODE.DEFAULT;
  }

  // Обработчик переключения на редактирование
  #handleSwitchToForm = () => {
    this.#savedEvent = {...this.#event};
    this.#switchToForm();
  };

  // Обработчик переключения на просмотр
  #handleSwitchToCard = () => {
    this.#switchToCard();
  };

  // Обработчик клика по избранному
  #handleFavoriteClick = () => {
    this.#event.isFavorite = !this.#event.isFavorite;
    this.#handleEventChange({
      actionType: USER_ACTION.UPDATE_EVENT,
      updateType: UPDATE_TYPE.PATCH,
      update: this.#event
    });
  };

  // Обработчик отправки формы
  #handleFormSubmit = ({event}) => {
    // При редактировании события
    if (this.#eventComponent) {
      this.#handleEventChange({
        actionType: USER_ACTION.UPDATE_EVENT,
        updateType: UPDATE_TYPE.MINOR,
        update: event
      });
    }
    // При добавлении события
    if (this.#eventAddComponent) {
      this.#event = event;
      this.#handleEventChange({
        actionType: USER_ACTION.ADD_EVENT,
        updateType: UPDATE_TYPE.MINOR,
        update: event
      });
    }
  };

  // Обработчик удаления события
  #handleFormDelete = () => {
    this.#handleEventChange({
      actionType: USER_ACTION.DELETE_EVENT,
      updateType: UPDATE_TYPE.MINOR,
      update: this.#event
    });
  };

  // Обработчик отмены события
  #handleFormCancel = () => {
    remove(this.#eventAddComponent);
    this.#eventAddComponent = null;
    this.#handleEventChange({
      actionType: USER_ACTION.CANSEL_EVENT,
      updateType: null,
      update: null
    });
  };

  // Сброс просмотра
  resetView() {
    if (this.#mode !== EVENT_MODE.DEFAULT) {
      this.#switchToCard();
      this.update(this.#event);
    }
  }

  // Удаление компонентов
  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
    remove(this.#eventAddComponent);
  }

  // Получение компонентов
  get component () {
    return {
      event: this.#event,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel
    };
  }

}
