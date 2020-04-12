package br.com.timetomovie.services;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * <p>
 * </p>
 *
 * @author roberto.rodrigues
 * @version 1.0 Created on Jan 3, 2020
 */
@Service
public class IngressoComService
{

	public String getPartnership()
	{
		return "partnership/" + this.partnership;
	}

	public String getPath()
	{
		return this.ingressoComPath;
	}

	public JsonNode requestIngressoCom( final String pathAhead )
		throws JsonParseException,
			JsonMappingException,
			IOException
	{
		final RestTemplate rest = new RestTemplate();
		final HttpEntity entity = new HttpEntity( null, null );

		final String completeUrl = String.format( "%s/%s", getPath(), pathAhead );
		final ResponseEntity<String> forwardResponse = rest
			.exchange( completeUrl, HttpMethod.GET, entity, String.class );
		final String responseString = forwardResponse.getBody();
		return new ObjectMapper().readValue( responseString, JsonNode.class );

	}
	
	public void findCityFromIngressoCom(String uf, final HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException
	{
		String path = String.format("states/%s", uf);
		JsonNode res = this.requestIngressoCom(path);
		final ServletOutputStream out = response.getOutputStream();
		final ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue( out, res );
	}
	
	
	public void findTheatersFromCity(String cityId, final HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException
	{
		String path = String.format("theaters/city/%s/%s", cityId, getPartnership());
		JsonNode res = this.requestIngressoCom(path);
		final ServletOutputStream out = response.getOutputStream();
		final ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue( out, res );
	}
	
	public void sessionsFromTheather(String cityId, String theaterId, final HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException
	{
		String path = String.format("sessions/city/%s/theater/%s/%s",cityId, theaterId, getPartnership());
		JsonNode res = this.requestIngressoCom(path);
		final ServletOutputStream out = response.getOutputStream();
		final ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue( out, res );
	}

	@Value( "${ingresso.com.api}" )
	private String ingressoComPath;

	@Value( "${ingresso.com.partnership}" )
	private String partnership;
}
