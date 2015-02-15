
// Implementation of SICP lists

const cons = (car, cdr) => [car, cdr];
const car = a => a[0];
const cdr = a => a[1];
const list = (...a) => foldr(cons, null, a);

const str = a => {
	const piter = b => {
		if (!b) return;
		return [car(b)].concat(piter(cdr(b)));
	}
	return piter(a).slice(0,-1).join(",");
}

const ref = (a, n) => {
	if (n === 0) return car(a);
	return ref(cdr(a), n - 1);
}

const len = a => {
	if (!a) return 0;
	return 1 + len(cdr(a));
}

const append = (a, b) => {
	if (!a) return b;
	return cons(car(a), append(cdr(a), b));
}

const last = a => {
	if (!cdr(a)) return car(a);
	return last(cdr(a));
}

const rev = a => {
	if (!a) return null;
	const h = car(a);
	const t = cdr(a);

	return append(rev(t), cons(h, null));
}

const each = (f, a) => {
	if (!a) return;
	f(car(a));
	return each(f, cdr(a));
}

const mapl = (f, a) => {
	if (!a) return;
	return append(
		list(f(car(a))),
		mapl(f, cdr(a))
	);
}





