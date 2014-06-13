
// Implementation of SICP lists

let cons = (car, cdr) => [car, cdr],
	car = (a) => a[0],
	cdr = (a) => a[1],
	list = (...a) => foldr(cons, null, a);

let str = (a) => {
	let piter = (b) => {
		if (!b) return;
		return [car(b)].concat(piter(cdr(b)));
	}
	return piter(a).slice(0,-1).join(",");
}

let ref = (a, n) => {
	if (n === 0) return car(a);
	return ref(cdr(a), n - 1);
}

let len = (a) => {
	if (!a) return 0;
	return 1 + len(cdr(a));
}

let append = (a, b) => {
	if (!a) return b;
	return cons(car(a), append(cdr(a), b));
}

let last = (a) => {
	if (!cdr(a)) return car(a);
	return last(cdr(a));
}

let rev = (a) => {
	if (!a) return null;
	let h = car(a),
		t = cdr(a);

	return append(rev(t), cons(h, null));
}

let each = (f, a) => {
	if (!a) return;
	f(car(a));
	return each(f, cdr(a));
}

let mapl = (f, a) => {
	if (!a) return;
	return append(
		list(f(car(a))),
		mapl(f, cdr(a))
	);
}

let toArray = (a) => {
	toArray()
}





