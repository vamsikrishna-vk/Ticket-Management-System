package com.ticketmanagementsystem.ticketsservice.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import com.ticketmanagementsystem.ticketsservice.model.Ticket;


public interface TicketRepository extends MongoRepository<Ticket, String> {

}
