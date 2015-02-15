// Helpers
const isEmpty = a => a.length === 0;
const isEmpties = (...a) => any(isEmpty, a);

// HOF
const compose = (f, g) => x => f(g(x));
const flip = f => (a, b) => f(b, a);

// Collections
const map = (f, a) => {
	if (isEmpty(a)) return [];
	const [x, ...xs] = a;

	return [f(x), ...map(f, xs)];
}

const foldl = (f, a, b) => {
	if (isEmpty(b)) return a;
	const [x, ...xs] = b;

	return foldl(f, f(a, x), xs);
}

const foldr = (f, b, a) => {
	if (isEmpty(a)) return b;

	const xs = a.slice(0, -1);
	const x = a.pop();
	// wish you could go [...xs, x] = a, but no go es6,

	return foldr(f, f(x, b), xs);
}

const filter1 = (f, [x, ...xs]) => {
	// eh, what if undefined is in collection? isEmpty() is nicer I think
	if (x === undefined) return [];

	return f(x) ? [x, ...filter(f, xs)] : filter(f, xs);
}

const filter = (f, a) => foldl((acc, x) => {
	if (f(x)) acc.push(x);
	return acc;
}, [], a);

const any = (f, a) => {
	if (isEmpty(a)) return false;
	const [x, ...xs] = a;

	return f(x) ? true : any(f, xs);
}

const all = (f, a) => {
	if (isEmpty(a)) return false;
	const [x, ...xs] = a;

	if (!f(x)) return false;
	return isEmpty(xs) ? true : all(f, xs);
}

const reverse1 = a => {
	if (isEmpty(a)) return [];
	const [x, ...xs] = a;

	return [...reverse(xs), ...[x]];
}

const reverse = a => foldr((x, acc) => {
	acc.push(x);
	return acc;
}, [], a);

const elem = (a, b) => {
	if (isEmpty(b)) return false;

	const [x, ...xs] = b;
	return x === a ? true : elem(a, xs);
}

const elem1 = (a, b) => foldl((x, acc) => acc || x === a, false, b);

const take = (num, a) => {
	if (num === 0 || isEmpty(a)) return [];
	const [x, ...xs] = a;

	return [x, ...take(--num, xs)];
}

const takeWhile = (f, a) => {
	if (isEmpty(a)) return [];
	const [x, ...xs] = a;

	return f(x) ? [x, ...takeWhile(f, xs)] : [];
}

const zip = (a, b) => {
	if (isEmpties(a, b)) return [];
	const [x, ...xs] = a;
	const [y, ...ys] = b;

	return [[x, y], ...zip(xs, ys)];
}

const zipWith = (f, a, b) => {
	if (isEmpties(a, b)) return [];
	const [x, ...xs] = a;
	const [y, ...ys] = b;

	return [f(x, y), ...zipWith(f, xs, ys)];
}

const interleave = (a, b) => {
	if (isEmpty(a)) return b;
	if (isEmpty(b)) return a;
	const [x, ...xs] = a;
	const [y, ...ys] = b;

	return [x, y, ...interleave(xs, ys)];
}

// Other stuffs
const even = a => filter(x => x % 2 === 0, a);

const quicksort = a => {
	if (isEmpty(a)) return [];

	const [x, ...xs] = a;
	const larger = filter(a => a >= x, xs);
	const smaller = filter(a => a < x, xs);

	return [...quicksort(smaller), x, ...quicksort(larger)];
}
