package com.cooksys.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.cooksys.dto.CredentialsBookingDTO;
import com.cooksys.dto.CredentialsProfileDTO;
import com.cooksys.dto.FlightDTO;
import com.cooksys.dto.UserDTO;
import com.cooksys.entity.Booking;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.Flight;
import com.cooksys.entity.Profile;
import com.cooksys.entity.User;
import com.cooksys.exceptions.AlreadyExistsException;
import com.cooksys.exceptions.InvalidCredentialsException;
import com.cooksys.exceptions.NotExistsException;
import com.cooksys.mapper.UserMapper;
import com.cooksys.repository.BookingRepository;
import com.cooksys.repository.FlightRepository;
import com.cooksys.repository.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;

    private UserMapper userMapper;
    
    private BookingRepository bookingRepository;
    
    private FlightRepository flightRepository;

    public UserService(UserRepository userRepository, UserMapper userMapper, BookingRepository bookingRepository, FlightRepository flightRepository) {
        super();
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.bookingRepository = bookingRepository;
        this.flightRepository = flightRepository;
    }

    public List<UserDTO> getAllActiveUsers() {
        return userRepository.findByDeleted(false)
        		.stream()
        		.map(userMapper::toDto)
        		.collect(Collectors.toList());
    }

    public boolean usernameExists(String username) {
        return userRepository.findByCredentials_UsernameAndDeleted(username, false) != null;
    }

    public boolean usernameAvailable(String username) {
        return userRepository.findByCredentials_Username(username) == null;
    }

    @Transactional
    public UserDTO createUser(CredentialsProfileDTO dto) throws AlreadyExistsException {
        User user = userRepository.findByCredentials_Username(dto.getCredentials().getUsername());
        // if user does not exist, create
        if (user == null) {
            user = userRepository.save(new User(dto.getCredentials(), dto.getProfile(),
                    new Timestamp(System.currentTimeMillis())));
        } else { // user with that username exists already!
            if (user.getCredentials().equals(dto.getCredentials())) {
                user.setDeleted(false);
                user.setProfile(dto.getProfile());
                return userMapper.toDto(user);
            }
            throw new AlreadyExistsException(
                    String.format("username '%s' already exists.", dto.getCredentials().getUsername()));
        }
        return userMapper.toDto(user);
    }

    public UserDTO getUserByUsername(String username) throws NotExistsException {
        User user = userRepository.findByCredentials_Username(username);

        if (user == null || user.getDeleted()) {
            throw new NotExistsException(String.format("User '%s' does not exist or is deleted.", username));
        }
        return userMapper.toDto(user);
    }

    @Transactional
    public UserDTO patchUser(CredentialsProfileDTO dto, String username)
            throws InvalidCredentialsException, NotExistsException {
        Credentials credentials = dto.getCredentials();
        Profile profile = dto.getProfile();
        if (!credentials.getUsername().equals(username)) {
            throw new InvalidCredentialsException(String.format(
                    "username '%s' does not match credentials (username '%s').", username, credentials.getUsername()));
        }
        User user = userRepository.findByCredentials_Username(username);
        if (user == null || user.getDeleted()) {
            throw new NotExistsException(String.format("User '%s'does not exist or is deleted.", username));
        }
        if (!user.getCredentials().equals(credentials)) {
            throw new InvalidCredentialsException(String.format("Invalid credentials {username: %s, password: %s}.",
                    credentials.getUsername(), credentials.getPassword()));
        }
        user.setProfile(profile);

        return userMapper.toDto(user);
    }

    @Transactional
    public UserDTO deleteUser(Credentials credentials, String username)
            throws InvalidCredentialsException, NotExistsException {
	System.out.println(credentials);
        if (!credentials.getUsername().equals(username)) {
            throw new InvalidCredentialsException(String.format(
                    "username '%s' does not match credentials (username '%s').", username, credentials.getUsername()));
        }
        User user = userRepository.findByCredentials_Username(username);
        if (user == null || user.getDeleted()) {
            throw new NotExistsException(String.format("User '%s' does not exist or is already deleted.", username));
        }
        if (!user.getCredentials().equals(credentials)) {
            throw new InvalidCredentialsException(String.format("Invalid credentials {username: %s, password: %s}.",
                    credentials.getUsername(), credentials.getPassword()));
        }
        user.setDeleted(true);

        return userMapper.toDto(user);
    }

    public UserDTO loginUser(Credentials credentials, String username)
            throws InvalidCredentialsException, NotExistsException {
        if (!credentials.getUsername().equals(username)) {
            throw new InvalidCredentialsException(String.format(
                    "username '%s' does not match credentials (username '%s').", username, credentials.getUsername()));
        }
        User user = userRepository.findByCredentials_Username(username);
        if (user == null || user.getDeleted()) {
            throw new NotExistsException(String.format("User '%s' does not exist or is deleted.", username));
        }
        if (!user.getCredentials().equals(credentials)) {
            throw new InvalidCredentialsException(String.format("Invalid credentials {username: %s, password: %s}.",
                    credentials.getUsername(), credentials.getPassword()));
        }

        return userMapper.toDto(user);
    }

    @Transactional
    public List<Booking> addBooking(CredentialsBookingDTO dto, String username)
            throws InvalidCredentialsException, NotExistsException {
        Credentials credentials = dto.getCredentials();
        System.out.println(dto);
        List<Flight> flights = new ArrayList<Flight>();
        for (FlightDTO flightDto: dto.getBooking().getFlights()) {
            Flight flight = new Flight(flightDto.getOrigin(), flightDto.getDestination(), flightDto.getFlightTime(), flightDto.getOffset());
            flightRepository.save(flight);
            flights.add(flight);
        }
        Booking booking = new Booking(flights);
        bookingRepository.save(booking);
        if (!credentials.getUsername().equals(username)) {
            throw new InvalidCredentialsException(String.format(
                    "username '%s' does not match credentials (username '%s').", username, credentials.getUsername()));
        }
        User user = userRepository.findByCredentials_Username(username);
        if (user == null || user.getDeleted()) {
            throw new NotExistsException(String.format("User '%s'does not exist or is deleted.", username));
        }
        if (!user.getCredentials().equals(credentials)) {
            throw new InvalidCredentialsException(String.format("Invalid credentials {username: %s, password: %s}.",
                    credentials.getUsername(), credentials.getPassword()));
        }

        if (user.getBookings().isEmpty()) {
            List<Booking> bookings = new ArrayList<Booking>();
            bookings.add(booking);
            user.setBookings(bookings);
        } else {
            user.getBookings().add(booking);
        }

        return user.getBookings();
    }
}
