Teemill style guide.
Most of these are suggested changes from phpcs.
 
# PHP
```diff
Line limit
+ 80 characters
 
Indent
+ 4 Spaces
- 1 Tab
- 2 Spaces
```
 
## Classes
```php
namespace \App\Modules\Magic\Classes;

class MyNewClass {
  // Relations
  BelongsTo
  BelongsToMany
  HasOne
  HasMany

  // Methods
  public static
  public
  protected static
  protected
  private static
  private
}
```
 
### Properties
 
#### Public
- Public properties should be snake case.
```php
Good:
public $variable_a = '123';
public static $variable_b = '123';
 
Bad:
public $variableA = '123';
public static $variableB = '123';
```

#### Protected
- Public properties should be snake case.
- Private properties should start with an underscore.
```php
Good:
private $_variable_a = '123';
private static $_variable_b = '123';

Bad:
private $variable_a = '123';
private $variableA = '123';
```
 
#### Private
- Public properties should be snake case.
- Private properties should start with an underscore.
```php
Good:
private $_variable_a = '123';
private static $_variable_b = '123';

Bad:
private $variable_a = '123';
private $variableA = '123';
```
 
#### Constants
```php
Good:
const $VARIABLE_A = '123';

Bad:
const $variable_a = '123';
const $variableA = '123';
```

### Methods
```php
Good:
/**
 * Not even I know what this method does.
 *
 * @param Int $test This a parameter of the method.
 *
 * @return Int I return an integer.
 */
public function methodName(Int $test) {
    return $test + 1;
}
```

## If Statements
- Params should put on multilines if they exced the line limit.
```php
Good:
if ($test === '123') {
   // code
}

if (
     $test === '123'
  && $test2 === '321'
) {
   // code
}
```
 
## Functions and Methods
- All params should be type strict (Any type can be used where the type is unknown).
- All methods should have documentation, including list of @params and a @return.
- Params should put on multilines if they exced the line limit.
```php
Good:
function (String $iamstring, $optional = false) {
    // code
}

function (
    String $iam,
    Any $very,
    Int $long,
    Boolean $with_many
    \Closure $params,
    $optional = false
) {
    // code
}

Bad:
function ($iam, $very, $long, $with_many, $params, $optional = false)
{
    // code
}
```


# Vue
## Components
### Structure
```html
Good:
<template>
  <div class="tml-component-name">
     <!-- Template Code -->
  </div>
</template>

<script>
export default {
  name: 'tml-component-name',
};
</script>

<style>
.tml-component-name {
  // Scss Styles
}
</style>
```
#### Data
```javascript
Good:
data: () => ({
    some: 123,
    data: 'abc',
    to: 345,
    store: 'vuex',
}),

Bad:
data() {
    return {
        some: 123,
        data: 'abc',
        to: 345,
        store: 'vuex'
    };
},
```

# JavaScript
## Promises
```javascript
const newPromise = new Promise((resolve, reject) => {
    if (shouldResolve) {
        resolve('I am resolved');
    } else {
        reject();
    }
});

newPromise.then((value) => {
    console.log(value);
});

newPromise.then((value) => {
    console.log(value);
}).catch(() => {
    console.log('It\'s Fucked');
});


this.test.aReallyBigVariableName.newPromise2
    .then((value) => {
        console.log(value);
    }).catch(() => {
        console.log('It\'s Fucked');
    });
```

## Classes
