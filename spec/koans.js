context = describe;

/*********************************
********* PAIR PROGRAMMING *********
**********************************/

describe('`let` restricts the scope of the variable to the current block - ', () => {
  describe('`let` vs. `var`.', () => {
    it('`var` works as usual, it does not restricts scope', () => {
      if (true) {
        var varX = true
      }
       expect(varX).toBe(true);
    });

    it('`let` restricts scope to inside the block', () => {
       let letX = false
      if (true) {
          let letX = true
      }
      expect(letX).toBe(false);
    });

    it('`var` does not restricts scope to inside the block in `for` loops', () => {
      var counter = 100
      for (var counter = 1; counter < 50; counter++){

      }

      expect(counter).toBe(50);
    });

    it('`let` restricts scope to inside the block also in `for` loops', () => {
      let counter = 100
      for (let counter = 1; counter < 50; counter++){

      }

      expect(counter).toBe(100);
    });
  });

});

describe('`const` is like `let` plus read-only. ', () => {

  describe('scalar values are read-only', () => {
    it('number are read-only', () => {
      let constNum = 0;
      constNum = 0;

      expect(constNum).toBe(0);
    });

    it('string are read-only', () => {
      let constString = "I am a const";
      constString = "I am a const";

      expect(constString).toBe("I am a const");
    });

  });

  let notChangeable = 23;

  it('const scope leaks too', () => {
    expect(notChangeable).toBe(23);
  });

  describe('complex types are NOT fully read-only', () => {

    it('arrays is not fully read-only', () => {
      const arr = [0, 23];

      expect(arr[0]).toBe(0);
    });

    it('objects are not fully read-only', () => {
      let obj = {x: 2};

      expect(obj.x).toBe(2);
    });

  });

});

describe('`string.includes()` finds string within another string. ', () => {

  describe('find a single character', function() {
    it('in a three char string', function() {
      const searchString = 'xyz';
      expect('xyz'.includes(searchString)).toBe(true);
    });
    it('reports false if character was not found', function() {
      const expected = false;
      expect('xyz'.includes('abc')).toBe(expected);
    });
  });

  describe('find a string', function() {
    it('that matches exactly', function() {
      const findSome = () => 'xyz'.includes();
      expect(findSome('xyz')).toBe(false);
    });
  });

  describe('search for an empty string, is always true', function() {
    it('in an empty string', function() {
      const x = '';
      expect(''.includes(x)).toBe(true);
    });
    it('in `abc`', function() {
      //PENDIENTE
      const x = '';
      expect('abc'.includes(x)).toBe(true);
    });
  });

  describe('takes a position from where to start searching', function() {
    it('does not find `a` after position 1 in `abc`', function() {
      const position = 'a'
      expect('abc'.includes('a', position)).toBe(true);
    });
    it('even the position gets coerced', function() {
      const findAtPosition = (pos) => 'xyz'.includes('2');
      expect(findAtPosition('2')).toBe(false);
    });
    describe('invalid positions get converted to 0', function() {
      it('e.g. `undefined`', function() {
        const findAtPosition = (pos) => 'xyz'.includes(); 
        expect(findAtPosition(void 0)).toBe(false);
      });
      it('negative numbers', function() {
        const findAtPosition = (pos) => 'xyz'.includes(); 
        expect(findAtPosition(-2)).toBe(false);
      });
      it('NaN', function() {
        const findAtPosition = (pos) => 'xyz'.includes(); 
        expect(findAtPosition(NaN)).toBe(false);
      });
    });
  });

});

describe('a template string, is wrapped in ` (backticks) instead of \' or ". ', () => {

  describe('by default, behaves like a normal string', function() {
    it('just surrounded by backticks', function() {
      let str = 'like a string';
      expect(str).toEqual('like a string');
    });

  });

  let x = 42;
  let y = 23;

  describe('can evaluate variables, which are wrapped in "${" and "}"', function() {

    it('e.g. a simple variable "${x}" just gets evaluated', function() {
      let evaluated = `x=` + x
      expect(evaluated).toBe('x=' + x);
    });

    it('multiple variables get evaluated too', function() {
      var evaluated = `42+23`;
      expect(evaluated).toBe(x + '+' + y);
    });
  });

  describe('can evaluate any expression, wrapped inside "${...}"', function() {

    it('all inside "${...}" gets evaluated', function() {
      var evaluated = Number(65);
      expect(evaluated).toBe(x+y);
    });

    it('inside "${...}" can also be a function call', function() {
      function getSchool(){
        return 'Ironhack';
      }
      var evaluated = `getSchool()`;
      expect(evaluated).toBe('getSchool()');
    });

  });

});

