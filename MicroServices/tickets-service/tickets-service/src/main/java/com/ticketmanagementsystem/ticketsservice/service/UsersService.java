package com.ticketmanagementsystem.ticketsservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticketmanagementsystem.ticketsservice.dao.UsersRepository;
import com.ticketmanagementsystem.ticketsservice.exception.UserNotFoundException;
import com.ticketmanagementsystem.ticketsservice.model.User;

@Service
public class UsersService {
	
	@Autowired	
	UsersRepository usersRepository;
	
	
	
	public User getUserDetails(String userId) throws UserNotFoundException {
			
		User user= usersRepository.findById(userId).orElseThrow(()->new UserNotFoundException(userId+" doesn't exist call /setUserDetails"));
		
		return user;
	
	}

	
	public User setUserDetails(String userId,String name,String profileUrl) {
		User user = new User();
		user.setName(name);
		user.setProfileUrl(profileUrl);
		user.setRole("user");
		user.setUserId(userId);
		
		usersRepository.save(user);
		
		return user;
	}
	
}
