package br.com.timetomovie.model;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

public class SessionModel
{

	public String getDate()
	{
		return this.date;
	}

	public String getDateFormated()
	{
		return this.dateFormated;
	}

	public String getDayOfWeek()
	{
		return this.dayOfWeek;
	}

	public boolean isToday()
	{
		return this.isToday;
	}

	public void isToday( final boolean isToday )
	{
		this.isToday = isToday;
	}

	public void setDate( final String date )
	{
		this.date = date;
	}

	public void setDateFormated( final String dateFormated )
	{
		this.dateFormated = dateFormated;
	}

	public void setDayOfWeek( final String dayOfWeek )
	{
		this.dayOfWeek = dayOfWeek;
	}

	public String date;

	public String dateFormated;

	public String dayOfWeek;

	public boolean isToday;

	private List<JsonNode> movies;

}
