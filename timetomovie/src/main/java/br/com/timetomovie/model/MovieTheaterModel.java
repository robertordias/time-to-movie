package br.com.timetomovie.model;

import java.util.List;

import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * <p>
 * </p>
 *
 * @author roberto.rodrigues
 * @version 1.0 Created on Jan 3, 2020
 */
public class MovieTheaterModel
{

	@Transient
	private Boolean enabled;

	@Transient
	private Integer id;

	@Transient
	private List<JsonNode> images;

	@Transient
	private String name;

	@JsonIgnore
	@Transient
	private List<JsonNode> rooms;

	@Transient
	private Integer roomsCount;
}
