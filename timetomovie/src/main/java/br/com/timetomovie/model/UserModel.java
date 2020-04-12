package br.com.timetomovie.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

/**
 * <p>
 * </p>
 *
 * @author roberto.rodrigues
 * @version 1.0 Created on Dec 26, 2019
 */
@Entity()
@Table( name = "usuario" )
@Inheritance( strategy = InheritanceType.JOINED )
public class UserModel extends AbstractModel
{

	public UserModel()
	{
		super();
	}

	public Long getId()
	{
		return this.id;
	}
	
	public LocalModel getLocal()
	{
		return this.local;
	}

	public String getName()
	{
		return this.name;
	}

	public String getPassword()
	{
		return this.password;
	}

	public String getEmail()
	{
		return this.email;
	}

	public List<WeekModel> getWeek()
	{
		return this.week;
	}

	public void setId( final Long id )
	{
		this.id = id;
	}


	public void setLocal( final LocalModel local )
	{
		this.local = local;
	}

	public void setName( final String name )
	{
		this.name = name;
	}

	public void setPassword( final String password )
	{
		this.password = password;
	}

	public void setEmail( final String email )
	{
		this.email = email;
	}

	private void setWeek( final List<WeekModel> week )
	{
		this.week = week;
	}


	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_usuario")
	private Long id;

	@JoinColumn(name = "id_local")
	@ManyToOne( cascade = CascadeType.ALL)
	private LocalModel local;

	@Column(name = "nome")
	private String name;

	@JsonProperty( access = Access.WRITE_ONLY )
	@Column(name = "senha")
	private String password;

	@Column(name = "email")
	private String email;

	@OneToMany(mappedBy = "user")
	private List<WeekModel> week;
}
