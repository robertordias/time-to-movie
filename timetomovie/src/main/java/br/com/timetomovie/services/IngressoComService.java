package br.com.timetomovie.services;

import java.io.IOException;
import java.nio.charset.Charset;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
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

import br.com.timetomovie.daos.HourDao;

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

    public static final Charset ISO_8859_1 = Charset.forName("ISO-8859-1");
    public static final Charset UTF_8 = Charset.forName("UTF-8");
    
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
		return responseString != null ? new ObjectMapper().readValue( responseString, JsonNode.class ) : null;

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
		final ObjectMapper mapper = new ObjectMapper();
		final ServletOutputStream out = response.getOutputStream();
		if(res != null)
		{			
			mapper.writeValue( out, res );
		}

		final ObjectNode objectNode = JsonNodeFactory.instance.objectNode();
		objectNode.put("data" , "" );
		mapper.writeValue( out, objectNode);
	}
	
	public void fakeMoviesByState(String state, final HttpServletResponse response) throws IOException
	{
		String jsonAsString = new String();
		jsonAsString = this.hourDao.getFakeMoviesByState(state);
		if(jsonAsString == null)
		{
			jsonAsString = this.hourDao.getFakeMovies();
		}
		final ServletOutputStream out = response.getOutputStream();
		final ObjectMapper mapper = new ObjectMapper();
		JsonNode json = mapper.readTree(jsonAsString);
		mapper.writeValue( out, json);
		
	}

	@Value( "${ingresso.com.api}" )
	private String ingressoComPath;

	@Value( "${ingresso.com.partnership}" )
	private String partnership;
	
	@Autowired
	private HourDao hourDao;
}