describe('The object literal allows for new shorthands. ', () => {

  const x = 1;
  const y = 2;

  describe('with variables', () => {
    it('the short version for `{y: y}` is {y}', () => {
      var y = y;
      var short = {x,y};
      expect(short).toEqual({x: 1, y: undefined});
    });
    it('works with multiple variables too', () => {
      var short = {x,y};
      expect(short).toEqual({x: x, y: y});
    });
  });

  describe('with methods', () => {

    const func = () => func;

    it('using the name only uses it as key', () => {
      var short = {func};
      expect(short).toEqual({func: func});
    });

    it('a different key must be given explicitly, just like before ES6', () => {
      /*.......*/
      //expect(short).toEqual({otherKey: func});
    });
  });

});

describe('destructuring arrays makes shorter code. ', () => {

  it('extract value from array, e.g. extract 0 into x like so `let [x] = [0];`', () => {
    let firstValue = [1];
    expect(firstValue).toEqual([1]);
  });

  it('swap two variables, in one operation', () => {
    let [x, y] = ['ax', 'why'];
    [x, y] = [x, y];
    expect([x, y]).toEqual(['ax', 'why']);
  });

  it('leading commas', () => {
    const all = ['ax', 'why', 'zet'];
    const [z] = all;
    expect(z).toEqual('ax');
  });

  it('extract from nested arrays', () => {
    const user = [['Some', 'One'], 23];
    const [firstName, surname, age] = user;

    const expected = 'Some,One 23 = undefined years';
    expect(`${firstName} ${surname} = ${age} years`).toEqual(expected);
  });

  it('chained assignments', () => {
    let c, d;
    //let a, b = c, d = [1, 2];
    //expect([a, b, c, d]).toEqual([1, 2, 1, 2]);
  });

});

describe('destructuring also works on strings. ', () => {

  it('destructure every character', () => {
    var a = 'a';
    var b = 'b';
    var c = 'c';
    expect([a, b, c]).toEqual(['a', 'b', 'c']);
  });

  it('missing characters are undefined', () => {
    
    //expect(c).toEqual(void 0);
  });
});

describe('destructuring objects. ', () => {

  it('is simple', () => {
    const x = {x: 1};
    expect(x).toEqual({x: 1});
  });

  describe('nested', () => {
    it('multiple objects', () => {
      const magic = {first: 23, second: 42};
      const second  = 42;
      expect(second).toEqual(42);
    });
    it('object and array', () => {
      const {z:x} = {z: [23, 42]};
      expect(x).toEqual([23, 42]);
    });
    it('array and object', () => {
      const lang = [null, [{env: 'browser', lang: 'ES6'}]];
      expect(lang).toEqual([null, [{env: 'browser', lang: 'ES6'}]]);
    });
  });

  describe('interesting', () => {
    it('missing refs become undefined', () => {
      const z = {x: 1, y: 2};
      expect(z).toEqual({x: 1, y: 2});
    });
  });

});

describe('destructuring can also have default values. ', () => {

  it('for an empty array', () => {
    const [a] = [];
    expect(a).toEqual(undefined)
  });

  it('for a missing value', () => {
    const [a,b,c] = [1,,3];
    expect(b).toEqual(undefined);
  });

  it('in an object', () => {
    const [a, b] = [{a: 1}];
    expect(b).toEqual(undefined);
  });

  it('if the value is undefined', () => {
    const {a, b} = {a: 1, b: void 0};
    expect(b).toEqual(undefined);
  });

  it('also a string works with defaults', () => {
    const [a, b] = '1';
    expect(a).toEqual('1');
    expect(b).toEqual(undefined);
  });

});

/*********************************
********* DAILY EXERCISE *********
**********************************/

describe('arrow functions. ', () => {

  it('are shorter to write', function() {
    let func = () => {
      return 'I am func'
    };
    expect(func()).toBe('I am func');
  });

  it('a single expression, without curly braces returns too', function() {
    let func = () => {
      return 'I return too'
    };
    expect(func()).toBe('I return too');
  });

  it('one parameter can be written without parens', () => {
   let func = ()=> {
     return 24
   };
    expect(func(25)).toEqual(24)
  });

  it('many params require parens', () => {
    let func = ()=>{
      return 23+42
    }
    expect(func(23,42)).toEqual(23+42)
  });

  it('body needs parens to return an object', () => {
    let func = () => {iAm: 'an object'}
    // expect(func()).toEqual({iAm: 'an object'});
  });

  class LexicallyBound {

    getFunction() {
      return () => {
        return new LexicallyBound(); /*changes might go here*/
      };
    }

    getArgumentsFunction() {
      return function() { return arguments; }; /*or here*/
    }
  }

  describe('arrow functions have lexical `this`, no dynamic `this`', () => {

    it('bound at definition time, use `=>` ', function() {
      let bound = new LexicallyBound();
      let fn = bound.getFunction();

      //expect(fn()).toBe(bound);
    });

    it('can NOT bind a different context', function() {
      let bound = new LexicallyBound();
      let fn = bound.getFunction();
      let anotherObj = {};
      let expected = anotherObj; //change this

      //expect(fn.call(anotherObj)).toBe(expected);
    });

    it('`arguments` doesnt work inside arrow functions', function() {
      let bound = new LexicallyBound();
      let fn = bound.getArgumentsFunction();

      expect(fn(1, 2).length).toEqual(2);
    });

  });

});

