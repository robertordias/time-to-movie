package br.com.timetomovie.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import br.com.timetomovie.services.IngressoComService;

@Controller
@RequestMapping(value = "/ingresso")
public class IngressoComController {

	@GetMapping(value = "/states/{uf}")
	@CrossOrigin( origins = {"*"}, maxAge = 6000 )
	public void cityFromIngressoCom(@PathVariable(value = "uf") String uf, final HttpServletResponse response)
			throws JsonParseException, JsonMappingException, IOException
	{
		this.ingressoComService.findCityFromIngressoCom(uf, response);
	}
	
	@GetMapping(value = "/theaters/{cityId}")
	@CrossOrigin( origins = {"*"}, maxAge = 6000 )
	public void theatersfromCity(@PathVariable(value = "cityId") String cityId, final HttpServletResponse response) 
			throws JsonParseException, JsonMappingException, IOException
	{
		this.ingressoComService.findTheatersFromCity(cityId, response);
	}
	
	@GetMapping(value = "/sessions/{cityId}/{theaterId}")
	@CrossOrigin( origins = {"*"}, maxAge = 6000 )
	public void sessionsfromTheather(@PathVariable(value = "cityId") String cityId,
			@PathVariable(value = "theaterId") String theaterId, final HttpServletResponse response) 
			throws JsonParseException, JsonMappingException, IOException
	{
		this.ingressoComService.sessionsFromTheather(cityId, theaterId, response);
	}
	
	
	@GetMapping(value = "/sessions-fake/{state}")
	@CrossOrigin( origins = {"*"}, maxAge = 6000 )
	public void fakeMoviesByState(@PathVariable(value = "state") String state, final HttpServletResponse response) 
			throws JsonParseException, JsonMappingException, IOException
	{
		this.ingressoComService.fakeMoviesByState(state, response);
	}
	
	
	
	@Autowired
	private IngressoComService ingressoComService;
}
