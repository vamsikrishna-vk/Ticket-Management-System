package com.ticketmanagementsystem.ticketsservice.dao;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;


public interface TicketRepository extends MongoRepository<Ticket, String> {
	
}
