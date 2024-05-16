# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

-   `src/` — исходные файлы проекта
-   `src/components/` — папка с JS компонентами
-   `src/components/base/` — папка с базовым кодом

Важные файлы:

-   `src/pages/index.html` — HTML-файл главной страницы
-   `src/types/index.ts` — файл с типами
-   `src/index.ts` — точка входа приложения
-   `src/styles/styles.scss` — корневой файл стилей
-   `src/utils/constants.ts` — файл с константами
-   `src/utils/utils.ts` — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```

или

```
pnpm install
pnpm dev
```

## Сборка

```
npm run build
```

или

```
yarn build
```

или

```
pnpm build
```

## Архитектура приложения

Код приложения разделен на слои:

-   слой данных, отвечает за хранение и изменение данных
-   слой представления, отвечает за отображение данных на странице,
-   презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api

Содержит в себе базову логику для отправки запросов. К конструкторе принимает `baseUrl: string` и `options: RequestInit = {}`, которые формирует базу для запроса. В классе имплементированы следующие методы:

-   `handleResponse(response: Response): Promise<object>` - служит для обработки запроса с сервера, он возвращает либо `.json` ответ от сервера, либо ошибку;
-   `get(uri: string)`, который принимает `uri` запроса и делает `GET` запрос по итоговому `url`;
-   `post(uri: string, data: object, method: ApiPostMethods = 'POST')`, который принимает endpoint, объект с данными data, а также метод запроса, который по умолчанию равен `POST`, но может быть одним из следующих значений `'POST' | 'PUT' | 'DELETE'`. Метод делает запрос по итоговому url и передает полученный ранее объект `data`.

#### Класс Component

Абстрактный класс, который содержит в себе базовую логику для работы с `html` элементами. Имеет generic тип `T`. Конструктор принимает `container: HTMLElement`. В классе имплементированы следующие методы:

-   `setText(element: HTMLElement, value: unknown)` - устанавливает значение `value` переданному `element`;
-   `setDisabled(element: HTMLElement, state: boolean)` - тоглит атрибут `disabled` для переданного `element` согласно параметру `state`;
-   `setHidden(element: HTMLElement)` - скрывает переданный `element` при помощи `display: none;`;
-   `setVisible(element: HTMLElement)` - показывает переданный `element` при помощи удаления стиля `display`;
-   `setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает `url` для переданной картинки, а также может установить `alt` для картинки, если этот параметр был передан
-   `render(data?: Partial<T>): HTMLElement` - параметр `data` имеет generic тип `T`, который был обозначен для класса `Component`, вызывает аксессоры класса и возвращает `HTMLElement`.

#### Класс EventEmitter

Содержит в себе базовую логику для работы с событиями, то есть выполняет роль брокера событий. В классе инициализируется `Map` объект со всеми событиями и их подписчиками. В классе имплементированы следующие методы:

-   `on<T extends object>(eventName: TEventName, callback: (event: T) => void)` - устанавливает обработчик `callback` на событие `eventName`. Типизирует параметр обработчика при помощи generic типа `T`;
-   `off(eventName: TEventName, callback: TSubscriber)` - удаляет обработчик `callback` с события `eventName`;
-   `emit<T extends object>(eventName: string, data?: T)` - инициализация события `eventName` и передача необходимых данных `data`. Типизирует параметр данных `data` при помощи generic типа `T`;
-   `onAll(callback: (event: TEmitterEvent) => void)` - позволяет прослушивать все события и вызывать необходимый `callback`;
-   `offAll()` - позволяет сбросить все события;
-   `trigger<T extends object>(eventName: string, context?: Partial<T>)` - позволяет сделать коллбек триггер, генерирующий событие `eventName` при вызове и передать нужный контекст `context`. Типизирует параметр контекста `context` при помощи generic типа `T`.

#### Класс Model

Содержит в себе базовую логику для определение моделей, чтобы можно было их отличить от простых объектов. Имеет generic тип `T`. На вход конструктор принимает параметр данных модели `data: Partial<T>`, а также события нашего приложения `events: IEventEmitter`; В классе имплементированы следующие методы:

-   `emitChanges(event: string, payload?: object)` - позволяет инициализация событие `event` и передать нужные данные `payload`

### Модели

#### Класс CardModel

Содержит в себе модель карточек магазина, который имеет тип `ICard`. В классе имплементированы следующие методы:

-   `get categoryModifier(): string` - возвращает модификатор для категории карточки на основании параметра `category`;
-   `get formattedPrice(): string` - возвращает отформатированную цену для отображения в карточке, с добавлением постфикса `синапсов` или же, если нет цены установление значения `Бесценно`;

#### Класс BasketModel

