package com.ticketmanagementsystem.ticketsservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ticketmanagementsystem.ticketsservice.model.StatusEnum;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;
import com.ticketmanagementsystem.ticketsservice.service.TicketService;

@RestController
@RequestMapping
public class TicketsController {
	
	@Autowired
	TicketService ticketService;
	
	
	
	@PostMapping("/createticket")
	public String createTicket(@RequestBody Ticket ticket) {
		// user Access
		
		
		ticketService.createTicket(ticket);
		
		return "Ticket Created";
	}
	@GetMapping("/getalltickets")
	public List<Ticket> getAllTickets(){
		//Admin only Accesss
		
		return ticketService.getAllTickets();
	}
	
	@PutMapping("/updatestatus/{ticketId}/{newStatus}")
	public String updateStatus(@PathVariable String ticketId,@PathVariable String newStatus) {
		
		StatusEnum status = StatusEnum.valueOf(newStatus);
		
		ticketService.updateStatus(ticketId, status);
		
		return "Status Updated to "+newStatus+" successfully";
	}
	
	@GetMapping("/getticket/{ticketId}")
	public Ticket getTicket(@PathVariable String ticketId) {
		
		return ticketService.getTicket(ticketId);
		
	}
	@PutMapping("/updateTicketResponse/{ticketId}")
	public void UpdateTicketResponse(@PathVariable String ticketId,@RequestBody String ticketResponse)
	{
		ticketService.UpdateTicketResponse(ticketId, ticketResponse);
	}

}
