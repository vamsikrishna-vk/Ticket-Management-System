package com.ticketmanagementsystem.ticketsservice.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;



@Document("Tickets")
public class Ticket {
	
	@Transient
    public static final String SEQUENCE_NAME = "users_sequence";
	
	@Id
	private String ticketId;
	
	private String userId;
	private StatusEnum status;
	private LocalDate openTimeStamp;
	private LocalDate resolvedTimeStamp;
	private LocalDate withdrawnTimeStamp;
	private String title;
	private String ticketContent;
	private String ticketResponse;
	
	
	public StatusEnum getStatus() {
		return status;
	}
	public void setStatus(StatusEnum status) {
		this.status = status;
	}
	public String getTicketId() {
		return ticketId;
	}
	public void setTicketId(String ticketId) {
		this.ticketId = ticketId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public LocalDate getOpenTimeStamp() {
		return openTimeStamp;
	}
	public void setOpenTimeStamp(LocalDate openTimeStamp) {
		this.openTimeStamp = openTimeStamp;
	}
	public LocalDate getResolvedTimeStamp() {
		return resolvedTimeStamp;
	}
	public void setResolvedTimeStamp(LocalDate resolvedTimeStamp) {
		this.resolvedTimeStamp = resolvedTimeStamp;
	}
	public LocalDate getWithdrawnTimeStamp() {
		return withdrawnTimeStamp;
	}
	public void setWithdrawnTimeStamp(LocalDate withdrawnTimeStamp) {
		this.withdrawnTimeStamp = withdrawnTimeStamp;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTicketContent() {
		return ticketContent;
	}
	public void setTicketContent(String ticketContent) {
		this.ticketContent = ticketContent;
	}
	public String getTicketResponse() {
		return ticketResponse;
	}
	public void setTicketResponse(String ticketResponse) {
		this.ticketResponse = ticketResponse;
	}
	
	public Ticket(String ticketId, String userId, StatusEnum status, LocalDate openTimeStamp, LocalDate resolvedTimeStamp,
			LocalDate withdrawnTimeStamp, String title, String ticketContent, String ticketResponse) {
		super();
		this.ticketId = ticketId;
		this.userId = userId;
		this.status = status;
		this.openTimeStamp = openTimeStamp;
		this.resolvedTimeStamp = resolvedTimeStamp;
		this.withdrawnTimeStamp = withdrawnTimeStamp;
		this.title = title;
		this.ticketContent = ticketContent;
		this.ticketResponse = ticketResponse;
	}
	
	
}
