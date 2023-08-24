package kr.habsida.Task_3_1_4.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "tbl_roles")
@Setter
@Getter
@ToString
@NoArgsConstructor
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public Role(String name){
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return this.name;
    }
}
