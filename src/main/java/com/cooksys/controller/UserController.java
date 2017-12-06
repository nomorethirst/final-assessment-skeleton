package com.cooksys.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.CredentialsBookingDTO;
import com.cooksys.dto.CredentialsDTO;
import com.cooksys.dto.CredentialsProfileDTO;
import com.cooksys.dto.UserDTO;
import com.cooksys.entity.Booking;
import com.cooksys.exceptions.AlreadyExistsException;
import com.cooksys.exceptions.InvalidCredentialsException;
import com.cooksys.exceptions.NotExistsException;
import com.cooksys.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getAllActiveUsers();
    }

    @PostMapping
    public UserDTO createUser(@RequestBody CredentialsProfileDTO dto, HttpServletResponse response) throws IOException {
        try {
//            if (!dto.isValid())
//                throw new InvalidRequestException("Invalid request body.");
            return userService.createUser(dto);
        } catch (AlreadyExistsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
//        } catch (InvalidRequestException e) {
//            response.sendError(e.STATUS_CODE, e.responseMessage);
//            return null;
        }
    }

    @GetMapping("/@{username}")
    public UserDTO getUser(@PathVariable String username, HttpServletResponse response) throws IOException {
        try {
            return userService.getUserByUsername(username);
        } catch (NotExistsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
        }
    }

    @PatchMapping("/@{username}")
    public UserDTO patchUser(@RequestBody CredentialsProfileDTO dto, @PathVariable String username,
                             HttpServletResponse response) throws IOException {
        try {
//            if (!dto.isValid())
//                throw new InvalidRequestException("Invalid request body.");
            return userService.patchUser(dto, username);
        } catch (NotExistsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
//        } catch (InvalidRequestException e) {
//            response.sendError(e.STATUS_CODE, e.responseMessage);
//            return null;
        } catch (InvalidCredentialsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
        }
    }

    @PostMapping(value = "/@{username}")
    public UserDTO deleteUser(@RequestBody CredentialsDTO credentialsDto, @PathVariable String username,
                              HttpServletResponse response) throws IOException {
        try {
//            if (!credentialsDto.isValid())
//                throw new InvalidRequestException("Invalid request body.");
            System.out.println(credentialsDto);
            return userService.deleteUser(credentialsDto.getCredentials(), username);
        } catch (NotExistsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
//        } catch (InvalidRequestException e) {
//            response.sendError(e.STATUS_CODE, e.responseMessage);
//            return null;
        } catch (InvalidCredentialsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
        }
    }

    @PostMapping(value = "/@{username}/login")
    public UserDTO loginUser(@RequestBody CredentialsDTO credentialsDto, @PathVariable String username,
                              HttpServletResponse response) throws IOException {
        try {
            System.out.println(credentialsDto);
            return userService.loginUser(credentialsDto.getCredentials(), username);
        } catch (NotExistsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
        } catch (InvalidCredentialsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
        }
    }
    
    @PostMapping("/@{username}/booking")
    public List<Booking> addBooking(@RequestBody CredentialsBookingDTO dto, @PathVariable String username,
                             HttpServletResponse response) throws IOException {
        try {
            return userService.addBooking(dto, username);
        } catch (NotExistsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
        } catch (InvalidCredentialsException e) {
            response.sendError(e.STATUS_CODE, e.responseMessage);
            return null;
        }
    }


}
