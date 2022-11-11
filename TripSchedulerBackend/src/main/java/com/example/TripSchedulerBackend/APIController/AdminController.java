package com.example.TripSchedulerBackend.APIController;

import com.example.TripSchedulerBackend.Services.AdminServices;
import com.example.TripSchedulerBackend.Entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path="api/admin")
public class AdminController {
    AdminServices adminServices;
    Admin admin;
    //To Initiate Automatically the Admin Services
    @Autowired
    public AdminController(AdminServices adminServices) {
        this.adminServices = adminServices;
    }

    @PostMapping(path = "/signup")
    public Admin SignUp(@RequestBody Admin admin){
         this.admin=admin;
         return  adminServices.CreateAdmin(admin);
    }
    @PostMapping(path = "/signin")
    public Boolean Signin(@RequestBody Admin admin){
        return  adminServices.ValidateAdmin(admin);
    }

    @GetMapping(path = "/showAllAdmins")
    public List<Admin> getAllAdmins(){
        return  adminServices.getAllAdmins();
    }

}
