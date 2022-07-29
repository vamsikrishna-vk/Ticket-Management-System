package com.ticketmanagementsystem.ticketsservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

public class DatabaseSequence {
	
	
	

	@Id
    private String id;

    private long seq;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getSeq() {
		return seq;
	}

	public DatabaseSequence(String id, long seq) {
		super();
		this.id = id;
		this.seq = seq;
	}

	public void setSeq(long seq) {
		this.seq = seq;
	}
}