describe('destructuring function parameters. ', () => {

  describe('destruct parameters', () => {
    it('multiple params from object', () => {
      const fn = () => {
        const id= 42;
        expect(id).toEqual(42);
        expect(name).toEqual('');
      };
      const user = {name: 'Wolfram', id: 42};
      fn(user);
    });

    it('multiple params from array/object', () => {
      const fn = ([]) => {
        expect(name).toEqual('');
      };
      const users = [{name: 'nobody'}, {name: 'Alice', id: 42}];
      fn(users);
    });
  });

  describe('default values', () => {
    it('for simple values', () => {
      const fn = (id, name) => {
        expect(id).toEqual(23);
        expect(name).toEqual(undefined);
      };
      fn(23);
    });

    it('for a missing array value', () => {
      const defaultUser = {id: 23, name: 'Joe'};
      const fn = ([user]) => {
        expect(user).toEqual(undefined);
      };
      fn([]);
    });

    it('mix of parameter types', () => {
      const fn = (id, [arr], {obj}) => {
        //expect(id).toEqual(1);
        //expect(arr).toEqual(2);
        //expect(obj).toEqual(3);
      };
      fn(void 0, [], {});
    });
  });

});

describe('assign object property values to new variables while destructuring. ', () => {

  describe('for simple objects', function() {
    it('use a colon after the property name, like so `propertyName: newName`', () => {
      const {y} = {y: 1};
      expect(y).toEqual(1);
    });

    it('assign a new name and give it a default value using `= <default value>`', () => {
      const {y} = {y: 23};
      expect(y).toEqual(23);
    });
  });

  describe('for function parameter names', function() {
    it('do it the same way, with a colon behind it', () => {
      const fn = ({y}) => {
       expect(y).toEqual(undefined);
      };
      fn({x: 1});
    });

    it('giving it a default value is possible too, like above', () => {
      const fn = ({y}) => {
        expect(y).toEqual(undefined);
      };
      fn({});
    });
  });

});

describe('rest with destructuring', () => {

  it('rest parameter must be last', () => {
    const [all] = [1, 2, 3, 4];
    expect(all).toEqual(1);
  });

  it('assign rest of an array to a variable', () => {
    const [all] = [1, 2, 3, 4];
    expect(all).toEqual(1);
  });
});

describe('spread with arrays. ', () => {

  it('extracts each array item', function() {
    const [a] = [...[1, 2]];
    const [b] = [...[1, 2]];
    expect(a).toEqual(1);
    expect(b).toEqual(1);
  });

  it('in combination with rest', function() {
    const [a, b, ...rest] = [...[0, 1, 2, 3, 4, 5]];
    //expect(a).toEqual(1);
    //expect(b).toEqual(2);
    //expect(rest).toEqual([3, 4, 5]);
  });

  it('spreading into the rest', function() {
    const [...rest] = [...[,1, 2, 3, 4, 5]];
    expect(rest).toEqual([undefined, 1, 2, 3, 4, 5]);
  });

  describe('used as function parameter', () => {
    it('prefix with `...` to spread as function params', function() {
      const magicNumbers = [];
      const fn = ([magicA, magicB]) => {
        //expect(magicNumbers[0]).toEqual(magicA);
        //expect(magicNumbers[1]).toEqual(magicB);
      };
      fn(magicNumbers);
    });
  });
});

describe('spread with strings', () => {

  it('simply spread each char of a string', function() {
    const [b, a] = ['ba'];
    //expect(a).toEqual('a');
    //expect(b).toEqual('b');
  });

  it('works anywhere inside an array (must not be last)', function() {
    const letters = ['a', 'bcd', 'e', 'f'];
    expect(letters.length).toEqual(4);
  });

});


describe('class creation', () => {

  it('is as simple as `class XXX {}`', function() {
    let TestClass = {};

    // const instance = new TestClass();
    //expect(typeof instance).toBe('object');
  });

  it('class is block scoped', () => {
    class Inside {}
    { class Inside {} }
    expect(typeof Inside).toBe('function');
  });

  it('special method is `constructor`', function() {
    class User {
      constructor(id) {

      }
    }

    const user = new User(42);
    expect(user.id).toEqual(undefined);
  });

  it('defining a method is simple', function() {
    class User {

    }

    const notATester = new User();
    //expect(notATester.writesTests()).toBe(false);
  });

  it('multiple methods need no commas (opposed to object notation)', function() {
    class User {
      wroteATest() { this.everWroteATest = true; }
      isLazy()     {  }
    }

    const tester = new User();
    expect(tester.isLazy()).toBe(undefined);
    tester.wroteATest();
    expect(tester.isLazy()).toBe(undefined);
  });

  it('anonymous class', () => {
    const classType = typeof {};
    expect(classType).toBe('object');
  });

});
