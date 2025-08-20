// ---- //
// Type //
// ---- //

interface Safety<T>
{
	clone(): this;
	expect(msg: string): T;

	/**
	 * Retourne la valeur contenue dans le container.
	 */
	unwrap(): T;

	/**
	 * Retourne la valeur contenue dans le container. Peut retourner une valeur
	 * unsafe.
	 */
	unwrap_unchecked(): T;

	/**
	 * Retourne la valeur contenue dans le container ou une valeur par défaut.
	 */
	unwrap_or(def: T): T;
	
	/**
	 * Retourne la valeur contenue dans le container ou une valeur par défaut
	 * avec l'utilisation d'une fonction de retour.
	 */
	unwrap_or_else<U extends T>(default_fn: () => U): T | U;
}

// ------ //
// Export //
// ------ //

export type { Safety };