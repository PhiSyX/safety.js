import { it } from "node:test";

import { from, None, Some } from "#root/option";
import type { Option } from "#root/contract/option";

it("Option: Some", ({ assert }) => {
    assert.deepEqual(Some(""), Some(""));
    assert.deepEqual(Some("1"), Some("1"));
    assert.notDeepEqual(Some("1"), Some("2"));
});

it("Option: None", ({ assert }) => {
	assert.deepEqual(None(), None());
});

it("Option: from", ({ assert }) => {
	assert.deepEqual(from(null), None());
	assert.deepEqual(from(undefined), None());
	assert.deepEqual(from("hello"), Some("hello"));
});

it("Option: {is_some, is_none}", ({ assert }) => {
    assert.equal(Some("").is_some(), true);
    assert.equal(Some("").is_none(), false);
	assert.equal(None().is_some(), false);
	assert.equal(None().is_none(), true);
});

it("Option: and_then", ({ assert }) => {
	assert.deepEqual(
        Some("hello").and_then((str) => Some(str.length)),
        Some(5)
    );
});

it("Option: filter", ({ assert }) => {
	assert.deepEqual(
        Some("hello").filter((str) => str.length === 5), 
		Some("hello")
    );

	assert.deepEqual(
        Some("hello").filter((str) => str.length < 5),
        None(),
    );

	assert.equal(
		None<string>().filter((c) => c.startsWith("#")).is_none(),
        true,
	);
});

it("Option: filter_map", ({ assert }) => {
	assert.deepEqual(
		Some(42).filter_map((n) => {
			if (n >= 18) return Some(n * 2);
			return None();
		}),
	    Some(84)
    );
    
	assert.deepEqual(
		Some(42).filter_map((n) => {
			if (n <= 18) return Some(n * 2);
			return None();
		}),
	    None()
    );

	// NOTE: Le type `Option<number>` est requis ici.
	let maybe_n: Option<number> = None();
	assert.deepEqual(
		maybe_n.filter_map((n) => {
			if (n <= 18) return Some(n * 2);
			return None();
		}),
	    None()
    );
});

it("Option: map", ({ assert }) => {
	assert.deepEqual(
        Some("Hello").map((hello) => `${hello} World`),
		Some("Hello World"),
	);

	assert.deepEqual(
        None().map((hello) => `${hello} World`),
        None()
    );
});

it("Option: {or, or_else}", ({ assert }) => {
	assert.deepEqual(
        Some<string>("Hello").or(Some("Hello World")),
        Some("Hello")
    );

	assert.deepEqual(
        Some<string>("Hello").or_else(() => Some("Hello World")),
		Some("Hello"),
	);

	// NOTE: Le type `Option<string>` est requis ici.
	let maybe_str: Option<string> = None();
	assert.deepEqual(
        maybe_str.or_else(() => Some("Hello World")),
		Some("Hello World"),
	);
});

it("Option: unwrap", ({ assert }) => {
	assert.equal(Some("hello").unwrap(), "hello");
	assert.throws(() => None().unwrap());
});

it("Option: {unwrap_or, unwrap_or_else}", ({ assert }) => {
	assert.equal(Some<string>("hello").unwrap_or("world"), "hello");
	assert.equal(None<string>().unwrap_or("world"), "world");

	assert.equal(Some<string>("hello").unwrap_or_else(() => "world"), "hello");
	assert.equal(None<string>().unwrap_or_else(() => "world"), "world");
});

it("Option: replace", ({ assert }) => {
	assert.deepEqual(Some<string>("hello").replace("world"), Some("world"));

	// NOTE: Le type `Option<string>` est requis ici.
	let maybe_str: Option<string> = None();
	assert.deepEqual(maybe_str.replace("world"), Some("world"));
});

it("Option: replace null value", ({ assert }) => {
	let value = JSON.parse("null");
	// NOTE: Le type `Option<string>` est requis ici.
	let maybe_str: Option<string> = None();
	assert.deepEqual(maybe_str.replace(value), None());
});

it("Option: zip", ({ assert }) => {
	assert.deepEqual(Some("hello").zip(Some("world")), Some(["hello", "world"]));

	assert.deepEqual(Some("hello").zip(None()), None());
});
