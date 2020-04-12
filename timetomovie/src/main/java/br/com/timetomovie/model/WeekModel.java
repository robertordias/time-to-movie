package br.com.timetomovie.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * <p>
 * </p>
 *
 * @author roberto.rodrigues
 * @version 1.0 Created on Dec 26, 2019
 */
@Entity
@Table(name = "semana")
public class WeekModel
{

	public WeekModel()
	{
		super();
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @return Returns the dayOfWeek.
	 * @see #dayOfWeek
	 */
	public String getDay()
	{
		return this.day;
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @return Returns the hour.
	 * @see #hour
	 */
	public List<HourModel> getHour()
	{
		return this.hour;
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @return Returns the id.
	 * @see #id
	 */
	public Long getId()
	{
		return this.id;
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @return Returns the user.
	 * @see #user
	 */
	public UserModel getUser()
	{
		return this.user;
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @param dayOfWeek
	 *            The dayOfWeek to set.
	 * @see #dayOfWeek
	 */
	public void setDay( final String day )
	{
		this.day = day;
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @param hour
	 *            The hour to set.
	 * @see #hour
	 */
	private void setHour( final List<HourModel> hour )
	{
		this.hour = hour;
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @param id
	 *            The id to set.
	 * @see #id
	 */
	public void setId( final Long id )
	{
		this.id = id;
	}

	/**
	 * <p>
	 * </p>
	 * 
	 * @param user
	 *            The user to set.
	 * @see #user
	 */
	public void setUser( final UserModel user )
	{
		this.user = user;
	}

	@Column(name = "dia")
	private String day;

	@OneToMany(mappedBy = "week", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	private List<HourModel> hour;

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_semana")
	private Long id;

	@JoinColumn(name = "id_usuario", nullable = false)
	@ManyToOne(optional = false)
	@JsonIgnore
	private UserModel user;

}
