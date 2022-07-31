package com.ticketmanagementsystem.ticketsservice.configuration;


import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@SuppressWarnings("deprecation")
public class OauthConfiguration extends WebSecurityConfigurerAdapter {
	
	
	protected void configure(HttpSecurity http) throws Exception {
	http.authorizeRequests(a -> a
        .antMatchers("/", "/error", "/webjars/**").permitAll()
        .anyRequest().authenticated()
    )
	.logout(l -> l
            .logoutSuccessUrl("/").permitAll()
        )
    .exceptionHandling(e -> e
        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
    )
    .oauth2Login();
}
}
