package com.example.TripSchedulerBackend.APIController;

import com.example.TripSchedulerBackend.Entities.Trip;
import com.example.TripSchedulerBackend.Services.TripServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/admin/trip")
public class TripController {
    TripServices tripServices;
    @Autowired
    public TripController( TripServices tripServices) {
        this.tripServices = tripServices;
    }

    @PostMapping(path = "createTrip")
    public Trip createTrip(@RequestBody  Trip trip){
        return tripServices.CreateTrip(trip);
    }
    @DeleteMapping(path = "deleteTrip/{id}")
    public void createTrip(@PathVariable Long id){
        tripServices.DeleteTripByID(id);
    }
    @PutMapping(path = "updateTrip/{tripId}")
    public Trip updateTrip(@PathVariable Long tripId,
                           @RequestParam(required = false) String toStation,
                           @RequestParam(required = false) String fromStation,
                           @RequestParam(required = false)String startTime,
                           @RequestParam(required = false)String endTime
    ){
        return tripServices.UpdateTripById(tripId,toStation,fromStation,startTime,endTime);
    }
    @GetMapping(path="showAllTrips")
    public List<Trip>showAllScheduledTrips(){
       return tripServices.getAllScheduledTrips();
    }

}
