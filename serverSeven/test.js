let arr2 = [
  {
    id: "5874c5d8-cae4-4b53-9842-f63541a2a0da",
    fullName: "ibrahim",
    age: 32,
    phoneNumber: 95735029,
  },
  {
    id: "cb671f9e-87e9-422e-9110-7e98b721124c",
    fullName: "zoheb",
    age: 25,
    phoneNumber: 12345678,
  },
];

// let arr = arr2.find(u=>u)
// console.log(arr2.find(u=>u));
// console.log(arr2.filter(u=>{
//     u
// }));

// let x = arr2.filter((obj) => {
//   obj.age == 25;
// });

// console.log(x);

let test = arr2.filter((x)=>x.age < 35)
console.log(test);