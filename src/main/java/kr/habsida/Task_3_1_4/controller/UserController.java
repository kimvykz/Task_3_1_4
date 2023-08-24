package kr.habsida.Task_3_1_4.controller;

import jakarta.validation.Valid;
import kr.habsida.Task_3_1_4.model.Role;
import kr.habsida.Task_3_1_4.model.User;
import kr.habsida.Task_3_1_4.repository.RoleRepository;
import kr.habsida.Task_3_1_4.service.CustomUserDetailsService;
import kr.habsida.Task_3_1_4.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    private AuthenticationManager authenticationManager;

    @Autowired
    UserController (UserService userService,
                    AuthenticationManager authenticationManager
                    ){
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> loginApi(@RequestBody User user) throws Exception {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        catch (BadCredentialsException ex){
            throw new Exception("Invalid credentials");
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }

    @GetMapping("/user")
    //@PreAuthorize("hasRole('ADMIN') ")  //or hasAuthority('USER')
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<List<User>>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){
        return new ResponseEntity<User>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<User> saveUser(@Valid @RequestBody User user) {
        System.out.println("test - UserController.saveUser - " + user.toString());

        return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @PatchMapping ("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        System.out.println("test - UserControlle.updateUser ------" + id + " +++++ " + user.toString());
        return new ResponseEntity<User>(userService.updateUser(user), HttpStatus.OK);
    }

    @DeleteMapping("/user")
    public ResponseEntity<HttpStatus> deleteUser(@RequestParam Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }


}
