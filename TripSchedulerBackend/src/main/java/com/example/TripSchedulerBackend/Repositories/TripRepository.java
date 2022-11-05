package com.example.TripSchedulerBackend.Repositories;


import com.example.TripSchedulerBackend.Entities.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends JpaRepository<Trip,Long> {

}
