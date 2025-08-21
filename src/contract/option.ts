import type { Safety } from "#root/contract/safety";

// ---- //
// Type //
// ---- //

interface Option<T> extends Safety<T>
{
	/**
	 * Returns [`None`] if the option is [`None`], otherwise calls `fn` with the
	 * wrapped value and returns the result.
	 */
	and_then<U>(fn: (value: T) => Option<U>): Option<U>;

	/**
	 * Returns [`None`] if the option is [`None`], otherwise calls
	 * `predicate_fn` with the wrapped value and returns:
	 *
	 * `Some(t)` if predicate returns `true` (where `t` is the wrapped value),
	 * and `None` if predicate returns `false`.
	 */
	filter(predicate_fn: (value: T) => boolean): Option<T>;

    /**
	 * Returns [`None`] if the option is [`None`], otherwise calls
	 * `map_fn` with the wrapped value.
	 * 
	 * Is a shortened version of `Option.filter().map()`.
	 */
	filter_map<U>(map_fn: (value: T) => Option<U>): Option<U>;

    /**
	 * Returns `true` if the option is a [`None`] value.
	 */
	is_none(): this is Option<never>;

    /**
	 * Returns `true` if the option is a [`Some`] value.
	 */
	is_some(): this is Option<T>;

    /**
	 * Maps an `Option<T>` to `Option<U>` by applying a function to a contained
	 * value (if [`Some`]) or returns [`None`] (if [`None`]).
	 */
	map<U>(map_fn: (value: T) => U): Option<U>;

    /**
	 * Returns the option if it contains a value, otherwise returns `or_value`.
	 *
	 * Arguments passed to or are eagerly evaluated; if you are passing the
	 * result of a function call, it is recommended to use `or_else`, which is
	 * lazily evaluated.
	 */
	or(or_value: Option<T>): Option<T>;

    /**
	 * Returns the option if it contains a value, otherwise calls `or_fn` and
	 * returns the result.
	 */
	or_else(or_fn: () => Option<T>): Option<T>;

    /**
	 * Replaces the actual value in the option by the value given in parameter,
	 * returning the old value if present, leaving a [`Some`] in its place
	 * without de-initializing either one.
	 */
	replace(value: T): Option<T>;

    /**
	 * If this is `Some(s)` and other is `Some(o)`, this method returns Some([s,
	 * o]). Otherwise, None is returned.
	 */
	zip<U>(other: Option<U>): Option<[T, U]>;
}

// ------ //
// Export //
// ------ //

export type { Option };
