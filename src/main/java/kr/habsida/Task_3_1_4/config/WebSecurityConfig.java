package kr.habsida.Task_3_1_4.config;

import kr.habsida.Task_3_1_4.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig  {

    private SuccessUserHandler successUserHandler;

    private CustomUserDetailsService customUserDetailsService;


    @Autowired
    public WebSecurityConfig(CustomUserDetailsService customUserDetailsService
                             ,SuccessUserHandler successUserHandler
    ){
        this.customUserDetailsService = customUserDetailsService;
        this.successUserHandler = successUserHandler;
    }

    @Bean
    public SecurityFilterChain getSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authConfig -> {
            authConfig.requestMatchers( "/login").permitAll();
            authConfig.requestMatchers( "/user", "/js/**").authenticated();
            authConfig.requestMatchers(HttpMethod.GET, "/api/user").hasAnyAuthority("USER", "ADMIN")
                    .requestMatchers("/admin", "/api/**").hasAuthority("ADMIN");
            })

                .formLogin(form -> {
                form.loginPage("/login");
                form.usernameParameter("email");
                form.successHandler(successUserHandler);
            });


        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception{
        return authConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }



}
