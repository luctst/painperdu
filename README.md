# Painperdu
---
*Create shortcuts label to navigate on your apps routes*

## Usage
**With Javascript vanilla**

Include our CDN inside your `.html` files
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pain perdu with CDN</title>
</head>
<body>
    <script src="https://unpkg.com/painperdu/dist/painperdu.umd.js"></script>
    <script>
        // You can now use Pain perdu by pressing CMD + K
        painPerdu([
            { path: '/home', label: 'hm' },
            // Add more routes
        ]);
    </script>
</body>
</html>
```

**with NPM**

First
```
npm i painperdu
```

Then
```js
// index.js
import painPerdu from 'painperdu';
painPerdu([
    { path: '/home', label: 'hm' },
    // add more routes
]);
```

## Install
```
npm i 
```

**development**
```
npm run dev
```

**lint**
```
npm run lint
```

**fix lint**
```
npm run lint:fix
```

**test**
```
npm run test
```

**ts type check**
```
npm run type:watch
```

> **Note** - When you're commiting some files we're using husky with the npm run lint:fix script to ensure no errors are detected plus commitlint.

## API
### main(routes[object]);
**routes**

Type: `array` required

An array of object with routes data.

**object.path**

Type: `String` - Required

Path of your route to load, ex: `/path`.

**object.label**

Type: `String` - Required

Data to search when looking for some route, ex: 'hm'.