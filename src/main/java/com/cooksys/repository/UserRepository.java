package com.cooksys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByCredentials_Username(String username);

    List<User> findByDeleted(boolean deleted);

    User findByCredentials_UsernameAndDeleted(String username, boolean deleted);

}
