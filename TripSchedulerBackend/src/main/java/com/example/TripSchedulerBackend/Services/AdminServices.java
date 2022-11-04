package com.example.TripSchedulerBackend.Services;

import com.example.TripSchedulerBackend.Repositories.AdminRepository;
import com.example.TripSchedulerBackend.Entities.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//Spring Bean Using @Service or @Component
@Service
public class AdminServices {
    private AdminRepository adminRepository;

    @Autowired
    public AdminServices(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }
    public Admin CreateAdmin(Admin admin){
        Optional<Admin> adminsWithTheSameUserName=adminRepository.findAdminByUser(admin.getUserName());
        if(adminsWithTheSameUserName.isPresent()){
            throw new IllegalStateException("User Name Is Taken");}
        else {

            return adminRepository.save(admin);}

    }
    public Boolean ValidateAdmin(Admin admin){
        return adminRepository.findAdminByUser_Password(admin.getUserName(),admin.getPassword()).isPresent();
    }
}
