package com.ticketmanagementsystem.ticketsservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketmanagementsystem.ticketsservice.model.TicketConversation;
import com.ticketmanagementsystem.ticketsservice.service.TicketConversationService;

@RestController
public class TicketConversationController {
	
	@Autowired
	TicketConversationService ticketConversationService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/sendmessage")
	public void sendMessage(TicketConversation ticketConversation,@AuthenticationPrincipal OAuth2User principal) {
		String userId= principal.getAttribute("email");
		ticketConversationService.sendMessage(ticketConversation,userId);
	}
	@CrossOrigin(origins = "*")
	@GetMapping("/getconversation/{ticketId}")
	public List<TicketConversation> getConversation(@PathVariable String ticketId,@AuthenticationPrincipal OAuth2User principal) {
		String userId= principal.getAttribute("email");
		return ticketConversationService.getConversation(ticketId,userId);
	}
	
}
