package br.com.timetomovie.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.timetomovie.model.AbstractModel;

public abstract class AbstractService<T extends AbstractModel>
{

	@Transactional
	public void create( final T model )
	{
		this.dao.save( model );
	}

	public void delete( final T model )
	{
		// TODO Auto-generated method stub
		this.dao.delete( model );
	}

	public T get( final int id )
	{
		// TODO Auto-generated method stub
		return this.dao.findById( id ).get();
	}

	public List<T> list()
	{
		// TODO Auto-generated method stub
		final List<T> list = this.dao.findAll();
		return list;
	}

	public void update( final T model )
	{
		// TODO Auto-generated method stub
		this.dao.save( model );
	}

	@Autowired
	protected JpaRepository<T, Integer> dao;

}
