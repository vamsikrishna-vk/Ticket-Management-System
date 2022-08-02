package com.ticketmanagementsystem.ticketsservice.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import com.ticketmanagementsystem.ticketsservice.dao.TicketConversationRepository;
import com.ticketmanagementsystem.ticketsservice.dao.TicketRepository;
import com.ticketmanagementsystem.ticketsservice.exception.TicketNotFoundException;
import com.ticketmanagementsystem.ticketsservice.exception.UnauthorizedAccessException;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;
import com.ticketmanagementsystem.ticketsservice.model.TicketConversation;


@Service
public class TicketConversationService {
	
	@Autowired
	TicketConversationRepository ticketConversationRepository;
	@Autowired
	TicketRepository ticketRepository;
	@Autowired
	private MongoTemplate mongoTemplate;

	public void sendMessage(TicketConversation ticketConversation,String userId) throws TicketNotFoundException, UnauthorizedAccessException {
		
		
		Ticket ticket = ticketRepository.findById(ticketConversation.getTicketId()).orElseThrow(()-> new TicketNotFoundException(ticketConversation.getTicketId()+" Not Found."));
		
		
		if(ticket.getUserId().equals(userId)) {
			ticketConversation.setFromUserId(userId);
			ticketConversation.setTimeStamp(LocalDate.now());
				
			ticketConversationRepository.save(ticketConversation);
		}
		else {
			throw new UnauthorizedAccessException("user "+userId+" cannot access ticket with Ticket ID: "+ticketConversation.getTicketId());
		}
	}
	
	public List<TicketConversation> getConversation(String ticketId,String userId) throws TicketNotFoundException, UnauthorizedAccessException{
		
		Ticket ticket= ticketRepository.findById(ticketId).orElseThrow(()-> new TicketNotFoundException(ticketId+" is not found."));
		if(ticket.getUserId().equals(userId)) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").is(userId));
		List<TicketConversation> conversation = mongoTemplate.find(query,TicketConversation.class);
		return conversation;
		}
		
		throw new UnauthorizedAccessException(userId+" is not Authorized to access ticket ID: "+ticketId);
	}
}
