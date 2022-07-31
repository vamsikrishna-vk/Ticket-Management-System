package com.ticketmanagementsystem.ticketsservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ticketmanagementsystem.ticketsservice.dao.TicketConversationRepository;
import com.ticketmanagementsystem.ticketsservice.dao.TicketRepository;
import com.ticketmanagementsystem.ticketsservice.exception.GlobalExceptionHandler;
import com.ticketmanagementsystem.ticketsservice.exception.TicketNotFoundException;
import com.ticketmanagementsystem.ticketsservice.exception.UnauthorizedAccessException;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;


@Service
public class TicketConversationService {
	
	@Autowired
	TicketConversationRepository ticketConversationRepository;
	@Autowired
	TicketRepository ticketRepository;
	
	
	public void sendMessage(String message,String tickedId,String userId) {
		Ticket ticket = ticketRepository.findById(tickedId).orElseThrow(()-> new TicketNotFoundException(tickedId+" Not Found."));
		
		if(ticket.getUserId().equals(userId)) {
			
		}
		else {
			throw new UnauthorizedAccessException("user "+userId+" cannot access ticket with Ticket ID: "+tickedId);
		}
	
	}
}
