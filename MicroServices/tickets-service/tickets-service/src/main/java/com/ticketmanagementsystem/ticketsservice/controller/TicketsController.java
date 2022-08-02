package com.ticketmanagementsystem.ticketsservice.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketmanagementsystem.ticketsservice.exception.BadRequestException;
import com.ticketmanagementsystem.ticketsservice.model.StatusEnum;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;
import com.ticketmanagementsystem.ticketsservice.service.TicketService;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class TicketsController {
	
	@Autowired
	TicketService ticketService;
	@CrossOrigin(origins = "*")
	@PostMapping("/createticket")
	public String createTicket(@RequestBody Ticket ticket,@AuthenticationPrincipal OAuth2User principal) {
//		
		String userId= principal.getAttribute("email");
//		String userId="vamsikrishna6037@gmail.com";
		ticketService.createTicket(ticket,userId);
		
		return "Ticket Created";
	
	}
	
	//to get all tickets of a specific user

	@CrossOrigin(origins = "*")
	@GetMapping("/getalltickets")
	public List<Ticket> getAllTickets(@AuthenticationPrincipal OAuth2User principal){
//		
		//String userId="vamsikrishna6037@gmail.com";
		String userId= principal.getAttribute("email");
		return ticketService.getAllTickets(userId);
	}
	@CrossOrigin(origins = "*")
	@PutMapping("/updatestatus/{ticketId}/{newStatus}")
	public String updateStatus(@PathVariable String ticketId,@PathVariable String newStatus,@AuthenticationPrincipal OAuth2User principal) {
		StatusEnum status;
		try {
			status = StatusEnum.valueOf(newStatus);
		}
		catch(Exception e) {
			throw new BadRequestException("In valid Status");
		}
		String userId= principal.getAttribute("email");
		ticketService.updateStatus(ticketId, status,userId);
		
		return "Status Updated to "+newStatus+" successfully";
	}
	@CrossOrigin(origins = "*")
	@GetMapping("/getticket/{ticketId}")
	public Ticket getTicket(@PathVariable String ticketId,@AuthenticationPrincipal OAuth2User principal) {
		
		String userId= principal.getAttribute("email");
		
		return ticketService.getTicket(ticketId,userId);
		
	}
	@CrossOrigin(origins = "*")
	@GetMapping("/getUserTickets")
	public List<Ticket> getUserTickets(@AuthenticationPrincipal OAuth2User principal) {
		
		String userId= principal.getAttribute("email");
		
		return ticketService.getUserTickets(userId);
		
	}
	

}
