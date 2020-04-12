package br.com.timetomovie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/timeToMovie")
public class ApiController {

	@RequestMapping(value = "/teste", method = RequestMethod.GET)
	@ResponseBody
	public String getTeste(@RequestParam(value = "teste") String teste) {
		String outroTeste = "Meu nome é" + teste;
		return outroTeste;
	}

}
