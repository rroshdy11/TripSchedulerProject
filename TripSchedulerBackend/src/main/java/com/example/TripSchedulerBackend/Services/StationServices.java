package com.example.TripSchedulerBackend.Services;

import com.example.TripSchedulerBackend.Entities.Trip;
import com.example.TripSchedulerBackend.Repositories.StationRepository;
import com.example.TripSchedulerBackend.Entities.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

//Spring Bean Using @Service or @Component
@Service
public class StationServices {
    StationRepository stationRepository;

    @Autowired
    public StationServices(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public Station CreateStation(Station station){
        return stationRepository.save(station);
    }
    public List<Station> getAllStationsByName(String stationName){
        return stationRepository.findStationsByName(stationName);
    }
    public List<Station>getAllStations(){
        return stationRepository.findAll();
    }
    public Station getStationByName(String stationName){
        return stationRepository.findStationByName(stationName);
    }
    public void deleteStationsById(Long stationId){
        stationRepository.deleteById(stationId);
    }

    //To Make Entity Go to Manage State So we Can Change What we want by its Setters
    @Transactional
    public Station UpdateStationsById(Long stationId, String stationName, Trip totrip, Trip fromtrip) {
        Station station= stationRepository.findById(stationId)
                .orElseThrow(()-> new IllegalStateException("Station With "+stationId +" does not Exist"));
        if(stationName!=null
                && stationName.length()>0 &&
                !Objects.equals(station.getStationName(),stationName)
        ){
            station.setStationName(stationName);
        }
        if(totrip!=null)
        {
            List<Trip> toTrips=station.getToTrips();
            toTrips.add(totrip);
            station.setToTrips(toTrips);
        }
        if(fromtrip!=null)
        {
            List<Trip> fromTrips=station.getFromTrips();
            fromTrips.add(fromtrip);
            station.setFromTrips(fromTrips);
        }
        return station;
    }

    @Transactional
    public Station removeTripFromStationsById(Long stationId, Trip toTrip, Trip fromTrip) {
        Station station= stationRepository.findById(stationId)
                .orElseThrow(()-> new IllegalStateException("Station With "+stationId +" does not Exist"));

        if(toTrip!=null)
        {
            List<Trip> toTrips=station.getToTrips();
            toTrips.remove(toTrip);
            station.setToTrips(toTrips);
        }
        if(fromTrip!=null)
        {
            List<Trip> fromTrips=station.getFromTrips();
            fromTrips.remove(fromTrip);
            station.setFromTrips(fromTrips);
        }
        return station;
    }

}
