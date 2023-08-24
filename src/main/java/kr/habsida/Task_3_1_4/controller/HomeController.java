package kr.habsida.Task_3_1_4.controller;

import kr.habsida.Task_3_1_4.model.Role;
import kr.habsida.Task_3_1_4.model.User;
import kr.habsida.Task_3_1_4.service.UserService;
import kr.habsida.Task_3_1_4.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {

//    @GetMapping("")
//    public RedirectView redirectToHome(){
//        return new RedirectView("/");
//    }
    private List<User> initList = Arrays.asList(
            new User("Admin",
                "Admin",
                    28,
                    "admin@gmail.com",
                    "admin",
                    Arrays.asList(new Role("ADMIN"))),
        new User("User",
                "User",
                20,
                "user@gmail.com",
                "user",
                Arrays.asList(new Role("USER")))
        );

    private UserService userService;

    @Autowired
    public void getUserService(UserService userService){
        this.userService = userService;
    }

    @RequestMapping (value="/login")
    public String showLoginPage(ModelMap model){
        List<User> allUsers = userService.getUsers();
        if (allUsers.size() == 0){
            for (User u : initList){
                userService.saveUser(u);
            }
        }
        return "login";
    }

    @GetMapping(value="/user")
    public String showUserPage(ModelMap model, Authentication authentication) {
        model.put("authName", authentication.getName());
        model.put("authRole", AuthorityUtils.authorityListToSet(authentication.getAuthorities()));

        return "user";
    }

    @GetMapping(value="/admin")
    public String showAdminPage(ModelMap model, Authentication authentication) {
        model.put("authName", authentication.getName());
        model.put("authRole", AuthorityUtils.authorityListToSet(authentication.getAuthorities()));

        return "admin";
    }
}
