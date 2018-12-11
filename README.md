# he-loader
every app consists of various components and the need to Module to take control of loading and passing data in secure way between these components becoms huge when the app scale.

so this module for Manage and load app components.

## Install

just run

```
$ npm install he-loading
```

## Usage

in your application bootstrap file import the Loader

```typescript
import { Loader } from 'he-loader';
```

then create new instace

```typescript
const loader = new Loader();
```

and Optionaly you can pass options Object and it must be implemets `OptionsInterface`

```typescript
import { Loader, OptionsInterface } from 'he-loader';

const opts: OptionsInterface = {};
const loader = new Loader(opts);
```

now you are ready to go...

```typescript
const app = loader.load([
    new Component(),
    new Component2()
]);
```

the Loader will load these components in sequence and share `Settings` Class between them to hold any data you need to pass between them.

more about this below.

## create component
the component is just a calss that holds the required operations to initiate part of your app for example DB, Logger, Routes engine, Error handler, ...etc

to create a component create a class that implements `ComponentInterface` like so..

```typescript
import { ComponentInterface, Settings } from 'he-loading';

export default class DBComponent implements ComponentInterface {

    load(settings: Settings) {
        // do whatever you need to init your DB
    }
}
```

that's it, this is the only required method in the class and you are freely to add any desired methods ot properties.

> Notice: the load method can be async or return a new Promise if it contains async operations that we need to await for them.

you can now load this Component like we descriped above :) :)

## Share Data between Components
it's not recommended that one component is dependent on another component data, But the feature is here anyway.

you should be noticed the `settings` prop that load method accepts by now.

the `settings` is an instane of `Seetings` class in `he-loader` and used to share data between components

```typescript
load(settings: Settings) {
    // do whatever you need to init your DB
    // pretend you need to pass db connection to another component
    const DBConnection = {};

    // set the connection into the settings
    setings.set('dbConnection', DBConnection);
}
```

then from any other component load method

```typescript
load(settings: Settings) {
    // get the connection from settings
    const DBConnection = setings.get('dbConnection');
}
```
but you must note that in this case you need to load DBComponent first then the other component.

```typescript
const app = loader.load([
    new DBComponent(),
    new OtherComponent()
]);
```

## Error Handling

the app const that we created above returns a Promise.
so you can use `.then()` and `.catch()` methods to catch any thing bad :)

```typescript
const app = loader.load([]);

app.then((settings: Settings) => console.log("Application is up and running."));

app.catch(error => console.log(`Application is crashed: ${error}`));
```

I'm Welcoming with any suggestions or contribution or Issue reporting :) :)