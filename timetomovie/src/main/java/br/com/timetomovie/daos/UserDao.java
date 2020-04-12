package br.com.timetomovie.daos;
import br.com.timetomovie.model.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * </p>
 *
 * @author roberto.rodrigues
 * @version 1.0 Created on Dec 26, 2019
 */
@Repository
public interface UserDao
	extends JpaRepository<UserModel, Long>
{

	@Query( value = "from UserModel u where u.email = :email" )
	UserModel findByUsername( @Param( value = "email" ) String email );

}
