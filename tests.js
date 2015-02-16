console.log("****** Cons list funcs ******");

const conslist = cons(1, cons(2, cons(3, cons(4, null))));
const oneToFour = list(1,2,3,4);
const fiveToMore = list(5,6,7,8);
const lots = append(append(oneToFour, fiveToMore), append(oneToFour, fiveToMore));

console.assert(len(oneToFour) === 4, "List constructor gives incorrect length");
console.assert(len(conslist) === 4, "Cons list not correctly constucted");

{
  const consElement = cons(10, oneToFour);
  lg("cons list:", str(consElement));
  console.assert(len(consElement) === 5, "Element not added to list");
  console.assert(car(consElement) === 10, "Element not added to head");
}

lg("append:", str(append(oneToFour, fiveToMore)));

{
  // Index test
  const fourth = idx(oneToFour, 3);
  lg("idx:", fourth);
  console.assert(fourth === 4, "Fourth element should be 4");
}

{
  const ln = len(oneToFour);
  lg("len:", ln);
  console.assert(ln === 4, "Length should be 4");
}

{
  const lst = last(fiveToMore);
  lg("last:", lst);
  console.assert(lst === 8, "Last element should be 8");
}

lg("reverse:", str(rev(fiveToMore)));

lg("map:", str(mapl(x => x * x, lots)));

const desc = [1,2,3,4,5,6,7,8,9,10];
const asc = reverse(desc);
const letters = "abcdefg".slice("");

console.log("****** Arrays: recursive funcs ******");

lg( "map:", map(a => a * a, desc) );
lg( "filter:", filter1(a => a < 3 || a > 8, desc) );
lg( "elem:", elem(5, desc), elem(100, desc));
lg( "any:",
  any(x => x === "f", letters),
  any(x => x === "z", letters) );
lg( "all:",
  all(x => x < 5, desc),
  all(x => x <= 10, desc) );
lg( "foldl", foldl ((acc, x) => acc + ":" + x, 0, desc) );
lg( "foldr", foldr ((x, acc) => acc + ":" + x, 0, desc) );
lg( "reverse:", reverse(desc) );
lg( "zip:", zip(desc, letters).join(" ") );
lg( "flip:", flip (zip) (desc, letters).join(" ") );
lg( "zipWith:", zipWith (Math.max, desc, asc) );
lg( "take:", take(5, desc) );
lg( "takeWhile:", takeWhile(el => el < 8, desc) );
lg( "interleave:", interleave(desc, asc) );

const sq = a => a * a;
const sub1 = a => a - 1;

lg( "compose:", compose(sq, sub1)(10) );

lg( "even filter:", even(desc));
lg( "quicksort:", quicksort(interleave(take(5, desc), take(5, asc))) );
