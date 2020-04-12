package br.com.timetomovie.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * <p>
 * </p>
 *
 * @author roberto.rodrigues
 * @version 1.0 Created on Dec 26, 2019
 */
@Entity
@Table(name = "local")
public class LocalModel
{

	public LocalModel()
	{
		super();
	}

	public String getEstado()
	{
		return this.estado;
	}

	public String getUf()
	{
		return this.uf;
	}

	public void setEstado( final String estado )
	{
		this.estado = estado;
	}

	public void setUf( final String uf )
	{
		this.uf = uf;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "estado")
	private String estado;

	@Column(name = "uf")
	private String uf;
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_local")
	private Long id;
}
