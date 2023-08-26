package kr.habsida.Task_3_1_4.repository;

import kr.habsida.Task_3_1_4.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = "roles")
    @Query("select a from User a")
    List<User> findAll();

    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
