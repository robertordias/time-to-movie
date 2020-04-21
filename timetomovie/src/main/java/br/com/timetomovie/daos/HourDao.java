package br.com.timetomovie.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.timetomovie.model.HourModel;

@Repository
public interface HourDao extends JpaRepository<HourModel, Integer> {
	
	
	@Query(value = "select content from session_content where estado = :state", nativeQuery = true)
	String getFakeMoviesByState(@Param(value = "state") String state);
	
	@Query(value = "select content from session_content where estado is null", nativeQuery = true)
	String getFakeMovies();

}
