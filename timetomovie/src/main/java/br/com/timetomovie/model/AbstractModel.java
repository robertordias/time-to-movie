package br.com.timetomovie.model;

public abstract class AbstractModel implements Cloneable {
	
	public AbstractModel()
	{
		super();
	}

	/**
	 * <p>
	 * </p>
	 *
	 * @return
	 * @throws CloneNotSupportedException
	 * @see java.lang.Object#clone()
	 */
	@Override
	public Object clone()
		throws CloneNotSupportedException
	{
		return super.clone();
	}

}
