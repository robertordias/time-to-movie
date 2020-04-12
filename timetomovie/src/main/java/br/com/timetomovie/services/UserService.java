package br.com.timetomovie.services;

import br.com.timetomovie.daos.HourDao;
import br.com.timetomovie.daos.UserDao;
import br.com.timetomovie.daos.WeekDao;
import br.com.timetomovie.model.HourModel;
import br.com.timetomovie.model.UserModel;
import br.com.timetomovie.model.WeekModel;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * <p>
 * </p>
 *
 * @author roberto.rodrigues
 * @version 1.0 Created on Dec 26, 2019
 */
@Service
public class UserService 
{

	public void create( final UserModel user )
	{
		final String newPassword = criptografiaBase64Encoder( user.getPassword() );
		user.setPassword( newPassword );
		
		
		this.userDao.save( user );		
		
		
		for(WeekModel week: user.getWeek())
		{
			week.setUser(user);
			this.weekDao.save(week);
			for(HourModel hour : week.getHour())
			{
				hour.setWeek(week);
				this.hourDao.save(hour);
			}
		}
		
	}

	public String criptografiaBase64Encoder( final String valor )
	{
		return new Base64().encodeToString( valor.getBytes() );
	}

	public String descriptografiaBase64Decoder( final String valorCriptografado )
	{
		return new String( new Base64().decode( valorCriptografado ) );
	}

	public UserModel findByUsername( final String username )
	{

		return this.userDao.findByUsername( username );
	}

	public void login( final String username, final String password, final HttpServletResponse response )
		throws IOException
	{
		final ServletOutputStream out = response.getOutputStream();
		final ObjectMapper mapper = new ObjectMapper();
		final ObjectNode objectNode = JsonNodeFactory.instance.objectNode();
		try
		{
			final UserModel user = this.userDao.findByUsername( username );
			if ( user != null )
			{
				final String userPassword = descriptografiaBase64Decoder( user.getPassword() );
				if ( password.equals( userPassword ) )
				{
					objectNode.put( "success", true );
					mapper.writeValue( out, objectNode );
				}
				else
				{
					objectNode.put( "success", false );
					objectNode.put( "message", "Senha inválida" );
					mapper.writeValue( out, objectNode );
				}
			}
			else
			{
				objectNode.put( "success", false );
				objectNode.put( "message", "Usuário não existe" );
				mapper.writeValue( out, objectNode );
			}
		}
		catch ( final Exception e )
		{
			objectNode.put( "success", false );
			objectNode.put( "message", "Verifique sua conexão" );
			mapper.writeValue( out, objectNode );
		}

	}

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private WeekDao weekDao;
	
	@Autowired
	private HourDao hourDao;
	
}
