package kr.habsida.Task_3_1_4.controller;

import kr.habsida.Task_3_1_4.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class HomeController {

//    @GetMapping("")
//    public RedirectView redirectToHome(){
//        return new RedirectView("/");
//    }

    @RequestMapping (value="/login")
    public String showLoginPage(ModelMap model){

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
