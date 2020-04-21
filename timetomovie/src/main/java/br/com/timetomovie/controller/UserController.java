package br.com.timetomovie.controller;

import br.com.timetomovie.daos.UserDao;
import br.com.timetomovie.model.UserModel;
import br.com.timetomovie.services.UserService;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
@Controller
@RequestMapping( value = "/user" )
public class UserController
{

	@CrossOrigin( origins = {"*"}, maxAge = 6000 )
	@RequestMapping( value = "/create", method = RequestMethod.POST )
	public void create( @RequestBody final UserModel user, final HttpServletResponse response )
		throws IOException
	{
		
		final ServletOutputStream out = response.getOutputStream();
		final ObjectMapper mapper = new ObjectMapper();
		final ObjectNode objectNode = JsonNodeFactory.instance.objectNode();

		this.userService.create( user );
		objectNode.put( "success", true );
		mapper.writeValue( out, objectNode );
	}
	
	

	@CrossOrigin( origins = {"*"}, maxAge = 6000 )
	@RequestMapping( value = "/login", method = RequestMethod.POST )
	@ResponseBody
	public void login(
		@RequestParam( value = "username" ) final String username,
		@RequestParam( value = "password" ) final String password,
		final HttpServletResponse response )
		throws IOException
	{
		this.userService.login( username, password, response );
	}

	@CrossOrigin( origins = {"*"}, maxAge = 6000 )
	@RequestMapping( value = "/find-by-email/{email}", method = RequestMethod.GET )
	@ResponseBody
	public UserModel findByEmail(@PathVariable(value = "email") String email)
	{
		UserModel user = this.userService.findByUsername(email);
		return user;
	}
	
	@Autowired
	private UserService userService;

}