Содержит в себе модель корзины магазина, который имеет тип `IBasketModel`. В классе имплементированы следующие методы:

-   `set count(value: number)` - установка количества позиций в корзине;
-   `get count(): number` - возвращает количество позиций в корзине;
-   `set items(value: string | string[])` - установка элементов корзины;
-   `get items(): string[]` - возвращает элементы корзины;
-   `set total(value: number)` - установка итоговой стоимости корзины;
-   `get total(): number` - возвращает итоговую стоимость корзины;
-   `clearState()` - метод позволяет полностью вернуть корзину к исходному состоянию;

#### Класс OrderModel

Содержит в себе модель заказа, который имеет тип `IOrderModel`. В классе имплементированы следующие методы:

-   `get fields(): IOrderFields` - получение объекта с полями заказа;
-   `setFieldValue(field: keyof IOrderFields, value: TOrderPayment | string, target?: HTMLInputElement)` - установка значение поля заказа;
-   `getResetFields(): IOrderModel` - возвращает начальное состояние полей заказа;
-   `validateFields(target: HTMLInputElement, field: keyof IOrderFields): boolean` - валидация полей заказа;

#### Класс CatalogModel

Содержит в себе модель каталога, который имеет тип `ICatalogModel`. В классе имплементированы следующие методы:

-   `set cards(value: ICardModel[])` - установка значений карточек каталога;
-   `get cards(): ICardModel[]` - получение карточек каталога;

### Представление

#### Класс CardView

Абстрактный класс карточки, наследуемый от общего класса `View`, который будет использоваться для отображение в каталоге и модальном окне карточке. Также в файле `CardView.ts` будет реализован класс для отображение карточки в корзине. Будет иметь аксесоры для установления данных в шаблоне

#### Класс BasketView

Класс корзины, наследуемый от общего класса `View`, который будет отлавливать клик в шапке, устанавливать количество товаров в корзине, отвечать за отображение корзины в модальном окне. Будет иметь аксесоры для установления данных в шаблоне

#### Класс OrderView

Класс заказа, наследуемый от общего класса `View`, который будет отображать шаги формы заказа и генерировать события ввода, а также перехода к следующему шагу и отправки формы

#### Класс CatalogView

Класс каталога, наследуемый от общего класса `View`, который будет отображать карточки товара в каталоге на главной странице

#### Класс ModalView

Класс модального окна, наследуемый от общего класса `View`, который будет отображать модальное окно. Если в метод `render` передается значение `null`, то скрываем модально окно, а если передаем значение типа `HTMLElement`, то показываем модальное окно согласно переданному значению

#### Класс FormView

Класс формы, наследуемый от общего класса `View`, который будет отображать формы. В этом классе будет также происходить emit событий submit и изменение полей ввода

#### Класс LoaderView

Класс отображения состояния загрузки, наследуемый от общего класса `View`, который будет показывать лоадер при какой-либо загрузке

#### Класс NotifyView

Класс отображения уведомления пользователей, наследуемый от общего класса `View`, который будет показывать, например, сообщение об успешной отправки формы

### Презентер

#### Файл index.ts

В качестве презентера, то есть сущности, которая будет связывать данные(Model) и отображение(View), будет выступать данный файл. Посредством брокера событий мы будем тригерить необходимые события и отлавливать их в данном файле. В данном файле будут отлавливаться следующие события:

-   `cards:change` - изменение списка карточек товаров;
-   `basket:change` - изменение списка товаров в корзине;
-   `preview:change` - открытие превью-модальное окно для карточки товара;
-   `formErrors:change` - изменение ошибки валидации форм;
-   `basket:open` - открытые модального окна корзины;
-   `order:open-step-order` - открытые модального окна формы заказа со способом оплаты и доставки;
-   `order:open-step-contacts` - открытые модального окна формы заказа с контактными данными;
-   `order:submit` - отправка формы заказа;
-   `modal:open` - открытие любого модального окна;
-   `modal:close` - закрытие любого модального окна;

### Общее

#### Класс WebLarekAPI

Класс представляет собой интерфейс для работы с запросами. В конструктор принимает следующие параметры - `cdn: string, baseUrl: string, options?: RequestInit`. В конструкторе через композицию инициализируем базовый класс Api для работы с запросами. В классе имплементированы следующие методы:

-   `getProducts(): Promise<ICatalog>` - метод позволяет отправить запрос с `GET` методом для получения списка продуктов;
-   `getProduct(id: string): Promise<ICardModel>` - метод позволяет отправить запрос с `GET` методом для получения конкретного продукта по переданному id;
-   `postOrder(order: TOrderRequest): Promise<IOrderResult>` - метод позволяет отправить запрос с `POST` методом для отправки заказа, который передан в качестве аргумента `order`;
