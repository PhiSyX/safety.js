// ---- //
// Type //
// ---- //

interface Safety<T>
{
	clone(): this;
	expect(msg: string): T;

	/**
	 * Returns the contained value.
	 */
	unwrap(): T;
	

	/**
	 * Returns the contained value or a provided default.
	 */
	unwrap_or(def: T): T;
	
	/**
	 * Returns the contained value or computes it from a closure.
	 */
	unwrap_or_else<U extends T>(default_fn: () => U): T | U;

	/**
	 * Returns the contained value, without checking that the value is not nil.
	 */
	unwrap_unchecked(): T;
}

// ------ //
// Export //
// ------ //

export type { Safety };