import type { Safety } from "#root/contract/safety";

// ---- //
// Type //
// ---- //

interface Option<T> extends Safety<T>
{
    and_then<U>(fn: (value: T) => Option<U>): Option<U>;

	/**
	 * Filtre la valeur contenue dans [`Some`].
	 */
	filter(predicate_fn: (value: T) => boolean): Option<T>;

    /**
	 * Applique une nouvelle valeur, sur la valeur contenue dans [`Some`].
	 *
	 * @example ```js
	 * Some(42).filter_map((n) => {
	 *    if (n >= 18) return Some(n * 2);
	 * 	  return None();
	 * });
	 * ```
	 */
	filter_map<U>(map_fn: (value: T) => Option<U>): Option<U>;

    /**
	 * La valeur de l'option n'est pas safe.
	 */
    is_none(): this is Option<never>;

    /**
	 * La valeur de l'option est safe.
	 */
    is_some(): this is Option<T>;

    /**
	 * Applique une nouvelle valeur, sur la valeur contenue dans [`Some`].
	 */
	map<U>(map_fn: (value: T) => U): Option<U>;

    /**
	 * Applique une valeur dans le cas de `None`.
	 *
	 * @example ```js
	 * let maybe_str: Option<string> = None();
	 * maybe_str.or(Some("Hello World"));
	 * ```
	 */
	or(or_value: Option<T>): Option<T>;

    /**
	 * Appelle une fonction en cas de `None`.
	 *
	 * @example ```js
	 * let maybe_str: Option<string> = None();
	 * maybe_str.or_else(() => Some("Hello World"));
	 * ```
	 */
	or_else(or_fn: () => Option<T>): Option<T>;

    /**
	 * Remplace la valeur de l'instance actuelle.
	 */
    replace<U extends T>(value: U): Option<U>;

    /**
	 * Combine deux [Some] ensemble, et retourne un tuple de taille 2 des
	 * valeurs qui sont contenues dans leur propre [Some].
	 */
	zip<U>(other: Option<U>): Option<[T, U]>;
}

// ------ //
// Export //
// ------ //

export type { Option };
