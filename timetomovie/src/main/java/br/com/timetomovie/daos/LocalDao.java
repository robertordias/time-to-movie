package br.com.timetomovie.daos;

import br.com.timetomovie.model.LocalModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * </p>
 * 
 * @author roberto.rodrigues
 * @version 1.0 Created on Dec 26, 2019
 */
@Repository
public interface LocalDao
	extends JpaRepository<LocalModel, Integer>
{

}
