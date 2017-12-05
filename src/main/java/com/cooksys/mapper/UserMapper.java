package com.cooksys.mapper;

import org.mapstruct.Mapper;

import com.cooksys.dto.UserDTO;
import com.cooksys.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDto(User user);

    User fromDto(UserDTO dto);

}
