package com.ticketmanagementsystem.ticketsservice.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ticketmanagementsystem.ticketsservice.model.User;

public interface UsersRepository extends MongoRepository<User,String> {

}
