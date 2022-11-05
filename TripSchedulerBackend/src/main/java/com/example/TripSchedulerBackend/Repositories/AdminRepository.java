package com.example.TripSchedulerBackend.Repositories;

import com.example.TripSchedulerBackend.Entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository
        extends JpaRepository<Admin,Long> {
    @Query ("SELECT a FROM Admin a WHERE a.userName=?1 AND a.password=?2")
    Optional<Admin>findAdminByUser_Password(String userName,String password);
    @Query ("SELECT a FROM Admin a WHERE a.userName=?1 ")
    Optional<Admin>findAdminByUser(String userName);

}
