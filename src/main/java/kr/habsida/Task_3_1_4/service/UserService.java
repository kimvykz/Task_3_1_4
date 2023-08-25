package kr.habsida.Task_3_1_4.service;

import kr.habsida.Task_3_1_4.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    List<User> getUsers();

    User saveUser(User user);

    User getUserById(Long id);

    void deleteUser(Long id);

    User updateUser(User user);

    User getUserByEmail(String email);

}
