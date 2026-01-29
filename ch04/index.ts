// 함수
// 한쪽 끝에는 함수 인수/인자가 있고, 다른 쪽 끝에는 반환 타입이 있다.

// 1. 함수 매개변수
// sing 함수를 작성한 개발자가 song 매개변수를 제공하기 위해 의도한 값의 타입은 무엇일까?
// 명시적 타입 정보가 없다면 절대 타입을 알 수 없다.
// 타입스크립ㅂ트가 이를 any 타입으로 간주하며 매개변수의 타입은 무엇이든 될 수 있다.

// implicitly = 암묵적으로

function sing1(song){
  console.log(`Singing: ${song}!`);
}

function sing2(song: string){
  console.log(`Singing: ${song}!`);
}

// 1.1 필수 매개변수
// 자바스크립트에서는 인수의 수와 상관없이 함수를 호출할 수 있다.
// 하지만 타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정한다.

// javascript
// function sing3(first, second){
//   console.log(`${first} | ${second}`);
// }

// typescript
function sing3(first:string, second:string){
  console.log(`${first} | ${second}`);
}
sing3("첫번쨰 인자"); // Error: 2개의 인수가 필요한데 1개를 가져왔다.
sing3("첫번째 인자","두번쨰 인자"); // OK
sing3("첫번째 인자","두번쨰 인자","세번째 인자"); // Error: 2개의 인수가 필요한데 3개를 가져왔다.

// 매개변수는 인수로 받은 것으로 예상되는 함수의 선언을 나타낸다.
// 인수는 함수를 호출할 때, 매개변수에 제공되는 값을 나타낸다.

function fn(x: string, y: string, z: string){
  console.log("x: ", x);
  console.log("y: ", y);
  console.log("z: ", z);
}
// 위 함수에서 x, y, z는 매개변수라고 하고

fn('용감한 쿠키', '딸기맛 쿠키', '마법사맛 쿠키') // => 용쿠, 딸쿠, 마쿠는 인수/인자라고 부른다.

// 1.2 선택적 매개변수
// 자바스크립트에서 함수 매개변수가 제공되지 않으면 함수 내부의 인수값은 undefined으로 기본값이 설정된다는 것을 떠올려보자.
// 때로는 함수 매개변수를 제공할 필요가 없을 때 있고, undefined 값을 위해 의도적으로 사용할 수도 있다.
// 타입스크립트가 이러한 선택적 매개변수에 인수를 제공하지 못하는 경우, 타입 오류를 보고하지 않았으면 할 때도 있다.
// 타입스크립트에서는 선택적 객체 타입 속성과 유사하게 타입 애너테이션 : 앞에 ?를 추가해 매개변수가 선택적이라고 표시한다.
// 선택적 매개변수에는 항상 | undefined가 유니언 타입으로 추가되어 있다.

function announceSong(song: string, singer?: string){
  console.log("song: ", song);

  if(singer){
    console.log("singer: ", singer);
  }
}
announceSong("RE:WIND"); //OK
announceSong("ROCKDOWN", undefined); //OK
announceSong("겨울봄 ", "KIDDING"); //OK