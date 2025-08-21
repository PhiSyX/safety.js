import type { Option } from "#root/contract/option";

import { UnwrapError } from "#root/unwrap_error";

// ----------- //
// Énumération //
// ----------- //

type OptionEnum = (typeof OptionVariant)[keyof typeof OptionVariant];

const OptionVariant =
{
	None: Symbol("None"),
	Some: Symbol("Some"),
} as const;


// -------------- //
// Implémentation //
// -------------- //

class DefaultOption<T> implements Option<T>
{
	// ------ //
	// Static //
	// ------ //

	static None = <T = never>(): Option<T> =>new DefaultOption<T>(OptionVariant.None);
	static Some = <T>(value: NonNullable<T>): Option<T> => new DefaultOption<T>(OptionVariant.Some, value);
	static from = <T>(value: T | null | undefined): Option<NonNullable<T>> =>
	{
		return value == null ? None() : Some<NonNullable<T>>(value);
	};

	// --------- //
	// Propriété //
	// --------- //

	private type: OptionEnum;
	private value?: T;

	// ----------- //
	// Constructor //
	// ----------- //
	
	constructor(ty: OptionEnum, value?: T)
	{
		this.type = ty;

		if (value != null)
		{
			this.value = value;
		}
	}

	// ------- //
	// Méthode //
	// ------- //

	and_then<U>(fn: (value: T) => Option<U>): Option<U>
	{
		try
		{
			return fn(this.unwrap());
		}
		catch
		{
			return None();
		}
	}
	
	filter(predicate_fn: (value: T) => value is NonNullable<T>): Option<T>
	{
		try 
		{
			const value = this.unwrap();
			if (predicate_fn(value)) return Some(value);
		}
		catch
		{
		}

		return None();
	}

	filter_map<U>(map_fn: (value: T) => Option<U>): Option<U> 
	{
		try 
		{
			return map_fn(this.unwrap());
		}
		catch 
		{
			return None();
		}
	}

	is_none(): this is Option<never>
	{
		return this.type === OptionVariant.None || this.value == null;
	}

	is_some(): this is Option<T>
	{
		return this.type === OptionVariant.Some && this.value != null;
	}

	map<U>(map_fn: (value: T) => U): Option<U>
	{
		try
		{
			return Some(map_fn(this.unwrap())!);
		}
		catch 
		{
			return None();
		}
	}

	or(or_value: Option<T>): Option<T>
	{
		if (this.is_none()) return or_value;
		return this;
	}

	or_else(or_fn: () => Option<T>): Option<T> 
	{
		if (this.is_none()) return or_fn();
		return this;
	}

	replace(value: T): Option<T>
	{
		if (value == null) return this;
		const old = this.clone();
		this.type = OptionVariant.Some;
		this.value = value;
		return old;
	}

	zip<U>(other: Option<U>): Option<[T, U]>
	{
		try
		{
			return Some([this.unwrap(), other.unwrap()]);
		}
		catch
		{
			return None();
		}
	}

	/* Safety */

	clone(): this
	{
		try
		{
			return Some(this.unwrap()!) as this;
		}
		catch
		{
			return None() as this;
		}
	}

	expect(msg: string): T
	{
		if (this.is_some()) return this.value!;
		throw new Error(`EXPECT: ${msg}`);
	}

	unwrap(): T
	{
		if (this.is_none()) throw new UnwrapError();
		return this.value!;
	}
	
	unwrap_unchecked(): T
	{
		return this.value!;
	}

	unwrap_or(def: T): T
	{
		try
		{
			return this.unwrap();
		}
		catch
		{
			return def;
		}
	}

	unwrap_or_else<U extends T>(default_fn: () => U): T | U
	{
		try 
		{
			return this.unwrap();
		} 
		catch
		{
			return default_fn();
		}
	}
}

// ------ //
// Export //
// ------ //

export const { None, Some, from: toOption } = DefaultOption;
