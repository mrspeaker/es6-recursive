// Helpers
let xxs = (a) => [a[0], a.slice(1)], // Should be destructured - not impl. in Firefox yet
	xsx = (a) => [a.slice(0, -1), a[a.length - 1]],
	isEmpty = (a) => a.length === 0,
	isEmpties = (...a) => any(isEmpty, a);

// HOF
let compose = (f, g) => (x) => f(g(x));

let flip = (f) => (a, b) => f(b, a);

// Collections
let map = (f, a) => {
	if (isEmpty(a)) return [];
	let [x, xs] = xxs(a);

	return [f(x), ...map(f, xs)];
}

let foldl = (f, a, b) => {
	if (isEmpty(b)) return a;
	let [x, xs] = xxs(b);

	return foldl(f, f(a, x), xs);
}

let foldr = (f, b, a) => {
	if (isEmpty(a)) return b;
	let [xs, x] = xsx(a);

	return foldr(f, f(x, b), xs);
}

let filter1 = (f, a) => {
	if (isEmpty(a)) return [];
	let [x, xs] = xxs(a);

	return f(x) ? [x, ...filter(f, xs)] : filter(f, xs);
}

let filter = (f, a) => foldl((acc, x) => {
	if (f(x)) acc.push(x);
	return acc;
}, [], a);

let any = (f, a) => {
	if (isEmpty(a)) return false;
	let [x, xs] = xxs(a);

	return f(x) ? true : any(f, xs);
}

let all = (f, a) => {
	if (isEmpty(a)) return false;
	let [x, xs] = xxs(a);

	if (!f(x)) return false;
	return isEmpty(xs) ? true : all(f, xs);
}

let reverse1 = (a) => {
	if (isEmpty(a)) return [];
	let [x, xs] = xxs(a);

	return [...reverse(xs), ...[x]];
}

let reverse = (a) => foldr((x, acc) => {
	acc.push(x);
	return acc;
}, [], a);

let elem = (a, b) => {
	if (isEmpty(b)) return false;

	let [x, xs] = xxs(b);
	return x === a ? true : elem(a, xs);
}

let elem1 = (a, b) => foldl((x, acc) => acc || x === a, false, b);

let take = (num, a) => {
	if (num === 0 || isEmpty(a)) return [];
	let [x, xs] = xxs(a);

	return [x, ...take(--num, xs)];
}

let takeWhile = (f, a) => {
	if (isEmpty(a)) return [];
	let [x, xs] = xxs(a);

	return f(x) ? [x, ...takeWhile(f, xs)] : [];
}

let zip = (a, b) => {
	if (isEmpties(a, b)) return [];
	let [x, xs] = xxs(a),
		[y, ys] = xxs(b);

	return [[x, y], ...zip(xs, ys)];
}

let zipWith = (f, a, b) => {
	if (isEmpties(a, b)) return [];
	let [x, xs] = xxs(a),
		[y, ys] = xxs(b);

	return [f(x, y), ...zipWith(f, xs, ys)];
}

let interleave = (a, b) => {
	if (isEmpty(a)) return b;
	if (isEmpty(b)) return a;
	let [x, xs] = xxs(a);
	let [y, ys] = xxs(b);

	return [x, y, ...interleave(xs, ys)];
}

// Other stuffs
let even = (a) => filter((x) => x % 2 === 0, a);

let quicksort = (a) => {
	if (isEmpty(a)) return [];

	let [x, xs] = xxs(a),
		larger = filter((a) => a >= x, xs),
		smaller = filter((a) => a < x, xs);

	return [...quicksort(smaller), x, ...quicksort(larger)];
}
