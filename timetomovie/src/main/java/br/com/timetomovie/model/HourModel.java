package br.com.timetomovie.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "horario")
public class HourModel {
	
	public HourModel()
	{
		super();
	}
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "id_horario")
	private Long id;
	
	public Long getId()
	{
		return this.id;
	}
	
	public void setId(Long id)
	{
		this.id = id;
	}
	
	public String getHorario()
	{
		return this.horario;
	}
	
	public void setHorario(String horario)
	{
		this.horario = horario;
	}
	
	public WeekModel getWeek()
	{
		return this.week;
	}
	
	public void setWeek(WeekModel week)
	{
		this.week = week;
	}
	
	@Column(name= "horario")
	private String horario;
	
	@JoinColumn(name = "id_semana", nullable = false)
	@ManyToOne(optional = false)
	@JsonIgnore
	private WeekModel week;

}
