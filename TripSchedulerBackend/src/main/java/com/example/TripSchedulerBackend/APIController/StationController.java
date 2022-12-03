package com.example.TripSchedulerBackend.APIController;

import com.example.TripSchedulerBackend.Services.StationServices;
import com.example.TripSchedulerBackend.Entities.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="api/admin/station")
public class StationController {
    StationServices stationServices;
    @Autowired
    public StationController(StationServices stationServices) {
        this.stationServices = stationServices;
    }

    @PostMapping(path = "/createStation")
    public Station addStation(@RequestBody Station station){
        return stationServices.CreateStation(station) ;
    }


    @DeleteMapping(path = "/deleteStation/{stationId}")
    public void deleteStation(@PathVariable Long stationId){
         stationServices.deleteStationsById(stationId); ;
    }
    @PutMapping(path = "/updateStation/{stationId}")
    public Station updateStation(
            @PathVariable Long stationId,
            @RequestParam(required=false) String stationName){
        return stationServices.UpdateStationsById(stationId,stationName,null,null);
    }
    @GetMapping(path = "/showAllStations")
    public List<Station> showAllStations(){
        return stationServices.getAllStations();
    }
}
