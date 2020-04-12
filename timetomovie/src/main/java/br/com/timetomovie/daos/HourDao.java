package br.com.timetomovie.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.timetomovie.model.HourModel;

@Repository
public interface HourDao extends JpaRepository<HourModel, Integer> {

}
