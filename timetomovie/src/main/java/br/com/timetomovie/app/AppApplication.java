package br.com.timetomovie.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication( scanBasePackages = { "br.com.timetomovie.app",
											"br.com.timetomovie.controller",
											"br.com.timetomovie.model",
											"br.com.timetomovie.daos",
											"br.com.timetomovie.services"} )
@EnableJpaRepositories("br.com.timetomovie.daos")
@ComponentScan({"br.com.timetomovie.controller", "br.com.timetomovie.services"})
@EntityScan("br.com.timetomovie.model")
public class AppApplication
{

	public static void main( final String[] args )
	{
		SpringApplication.run( AppApplication.class, args );
	}

}
