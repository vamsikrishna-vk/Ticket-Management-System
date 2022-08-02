package com.ticketmanagementsystem.ticketsservice.configuration;


import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SimpleSavedRequest;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
@SuppressWarnings("deprecation")
public class OauthConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	public void configure(WebSecurity web) throws Exception {
	    web.ignoring().antMatchers(HttpMethod.OPTIONS, "/oauth/token");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	http
	.authorizeRequests(a -> a
        .antMatchers("/", "/error", "/webjars/**").permitAll()
        .anyRequest().authenticated()
    )
	.logout(l -> l
            .logoutSuccessUrl("/").permitAll()
        )
    .exceptionHandling(e -> e
        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
    )
    
    .oauth2Login().defaultSuccessUrl("http://localhost:3000/home", false); 
	
	}
	
	}
	 

