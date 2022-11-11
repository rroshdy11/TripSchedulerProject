package com.example.TripSchedulerBackend.Entities;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table
public class Admin {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
     private long adminId;
    @NotNull
    private String userName;
    @NotNull
    private String password;

    public Admin(String userName, String password, String email) {
        this.userName = userName;
        this.password = password;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;


    public Admin() {
    }

    public Admin(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }


    public long getAdminId() {
        return adminId;
    }

    public void setAdminId(long adminId) {
        this.adminId = adminId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return  this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", userName='" + userName + '\'' +
                ", Password='" + password+ '\'' +
                '}';
    }
}
