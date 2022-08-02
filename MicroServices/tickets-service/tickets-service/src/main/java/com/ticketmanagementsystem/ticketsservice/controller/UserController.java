package com.ticketmanagementsystem.ticketsservice.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ticketmanagementsystem.ticketsservice.exception.UserNotFoundException;
import com.ticketmanagementsystem.ticketsservice.model.User;
import com.ticketmanagementsystem.ticketsservice.service.UsersService;

@RestController
public class UserController {
	
	@Autowired
	UsersService usersservice;
	
	@PostMapping("/setuserdetails")
	public User setUserDetails(@AuthenticationPrincipal OAuth2User principal) {
		
		String userId=principal.getAttribute("email");
		String name=principal.getAttribute("name");
		String profileUrl=principal.getAttribute("profile");
		
		return usersservice.setUserDetails(userId, name, profileUrl);
		 
	}
	
	@GetMapping("/getuserdetails")
	public User getUserDetails(@AuthenticationPrincipal OAuth2User principal) throws UserNotFoundException  {
		
		String userId= principal.getAttribute("email");
		
		return usersservice.getUserDetails(userId);
	
	}
	@PostMapping("/makeadmin")
	public void makeAdmin(@RequestBody String newAdminId,@AuthenticationPrincipal OAuth2User principal) {
		
		String userId=principal.getAttribute("email");
		System.out.print(userId);
		usersservice.makeAdmin(userId,newAdminId);
		 
	}

}
