package com.example.TripSchedulerBackend.Repositories;

import com.example.TripSchedulerBackend.Entities.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationRepository
        extends JpaRepository<Station,Long> {
    @Query("SELECT s FROM Station s WHERE s.stationName=?1 ")
    List<Station> findStationsByName(String stationName);
    @Query("SELECT s FROM Station s WHERE s.stationName=?1 ")
    Station findStationByName(String stationName);
}
