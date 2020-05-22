package br.com.timetomovie.services;

import br.com.timetomovie.daos.HourDao;
import br.com.timetomovie.daos.UserDao;
import br.com.timetomovie.daos.WeekDao;
import br.com.timetomovie.model.HourModel;
import br.com.timetomovie.model.UserModel;
import br.com.timetomovie.model.WeekModel;

import java.io.IOException;
import java.util.Properties;
import java.util.Random;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.mail.PasswordAuthentication;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
	
	public static void bypassSSL() {
        final TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
            @Override
            public void checkClientTrusted(final java.security.cert.X509Certificate[] certs, final String authType) {
            }

            @Override
            public void checkServerTrusted(final java.security.cert.X509Certificate[] certs, final String authType) {
            }

            @Override
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }
        } };
        try {
            final SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            SSLContext.setDefault(sc);
        } catch (final Exception e) {
            e.printStackTrace();
        }
    }
	
	public void sendEmail(String email, HttpServletResponse response) throws IOException
	{
		
		final ServletOutputStream out = response.getOutputStream();
		final ObjectMapper mapper = new ObjectMapper();
		final ObjectNode objectNode = JsonNodeFactory.instance.objectNode();
		
		UserModel user = this.userDao.findByUsername(email);
		
		if(user == null)
		{
			objectNode.put( "success", false );
			objectNode.put( "message", "E-mail não cadastrado" );
			mapper.writeValue( out, objectNode );
			return;
		}
		
		final String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		final StringBuilder salt = new StringBuilder();
		final Random rnd = new Random();
		while ( salt.length() < 10 )
		{ 
			final int index = ( int ) ( rnd.nextFloat() * SALTCHARS.length() );
			salt.append( SALTCHARS.charAt( index ) );
		}
		final String newPassword = salt.toString();
		
		user.setPassword(newPassword);
		this.create(user);
		
		final String content = String
				.format(
					"Prezado(a) %s,\n\nSua nova senha é: %s\n Recomendamos a troca da senha imediatamente através do menu Perfil.\n\n Obrigado.",
					user.getName(),
					newPassword );
		
		final String from = this.usernameSmtp;

		final Properties props = System.getProperties();
		props.put( "mail.smtp.host", this.hostSmtp );
		props.put( "mail.smtp.port", this.portSmtp );
		props.put( "mail.smtp.auth", "true" );
		props.put( "mail.smtp.starttls.enable", "true" ); // TLS

		final String username = this.usernameSmtp;
		final String password = this.passwordSmtp;
		final Session session = Session.getDefaultInstance( props, new Authenticator()
		{

			@Override
			protected PasswordAuthentication getPasswordAuthentication()
			{
				return new PasswordAuthentication( username, password );
			}
		} );

		try
		{
			final MimeMessage message = new MimeMessage( session );

			message.setFrom( new InternetAddress( from ) );

			message.addRecipient( Message.RecipientType.TO, new InternetAddress( email ) );

			message.setSubject( "Recuperação de Senha" );

			message.setText( content );
			
			bypassSSL();

			Transport.send( message );
			
			objectNode.put( "success", true );
			mapper.writeValue( out, objectNode );
		}
		catch ( final MessagingException e )
		{
			e.printStackTrace();
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
	
	@Value("${smtp.username}")
	private String usernameSmtp;
	
	@Value("${smtp.host}")
	private String hostSmtp;
	
	@Value("${smtp.port}")
	private String portSmtp;
	
	@Value("${smtp.password}")
	private String passwordSmtp;
	
}
