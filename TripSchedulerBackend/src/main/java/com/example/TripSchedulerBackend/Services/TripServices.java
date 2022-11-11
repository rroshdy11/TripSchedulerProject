package com.example.TripSchedulerBackend.Services;

import com.example.TripSchedulerBackend.Entities.Station;
import com.example.TripSchedulerBackend.Entities.Trip;
import com.example.TripSchedulerBackend.Repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

//Spring Bean Using @Service or @Component
@Service
public class TripServices {
    TripRepository tripRepository;
    StationServices stationServices;
    @Autowired
    public TripServices(TripRepository tripRepository,StationServices stationServices) {
        this.tripRepository = tripRepository;
        this.stationServices=stationServices;

    }
    //Basic CRUDS Using TripRepository


    public Trip CreateTrip(Trip trip){
        //Search if the Sent Station is Created Or Not To Validate
        if(stationServices.getStationByName(trip.getToStation().getStationName())!=null
                && stationServices.getStationByName(trip.getFromStation().getStationName())!=null
        ) {
            //update the to and from station By Appending the trip to the list Created in the Station
            stationServices.UpdateStationsById(trip.getToStation().getStationId(),null,trip,null);
            stationServices.UpdateStationsById(trip.getFromStation().getStationId(),null,null,trip);
            //then save and return the trip Object
            return tripRepository.save(trip);
        }
        else{
            throw new IllegalStateException("One Of the Entered Stations Are Not Found");
        }
    }
    public void DeleteTripByID(Long id){
         tripRepository.deleteById(id);
    }


     public List<Trip> getAllScheduledTrips(){
        return tripRepository.findAll();
    }
    //Get A trip
    public List<Trip>getTripsByEndandStartTime(Trip searchTrip){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime startDateTime = LocalDateTime.parse(searchTrip.getStartTime(), formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(searchTrip.getEndTime(), formatter);

        List<Trip>AllTrips=tripRepository.findAll();
        AllTrips.forEach((trip)->{
            trip.setStartDateTime(trip.getStartTime());
            trip.setEndDateTime(trip.getEndTime());
        });
        for (int i=0;i<AllTrips.size();i++){
            if(AllTrips.get(i).getEndDateTime().isAfter(endDateTime)
                    && AllTrips.get(i).getStartDateTime().isBefore(startDateTime)
                    && !(AllTrips.get(i).getToStation().getStationName().equalsIgnoreCase(searchTrip.getToStation().getStationName()))
                    &&!(AllTrips.get(i).getFromStation().getStationName().equalsIgnoreCase(searchTrip.getFromStation().getStationName()))
            ){
                AllTrips.remove(i);
            }
        }
        return  AllTrips;
    }
    @Transactional
    public Trip UpdateTripById(Long Id,Long toStation,Long fromStation,String startTime,String endTime ){
        Trip trip=tripRepository.findById(Id).orElseThrow(
                () -> new IllegalStateException("The Trip with Id "+Id+" Not Exist")
        );
        if(toStation!=null
                &&stationServices.getStationById(toStation)!=null
                &&stationServices.getStationById(toStation)!=trip.getToStation()
        ){
            //delete the trip from the list of the old station
            Station oldStation=trip.getToStation();
            stationServices.removeTripFromStationsById(oldStation.getStationId(),trip,null);
            //append to the new station
            Station newstation =stationServices.getStationById(toStation);
            trip.setToStation(newstation);
            stationServices.UpdateStationsById(newstation.getStationId(),null,trip,null);
        }
        if(fromStation!=null
                &&stationServices.getStationById(fromStation)!=null
                &&stationServices.getStationById(fromStation)!=trip.getToStation()
        ){
            //delete the trip from the list of the old station
            Station oldStation=trip.getFromStation();
            stationServices.removeTripFromStationsById(oldStation.getStationId(),null,trip);
            //append to the new station
            Station newstation =stationServices.getStationById(fromStation);
            trip.setFromStation(newstation);
            stationServices.UpdateStationsById(newstation.getStationId(),null,null,trip);
        }
        if(startTime!=null
                && startTime.length()>0
        ){
            trip.setStartTime(startTime);
        }
        if(endTime !=null
                &&endTime.length()>0
        ){
            trip.setEndTime(endTime);
        }
        return  trip;
    }
}
