// 배열
// 자바스크립트 배열은 매우 유연하고 내부에 모든 타입의 값을 혼합해서 저장할 수 있다.
// 그러나 대부분의 개별 자바스크립트 배열은 하나의 특정 타입의 것만 가진다. 다른 타입의 값을 추가하게 되면 배열을 읽을 때 혼란을 줄 수 있으며,
// 최악의 상황으로는 프로그램에 문제가 될 만한 오류가 발생할 수도 있다.

// 타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 작동하도록 제한한다.
// 이런 방식으로 배열의 데이터 타입을 하나로 유지시킨다.

// 다음 예제에서 타입스크립트는 users 배열이 초기에 string 타입의 값을 포함한다는 것을 알고 있으므로, 이후 string 타입의 값 추가는 허용하지만
// 다른 데이터 타입 추가는 허용하지 않는다.

const users = ["용쿠","딸쿠","마쿠"];
users.push("칠리맛 쿠키"); // OK: "용쿠"의 타입은 string
users.push(true); //Error:'boolean' 형식의 인수는 'string' 형식의 매개 변수에 해당될 수 없다.

// 타입스크립트가 초기 배열에 담긴 요소를 통해 배열의 타입을 유추하는 방법은 변수의 초깃값에서 변수 타입을 유추하는 방법과 유사하다.
// 타입스크립트는 값이 할당되는 방식에서 코드의 의도된 타입을 이해하려고 시도하며 배열도 예외는 아니다.

// 1. 배열 타입
// 배열에 대한 타입 애너테이션은 배열의 요소 타입 다음에 []가 와야 한다.
let arrayOfNumbers: number[];
arrayOfNumbers = [1,2,3,4,5];

// 1.1 배열과 함수 타입
// 배열 타입은 함수 타입에 무엇이 있는지를 구별하는 괄호가 필요한 구문 컨테이너의 예이다.
// 괄호는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입 묶음인지 나타내기 위해 사용된다.

// 타입은 string 배열을 반환하는 함수
let createStrings: ()=>string[];

// 타입은 각각의 string을 반환하는 함수 배열
let stringCreators: (()=>string)[];

// 1.2 유니언 타입 배열
// 배열의 각 요소가 여러 선택 타입 중 하나일 수 있음을 나타내려면 유니언 타입을 사용한다.

// 타입은 string 또는 number의 배열
let stringOrArrayOfNumbers:string | number[];

// 타입은 각각 number 또는 string인 요소의 배열
let arrayOfStringOfNumbers:(string | number)[];

// 타입은 (string | undefined)[]
const optionalNames:(string | undefined)[] = ["용쿠", "딸쿠", undefined, "마쿠", undefined];

// 1.3 any 배열의 진화
// 초기에 빈 배열로 설정된 변수에서 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 any[]로 취급하고, 모든 콘텐츠를 받을 수 있다.
// 하지만 any 변수가 변경되는 것처럼 any[] 배열이 변경되는 것은 좋지 않다.
// 타입 애너테이션이 없는 빈 배열은 잠재적으로 잘못된 값 추가를 허용해 타입스크립트의 타입 검사기가 갖는 이점을 부분적으로 무력화 시키기 때문이다.

// 다음 예제는 values 배열은 any 요소르ㅜㄹ 갖고 시작해 string 요소를 포함하도록 바꾼 다음, 다음 number | string 요소로 바꾼다.

// 타입: any[]
let values:any[] = [];

// 타입: string[]
values.push("김아무개");

// 타입: (number | string)[]
values[0] = 0;

// 만약 strictNullChecks와 noImplicitAny 컴파일러 옵션이 모두 활성화되어 있다면,
// 상황에 따라 never[]로 추론될 수도 있다.
// never[]는 "이 배열에는 어떤 종류의 값도 들어올 수 없다"는 의미로, 빈 배열 리터럴이 특정 컨텍스트에서 사용될 때
// TypeScript가 더 엄격하게 타입을 검사하려고 할 때 나타날 수 있다.

// 1.4 다차원 배열
// 2차원 배열 또는 배열의 배열은 두 개의 [](대괄호)를 갖는다.
let arrayOfArrayOfNumbers: number[][]; // === (number[])[];
arrayOfArrayOfNumbers = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

// 2. 배열 멤버
// 타입스크립트는 배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어이다.
// 유니언 타입으로 된 배열의 멤버는 그 자체로 동일한 유니언 타입이다. 

const defenders = ["용쿠","딸쿠","마쿠"];
const defender = defenders[0]; // 타입: string

const soldierOrDates = ["용쿠", new Date(1782,6,3)];
const soldierOrDate = soldierOrDates[0]; // 타입: string | date

