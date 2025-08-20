export class UnwrapError extends Error
{
	constructor()
	{
		super("La fonction `.unwrap()` est appelée sur une valeur `None`.");
	}
}
