package com.ticketmanagementsystem.ticketsservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import com.ticketmanagementsystem.ticketsservice.dao.TicketRepository;
import com.ticketmanagementsystem.ticketsservice.exception.BadRequestException;
import com.ticketmanagementsystem.ticketsservice.exception.TicketNotFoundException;
import com.ticketmanagementsystem.ticketsservice.exception.UnauthorizedAccessException;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;
import com.ticketmanagementsystem.ticketsservice.model.StatusEnum;

import java.time.LocalDate;
import java.util.*;

@Service
public class TicketService {
	
	@Autowired
	TicketRepository ticketRepository;
	@Autowired
	SequenceGeneratorService sequenceGeneratorService;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public void createTicket(Ticket ticket,String userId) throws BadRequestException{
		
		if(ticket.getTitle().equals("")) {
			throw new BadRequestException("The Title of ticket cannot be empty");
		}
		
		ticket.setUserId(userId);
		ticket.setStatus(StatusEnum.OPEN);
		ticket.setOpenTimeStamp(LocalDate.now());
		ticket.setResolvedTimeStamp(null);
		ticket.setWithdrawnTimeStamp(null);
		ticket.setTicketId(String.valueOf(sequenceGeneratorService.getNextSequence(ticket.SEQUENCE_NAME)));
		
		ticketRepository.save(ticket);
	}
	
	public List<Ticket> getAllTickets(String userId) throws UnauthorizedAccessException{
		
		if(userId.equals("vamsikrishna6037@gmail.com")) {
			return ticketRepository.findAll();
		}
		
		throw new UnauthorizedAccessException(userId+" is not Authorized to get this resource");
	}
	
	public void updateStatus(String ticketId,StatusEnum newStatus,String userId) {
		
		Ticket ticket= ticketRepository.findById(ticketId).orElseThrow(()-> new TicketNotFoundException(ticketId+" is not found."));
		
		if(ticket.getUserId().equals(userId)) {
			
		ticket.setStatus(newStatus);
		ticketRepository.save(ticket);
		
		}
		else {
			throw new UnauthorizedAccessException(userId+" is not Authorized to modify ticket ID: "+ticketId);
		}
		
	}
	
	public Ticket getTicket(String ticketId, String userId) throws UnauthorizedAccessException,TicketNotFoundException {
		
		Ticket ticket= ticketRepository.findById(ticketId).orElseThrow(()-> new TicketNotFoundException(ticketId+" is not found."));
		
		if(ticket.getUserId().equals(userId)) {
			
			return ticket;
			
		}
		
		throw new UnauthorizedAccessException(userId+" is not Authorized to access ticket ID: "+ticketId);
	
	}
	
	public List<Ticket> getUserTickets(String userId){
		
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId));
		List<Ticket> tickets = mongoTemplate.find(query,Ticket.class);
		
		return tickets;
				
	}
	
//	public void UpdateTicketResponse(String ticketId,String ticketResponse) {
//		
//		Ticket ticket= ticketRepository.findById(ticketId).orElseThrow();
//		
//		ticket.setTicketResponse(ticketResponse);
//		
//		ticketRepository.save(ticket);
//	}
	

}