// 3. 스프레드와 나머지 매개변수 
// 3.1 스프레드
// ... 스프레드 연산자를 사용해 배열을 결합한다. 타입스크립트는 입력된 배열 중 하나의 값이 결과 배열에 포함될 것임을 이해한다.
// 입력된 배열이 동일한 타입이라면, 출력 배열도 동일한 타입이다.
// 서로 다른 타입의 두 배열을 함께 스프레드에 새 배열을 생성하면, 새 배열은 두 개의 원래 타입 중 어느 하나의 요소인 유니언 타입 배열로 이해한다.

const soldiers = ["용쿠","딸쿠","마쿠"]; // 타입: string[]
const soldierAges = [10, 20, 30]; // 타입: number[]
const conjoined = [...soldiers, ...soldierAges] // 타입: (string | number)[]

// 3.2 나머지 매개변수 스프레드
// 타입스크립트는 나머지 매개변수로 배열을 스프레드하는 자바스크립트 실행을 인식하고 이에 대해 타입 검사를 수행한다.
// 나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 한다.

function logWarriors(greeting: string, ...names: string[]){
  for(const name of names){
    console.log(`${greeting}, ${name}`);
  }
}
const warriors = ['용쿠','딸쿠','마쿠'];
const birthYears = [1844, 1740, 1592];

logWarriors("hello", ...warriors);
logWarriors("hello", ...birthYears); // Error: 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없다.

// 4. 튜플
// 자바스크립트 배열은 이론상 어떤 크기라도 될 수 있다.
// 하지만 때때로 튜플 Tuple이라고 하는 고정된 크기의 배열을 사용하는 것이 유용하다.
// 튜플 배열은 각 인덱스에 알려진 특정 타입을 가지며, 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더 구체적이다.
// 튜플 타입을 선언하는 구문은 배열 리터럴처럼 보이지만, 요소의 값 대신 타입을 적는다.

let yearAndWarrior: [number, string];
yearAndWarrior = [123, '용감한 쿠키']; // OK
yearAndWarrior = [false, '마법사맛 쿠키']; // Error: 'boolean' 형식은 'number' 형식에 할당할 수 없다.
yearAndWarrior = [1000]; // Error: '[number]' 형식은 '[number, string]' 형식에 할당할 수 없다.

// 자바스크립트에서는 단일 조건을 기반으로 두 개의 변수에 초깃값을 설정하는 것처럼 한 번에 여러 값을 할당하기 위해 튜플과 배열 구조 분해 할당을 자주 사용한다.
let [year, warrior] = Math.random() > 0.5 ? ["340","용쿠"] : [1820, "딸쿠"];
// let [username, email] = user > 0.5 ? [user.username, user.email] : ['알 수 없음','미등록'];

// 4.1 튜플 할당 가능성
// 타입스크립트에서 튜플 타입은 가변 길이의 배열 타입보다 더 구체적으로 처리된다. 즉, 가변 길이의 배열 타입은 튜플 타입에 할당할 수 없다.
// 다음 코드에서 우리는 pairLoose 내부에 [boolean, number]가 있는 것을 볼 수 있지만, 타입스크립트는 더 일반적인 (boolean, number)[] 타입으로 유추된다.

const pairLoose = [false, 123];
const pairTupleLoose: [boolean, number] = pairLoose; // Error: '(number | boolean)[]' 형식은 '[boolean, number]' 형식에 할당할 수 없다. 

// pairLoose가 [boolean, number] 자체로 선언된 경우 pairTupleLoose에 대한 값 할당이 허용되었을 것이다.
// 하지만 타입스크립트는 튜플 타입의 튜플에 얼마나 많은 멤버가 있는지 알고 있기 때문에 길이가 다른 튜플은 서로 할당할 수 없다.

// 다음 tupleTwoExtra는 정확히 두 개의 멤버를 가져야 하므로 tupleThree가 올바른 멤버로 시작하더라도 세 번째 멤버는 tupleTwoExtra에 할당할 수 없다.

const tupleThree: [boolean, number, string] = [false, 1592, 'lee'];
const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];
const tupleTwoExtra: [boolean, number] = tupleThree; // Error: '[boolean, number, string]' 형식은 '[booleanm, number]'형식에 할당할 수 없다.

// 4.2 나머지 매개변수로서의 튜플
function logPair(name: string, value: number) {
  console.log(`${name} has ${value}`);
}
const pairArray = ["Amage", 1]; // 타입: (string | number)[]
logPair(...pairArray); // Error: 확산 인수는 튜플 유형을 가지거나 나머지 매개 변수로 전달되어야 한다.

const pairTupleIncorrectr: [number, string] = [1, 'Amage'];
logPair(...pairTupleIncorrectr); // 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없다.

const pairTupleCorrect: [string, number] = ['Amage', 1];
logPair(...pairTupleCorrect); //Ok