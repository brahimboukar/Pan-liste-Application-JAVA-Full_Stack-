package com.example.back_End.repository;

import com.example.back_End.model.Role;
import com.example.back_End.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String email);

    long countByRole(Role role);
    //long countByRoleAndC

    boolean existsByEmail(String email);


}
