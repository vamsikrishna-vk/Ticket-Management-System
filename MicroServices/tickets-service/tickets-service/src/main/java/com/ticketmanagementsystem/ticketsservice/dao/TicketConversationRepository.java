package com.ticketmanagementsystem.ticketsservice.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ticketmanagementsystem.ticketsservice.model.TicketConversation;


public interface TicketConversationRepository extends MongoRepository<TicketConversation, String> {

}