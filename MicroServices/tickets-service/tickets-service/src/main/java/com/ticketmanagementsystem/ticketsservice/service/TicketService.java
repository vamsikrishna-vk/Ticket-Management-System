package com.ticketmanagementsystem.ticketsservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ticketmanagementsystem.ticketsservice.dao.TicketRepository;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;
import com.ticketmanagementsystem.ticketsservice.model.StatusEnum;
import java.util.*;

@Service
public class TicketService {
	
	@Autowired
	TicketRepository ticketRepository;
	
	public void createTicket(Ticket ticket) {
		ticketRepository.save(ticket);
	}
	
	public List<Ticket> getAllTickets(){
		
		return ticketRepository.findAll();
	}
	
	public void updateStatus(String ticketId,StatusEnum newStatus) {
		
		Ticket ticket= ticketRepository.findById(ticketId).orElseThrow();
		
		ticket.setStatus(newStatus);
		
		ticketRepository.save(ticket);
		
	}
	
	public Ticket getTicket(String ticketId) {
		
		return ticketRepository.findById(ticketId).orElseThrow();
	
	}
	
	public void UpdateTicketResponse(String ticketId,String ticketResponse) {
		
		Ticket ticket= ticketRepository.findById(ticketId).orElseThrow();
		
		ticket.setTicketResponse(ticketResponse);
		
		ticketRepository.save(ticket);
	}
	

}
